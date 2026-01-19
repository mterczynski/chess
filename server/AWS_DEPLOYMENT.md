# AWS Deployment

## Quick Start

1. **Setup GitHub OIDC (one-time):**
   ```bash
   bash scripts/setup-github-oidc.sh
   ```
   Add the ARN to GitHub secrets as shown.

2. **Deploy:**
   - Go to GitHub Actions → Run "Test All Components" workflow
   - Deploy happens automatically after tests pass

## Environment Variables (EB Console)

Set these in AWS EB Console → Configuration → Environment properties:

```
NODE_ENV=production
PORT=8080
DATABASE_HOST=your-db-host
DATABASE_PORT=5432
DATABASE_USER=your-user
DATABASE_PASSWORD=your-password
DATABASE_NAME=chess
JWT_SECRET=your-secure-secret
ALLOWED_ORIGINS=https://yourdomain.com
```

## Useful Commands

```bash
cd server

# Check status
eb status

# View logs
eb logs

# SSH into instance
eb ssh

# Manual deploy (if needed)
eb deploy
```

## Costs (Free Tier)

- EC2 t3.micro: $0 (750h/month for 12 months)
- After: ~$7.50/month

## Cleanup

```bash
eb terminate chess-server-env
```
