# System Architecture — MyCorner

This document details the architectural layout and continuous delivery pipeline for MyCorner.

```mermaid
flowchart TD
    subgraph Development
        Dev[Developer Workstation] -->|Git Push| GitHub[GitHub Repository]
    end

    subgraph "Continuous Integration (GitHub Actions & Jenkins)"
        GitHub -->|Webhook Trigger| GHA[GitHub Actions CI]
        GitHub -->|SCM Polling / Webhook| Jenkins[Jenkins Pipeline]
        GHA --> Hygiene[Code Hygiene Checks]
        GHA --> UnitTests[Vitest Test Suite]
        GHA --> Build[Vite Production Bundle]
        Hygiene --> DockerBuild[Docker Multi-Stage Build]
        UnitTests --> DockerBuild
        Build --> DockerBuild
        DockerBuild -->|Publish Image| GHCR[GitHub Container Registry: ghcr.io]
    end

    subgraph "Cloud & Orchestration"
        GHCR -->|Pull Image| Render[Render.com Cloud App]
        GHCR -->|Pull Image| K8s[Kubernetes Cluster]
        
        subgraph "Kubernetes Architecture"
            Service[mycorner-service ClusterIP:80] --> Pod1[mycorner-deployment Pod 1]
            Service --> Pod2[mycorner-deployment Pod 2]
            Pod1 --> HealthProbe[Readiness / Health: 10000]
            Pod2 --> HealthProbe
        end
    end

    subgraph "Observability & Monitoring"
        Prometheus[Prometheus Server] -->|Scrape /metrics| Render
        Prometheus -->|Scrape /metrics| K8s
        Grafana[Grafana Dashboard] -->|Visualize Metrics| Prometheus
    end
```

## Architectural Highlights

- **Multi-Stage Containerization**: Minimizes image attack surface and final image size using `node:20-alpine` for asset compilation and `nginx:alpine` for fast static asset delivery.
- **Resilient Health Probing**: K8s Deployment features liveness and readiness probes connected to `/health` to guarantee zero-downtime rolling updates.
- **Standardized Prometheus Observability**: Custom scraping configuration pulling operational indicators from `/metrics`.
