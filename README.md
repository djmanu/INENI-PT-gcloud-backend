# INENI-PT Group H Backend

Backend REST API for the Group H Kubernetes platform assignment.

## Runtime
- Node.js HTTP API
- PostgreSQL data layer
- container image published to Google Artifact Registry

## Endpoints
- `GET /health`
- `GET /api/items`
- `POST /api/items`

## Required Environment Variables
- `DB_HOST`
- `DB_PORT`
- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`

## Image
Target image:

```text
europe-west3-docker.pkg.dev/project-a7033755-91ce-4662-bb8/group-h-apps/backend
```

## Security
No plaintext secrets are stored in this repository. The GitHub Actions pipeline uses Google Workload Identity Federation.
