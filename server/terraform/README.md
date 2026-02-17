# Terraform GCP Backend Deployment

## Overview
This Terraform configuration deploys backend infrastructure on **Google Cloud Platform (GCP)** only.

## Cloud and Services Created
Cloud provider: **Google Cloud Platform (GCP)**

Terraform creates:
1. **Cloud Run service** (`chess-api`) for the backend API
2. **Cloud Run IAM binding** to allow unauthenticated invocation (`roles/run.invoker` for `allUsers`)
3. **Project API enablement** for `run.googleapis.com`

Terraform outputs:
- `api_url` (Cloud Run endpoint URL)

Not created by this Terraform:
- Frontend hosting (served separately, e.g. GitHub Pages)
- Database instance (only `DATABASE_URL` is passed to Cloud Run)

## Prerequisites
1. GCP project with billing enabled
2. Terraform installed
3. Authenticated Google credentials

## Install Terraform
Choose one option:

### Windows (winget)
```bash
winget install Hashicorp.Terraform
```

Verify installation:
```bash
terraform -version
```

## Billing Alert (recommended)
Even with free-tier usage, attach billing and set an alert to avoid surprises:
1. In GCP Console, go to **Billing** → **Budgets & alerts**
2. Create a budget for your billing account (for example: $1 or $5)
3. Add alert thresholds (for example: 50%, 90%, 100%)
4. Add email recipients for notifications

## Setup
1. Copy `terraform.tfvars.example` to `terraform.tfvars`
2. Fill in required values
3. Run:

```bash
terraform init
terraform plan
terraform apply
```

## Deploy a new API image
```bash
docker build -t gcr.io/YOUR_PROJECT_ID/chess-api:latest ..
docker push gcr.io/YOUR_PROJECT_ID/chess-api:latest
terraform apply
```

## Cleanup
```bash
terraform destroy
```
