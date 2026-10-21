# MyCorner — Nostalgic Social Experience Platform

## Author

| Roll No. | Name | GitHub username |
|---|---|---|
| 24ESKCS072 | Atharva Mann Singh Shekhawat | jabroneo |

## About

MyCorner is an interactive web-based social platform inspired by nostalgic web aesthetics and the stylized UI of modern gaming (such as Persona 5). It allows users to express their identity through customizable profiles, expressive feeds, modular themes, and community feeds.

This repository serves as the complete DevOps deployment showcase for CSUL511, demonstrating version control best practices, automated CI testing, Jenkins pipeline orchestration, multi-stage Docker containerization, cloud deployment, Prometheus monitoring, and Kubernetes orchestration.

## Tech Stack

- **Frontend**: React 19, Vite, Vanilla CSS
- **Testing**: Vitest, React Testing Library, JSDOM
- **CI/CD**: GitHub Actions, Jenkins
- **Containerization**: Docker, Docker Compose, Nginx Alpine
- **Container Registry**: GitHub Container Registry (ghcr.io)
- **Orchestration**: Kubernetes (Deployments, Services, Readiness/Liveness Probes)
- **Monitoring**: Prometheus, Grafana

## Running Locally

### Prerequisites
- Node.js (v20+)
- npm (v10+)

### Setup Instructions
```bash
# 1. Install dependencies
npm install

# 2. Run unit and component test suite
npm test

# 3. Start development server
npm run dev

# 4. Build for production
npm run build
```

## Running with Docker

```bash
# Build and run the container locally
docker build -t devops-24eskcs072 .
docker run -p 10000:10000 devops-24eskcs072

# Or launch with Docker Compose including Prometheus monitoring
docker-compose up -d
```

## Live URL

https://skit-devops-2026.github.io/devops-24ESKCS072/

Cloud Web Service Deployment:
https://devops-24eskcs072.onrender.com

## Health and Metrics Endpoints

- **Health Endpoint**: `GET /health` returns JSON status and runtime commit info.
- **Metrics Endpoint**: `GET /metrics` returns standard Prometheus formatted operational metrics.

## DevOps Architecture

1. **Repository Setup & Hygiene (M1)**: Strict `.gitignore`, structured commit history, and automated hygiene checks preventing oversized artifacts or secrets.
2. **Branching & PRs (M2)**: Structured feature branching workflow with detailed PR documentation and automated status checks.
3. **Automated CI (M3)**: Multi-step GitHub Actions workflow running code hygiene, Vitest unit/component tests, and production build checks.
4. **Jenkins Pipeline (M4)**: Declarative `Jenkinsfile` orchestrating checkout, environment verification, test execution, and container build.
5. **Containerization (M5)**: Optimized multi-stage Docker build served via Nginx with dynamic port configuration for cloud runtime.
6. **Deployment & Monitoring (M6)**: Live production deployment with Prometheus scrape configuration and Grafana dashboard visualization.
7. **Kubernetes (M7)**: Declarative Kubernetes Deployment and Service manifests with health probes for automated container orchestration.

## Documentation

- [System Architecture](docs/architecture.md)
- [Deployment Verification & Evidence](docs/deployment.md)
