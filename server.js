import http from "node:http";
import { Client } from "pg";

const port = Number(process.env.PORT || 3000);

function dbConfig() {
  return {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 5432),
    database: process.env.DB_NAME || "app",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  };
}

async function withDb(handler) {
  const client = new Client(dbConfig());
  await client.connect();
  try {
    await client.query("CREATE TABLE IF NOT EXISTS items (id SERIAL PRIMARY KEY, text TEXT NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT now())");
    return await handler(client);
  } finally {
    await client.end();
  }
}

function sendJson(res, statusCode, body) {
  res.writeHead(statusCode, { "content-type": "application/json" });
  res.end(JSON.stringify(body));
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString("utf8");
}

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === "GET" && req.url === "/health") {
      sendJson(res, 200, { status: "ok" });
      return;
    }

    if (req.method === "GET" && req.url === "/api/items") {
      const items = await withDb(async (client) => {
        const result = await client.query("SELECT id, text, created_at FROM items ORDER BY id DESC LIMIT 50");
        return result.rows;
      });
      sendJson(res, 200, { items });
      return;
    }

    if (req.method === "POST" && req.url === "/api/items") {
      const raw = await readBody(req);
      const payload = raw ? JSON.parse(raw) : {};
      const text = String(payload.text || "").trim();

      if (!text) {
        sendJson(res, 400, { error: "text is required" });
        return;
      }

      const item = await withDb(async (client) => {
        const result = await client.query("INSERT INTO items (text) VALUES ($1) RETURNING id, text, created_at", [text]);
        return result.rows[0];
      });
      sendJson(res, 201, { item });
      return;
    }

    sendJson(res, 404, { error: "not found" });
  } catch (error) {
    sendJson(res, 500, { error: error.message });
  }
});

server.listen(port, () => {
  console.log(`backend listening on ${port}`);
});
