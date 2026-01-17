<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Chess game server built with [NestJS](https://github.com/nestjs/nest) framework.

## Project setup

```bash
npm install
```

## Database Setup

### Local Development (Recommended)

**Use local PostgreSQL for development.** Supabase is for production only.

1. **Install PostgreSQL:**
   - [Download PostgreSQL](https://www.postgresql.org/download/)
   - Or use Docker: `docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=postgres postgres:15`

2. **Configure `.env`:**
   ```bash
   cp .env.example .env
   ```
   
   Default local config (already in .env.example):
   ```env
   POSTGRES_HOST=localhost
   POSTGRES_PORT=5432
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=postgres
   POSTGRES_DB=chess
   ```

3. **Start server:**
   ```bash
   npm run start:dev
   ```
   
   TypeORM will automatically create tables on first run.

### Production (Supabase)

**Only use Supabase for production deployments.**

1. **Create Supabase Project:**
   - Go to [supabase.com](https://supabase.com/dashboard)
   - Click "New Project"
   - Choose region (e.g., West Europe - London)
   - Set database password (save it!)

2. **Get Connection Details:**
   - Click **"Connect"** button (top bar)
   - Select **Method: "Transaction pooler"** (NOT Direct connection!)
   - Click **"View parameters"**

3. **Update production `.env`:**
   ```env
   # Comment out local, use Supabase:
   POSTGRES_HOST=aws-1-eu-west-2.pooler.supabase.com
   POSTGRES_PORT=6543
   POSTGRES_USER=postgres.YOUR_PROJECT_REF
   POSTGRES_PASSWORD=your-supabase-password
   POSTGRES_DB=postgres
   ```
   
   **Important:** 
   - Use **Transaction pooler** host (ends with `.pooler.supabase.com`)
   - User format: `postgres.YOUR_PROJECT_REF` (with dot!)
   - Port: `6543` (not 5432)

1.

```bash
$ npm install
```

2. Create .env file (copy .env.example file)
3. Install postgreSQL, link for windows: https://www.postgresql.org/download/windows/
4. Install pgAdmin, setup a new postgres server
5. In scope of that server, create a database named `chess`  

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

## Important notes

`"builder": "webpack"` was used in `./nest-cli.json` to fix issues with importing game-engine in server

## Insomnia REST API Client

`Insomnia_Collection.yaml` can be imported to [Insomnia REST](https://insomnia.rest/) for API testing

## Deployment to Render.com

### Setup Instructions

1. **Create Render Account:**
   - Go to [render.com](https://render.com) and sign up
   - Connect your GitHub account

2. **Create New Web Service:**
   - Dashboard → "New +" → "Web Service"
   - Connect this repository
   - Use these settings:
     - **Name:** `chess-server`
     - **Region:** Frankfurt (or Oregon for US)
     - **Branch:** `main`
     - **Root Directory:** `server`
     - **Runtime:** Node
     - **Build Command:** `npm install && npm run build`
     - **Start Command:** `npm run start:prod`

3. **Configure Environment Variables:**
   In Render dashboard, add these env vars:
   ```
   NODE_ENV=production
   POSTGRES_HOST=aws-1-eu-west-2.pooler.supabase.com
   POSTGRES_PORT=6543
   POSTGRES_USER=postgres.YOUR_PROJECT_REF
   POSTGRES_PASSWORD=your-supabase-password
   POSTGRES_DB=postgres
   JWT_SECRET=your-super-secret-jwt-key
   ALLOWED_ORIGINS=https://your-client-url.com
   ```

4. **Get Service ID for GitHub Actions:**
   - In Render dashboard, go to your service
   - Service ID is in the URL: `srv-XXXXX`
   - Get API key from: Account Settings → API Keys

5. **Setup GitHub Secrets:**
   In GitHub repo: Settings → Secrets → Actions, add:
   - `RENDER_SERVICE_ID`: Your service ID (srv-XXXXX)
   - `RENDER_API_KEY`: Your Render API key

### Manual Deployment

To deploy manually via GitHub Actions:
1. Go to Actions tab
2. Select "Deploy Server to Render"
3. Click "Run workflow"
4. Select environment and confirm

### Auto-deployment

Currently set to **manual trigger only**. To enable auto-deploy on push to main, uncomment in `.github/workflows/deploy-server.yml`:
```yaml
on:
  push:
    branches: [main]
```

### Dashboard Link

https://dashboard.render.com/web/srv-d0qeo195pdvs73ai12jg/deploys/dep-d0qeo1h5pdvs73ai12p0
