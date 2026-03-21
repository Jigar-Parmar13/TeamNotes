# 🗒️ TeamNotes — DevOps CI/CD Project

<div align="center">

![CI Pipeline](https://github.com/Jigar-Parmar13/TeamNotes/actions/workflows/ci.yml/badge.svg)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Jigar-Parmar13_TeamNotes&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Jigar-Parmar13_TeamNotes)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=Jigar-Parmar13_TeamNotes&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=Jigar-Parmar13_TeamNotes)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=Jigar-Parmar13_TeamNotes&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=Jigar-Parmar13_TeamNotes)
[![Docker Pulls](https://img.shields.io/docker/pulls/jigar1311/teamnotes-backend)](https://hub.docker.com/r/jigar1311/teamnotes-backend)

**A full-stack Notes application with a production-grade DevOps pipeline**

[Pipeline](#-cicd-pipeline) • [Tech Stack](#-tech-stack) • [Run Locally](#-run-locally) • [Docker](#-docker) • [Project Structure](#-project-structure)

</div>

---

## 📌 Overview

TeamNotes is a full-stack Notes application built with **Node.js + Express** backend and **React + Vite** frontend. The focus of this project is implementing a **complete industry-level DevOps pipeline** — from code quality checks to automated container deployments.

---

## 🚀 CI/CD Pipeline

Every push to `main` automatically triggers this 3-stage pipeline:

```
Code Push to GitHub
        │
        ▼
┌─────────────────────┐
│  Job 1 — SonarQube  │  Code quality gate
│  Code Quality Scan  │  Security · Reliability · Maintainability
└──────────┬──────────┘
           │ passes
           ▼
┌─────────────────────────────┐
│  Job 2 — Docker + Trivy     │  Build both images
│  Build & Security Scan      │  Scan CRITICAL/HIGH CVEs
└──────────┬──────────────────┘
           │ passes
           ▼
┌─────────────────────────────┐
│  Job 3 — DockerHub Push     │  Push :latest tag
│  Automated Image Delivery   │  jigar1311/teamnotes-backend
└─────────────────────────────┘  jigar1311/teamnotes-frontend
```

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Backend | Node.js 18 + Express | REST API on port 3000 |
| Frontend | React + Vite | UI served via Nginx on port 80 |
| Containerization | Docker (multi-stage) | Optimized production images |
| Image Registry | DockerHub | Stores backend + frontend images |
| CI/CD | GitHub Actions | Automated 3-job pipeline |
| Code Quality | SonarCloud | Quality gate, bug detection |
| Security Scanning | Trivy | CVE scanning on Docker images |
| Orchestration | Kubernetes (Minikube) | Local K8s deployment practice |

---

## 🏃 Run Locally

### Option 1 — Plain Node.js (fastest)

```bash
# Backend
cd backend
npm install
node src/server.js
# open http://localhost:3000

# Frontend
cd frontend
npm install
npm run dev
# open http://localhost:5173
```

### Option 2 — Docker (recommended)

```bash
# Backend
docker build -t teamnotes-backend ./backend
docker run -d -p 3000:3000 --name teamnotes-backend teamnotes-backend

# Frontend
docker build -t teamnotes-frontend ./frontend
docker run -d -p 80:80 --name teamnotes-frontend teamnotes-frontend
```

### Option 3 — Docker Compose (runs everything together)

```bash
docker compose up --build
# Backend  → http://localhost:3000
# Frontend → http://localhost:80
```

---

## 🐳 Docker

### Pull from DockerHub

```bash
# Backend
docker pull jigar1311/teamnotes-backend:latest
docker run -d -p 3000:3000 jigar1311/teamnotes-backend:latest

# Frontend
docker pull jigar1311/teamnotes-frontend:latest
docker run -d -p 80:80 jigar1311/teamnotes-frontend:latest
```

### Image Details

| Image | Base | Size | Features |
|---|---|---|---|
| `teamnotes-backend` | node:18-alpine | ~186MB | Multi-stage, non-root user, healthcheck |
| `teamnotes-frontend` | nginx:alpine | ~93MB | Multi-stage, Vite build, React Router fix |

---

## ☸️ Kubernetes (Local — Minikube)

```bash
# Start Minikube
minikube start

# Deploy everything
kubectl apply -f k8s/

# Check pods are running
kubectl get pods -n teamnotes

# Access the app
minikube service teamnotes-backend-svc -n teamnotes

# Scale up
kubectl scale deployment teamnotes-backend --replicas=3 -n teamnotes

# Rollback if needed
kubectl rollout undo deployment/teamnotes-backend -n teamnotes
```

---

## 📁 Project Structure

```
TeamNotes/
├── .github/
│   └── workflows/
│       └── ci.yml              # 3-job CI pipeline
├── backend/
│   ├── src/
│   │   └── server.js           # Express API
│   ├── data/
│   │   └── notes.json          # Data storage
│   ├── Dockerfile              # Multi-stage Node.js build
│   ├── .dockerignore
│   └── package.json
├── frontend/
│   ├── src/                    # React components
│   ├── Dockerfile              # Multi-stage Vite + Nginx build
│   ├── nginx.conf              # React Router config
│   ├── .dockerignore
│   └── package.json
├── k8s/
│   ├── namespace.yml
│   ├── deployment.yml          # 2 replicas, rolling update
│   ├── service.yml
│   └── ingress.yml
├── sonar-project.properties    # SonarCloud config
├── docker-compose.yml          # Local multi-service setup
└── README.md
```

---

## 🔐 Security

- All credentials stored in **GitHub Secrets** — zero hardcoded tokens
- Docker containers run as **non-root user** (`appuser`)
- **Trivy** scans every image for CRITICAL/HIGH CVEs on every push
- **Branch protection** on `main` — CI must pass before merge
- **SonarCloud** quality gate blocks bad code automatically

---

## 📊 SonarCloud Analysis

| Metric | Status |
|---|---|
| Quality Gate | ✅ Passed |
| Security | 🅐 |
| Reliability | 🅐 |
| Maintainability | 🅐 |
| Duplications | 0.0% |

---

## 🎯 DevOps Concepts Demonstrated

- **Multi-stage Docker builds** — separate build and runtime stages
- **Layer caching** — `package.json` copied before source for faster CI
- **Non-root containers** — security best practice
- **Health checks** — Kubernetes liveness and readiness probes
- **Rolling updates** — zero-downtime deployments in Kubernetes
- **Immutable image tags** — Git SHA tags for precise rollbacks
- **Quality gates** — automated code quality enforcement
- **Secret management** — GitHub Secrets, no hardcoded credentials

---

## 👤 Author

**Jigar Parmar** — Learning DevOps

[![GitHub](https://img.shields.io/badge/GitHub-Jigar--Parmar13-black?logo=github)](https://github.com/Jigar-Parmar13)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?logo=linkedin)](https://linkedin.com/in/YOUR_LINKEDIN)
[![DockerHub](https://img.shields.io/badge/DockerHub-jigar1311-blue?logo=docker)](https://hub.docker.com/u/jigar1311)

---

<div align="center">
⭐ Star this repo if you found it helpful!
</div>
