# INENI-PT Group H Backend

Backend REST API for the Group H Kubernetes platform assignment.

## Repository Role
This repository contains the backend application code for the tenant application instances deployed by the platform repository.

Related repositories:
- Platform: `https://github.com/djmanu/INENI-PT-gcloud`
- Frontend: `https://github.com/djmanu/INENI-PT-gcloud-frontend`

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

## Validation
Run the local syntax check:

```text
npm run validate
```

Build validation in CI uses the Dockerfile to ensure the container image remains buildable.

## Change Management
- start work through a GitHub issue
- implement changes on a feature branch
- merge through a pull request with validation results
- keep commit messages in Conventional Commits format
