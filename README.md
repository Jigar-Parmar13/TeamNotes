# 🗒️ TeamNotes — DevSecOps CI/CD Project

<div align="center">

![CI Pipeline](https://github.com/Jigar-Parmar13/TeamNotes/actions/workflows/ci.yml/badge.svg)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Jigar-Parmar13_TeamNotes&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Jigar-Parmar13_TeamNotes)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=Jigar-Parmar13_TeamNotes&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=Jigar-Parmar13_TeamNotes)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=Jigar-Parmar13_TeamNotes&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=Jigar-Parmar13_TeamNotes)
[![Docker Pulls](https://img.shields.io/docker/pulls/jigar1311/teamnotes-backend)](https://hub.docker.com/r/jigar1311/teamnotes-backend)

**A full-stack Notes application with a production-grade DevSecOps pipeline**

[Pipeline](#-cicd-pipeline) • [Tech Stack](#-tech-stack) • [Run Locally](#-run-locally) • [Docker](#-docker) • [Project Structure](#-project-structure)

</div>

---

## 📌 Overview

TeamNotes is a full-stack Notes application built with **Node.js + Express** backend and **React + Vite** frontend. The focus of this project is implementing a **complete industry-level DevSecOps pipeline** — integrating security scanning (SonarQube + Trivy) directly into the CI/CD workflow so security is never an afterthought.

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

---

## 🐳 Docker

### Pull from DockerHub

```bash
# Backend
docker pull jigar1311/teamnotes-backend:latest
docker run -d -p 3000:3000 jigar1311/teamnotes-backend:latest

# Frontend
docker pull jigar1311/teamnotes-frontend:latest
docker run -d -p 3001:80 jigar1311/teamnotes-frontend:latest

# Docker-compose
docker compose up --build
docker compose down
```

### Image Details

| Image | Base | Size | Features |
|---|---|---|---|
| `teamnotes-backend` | node:18-alpine | ~186MB | Multi-stage, non-root user, healthcheck |
| `teamnotes-frontend` | nginx:alpine | ~93MB | Multi-stage, Vite build, React Router fix |

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
├── sonar-project.properties    # SonarCloud config
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

## 🎯 DevSecOps Concepts Demonstrated

- **Multi-stage Docker builds** — separate build and runtime stages
- **Layer caching** — `package.json` copied before source for faster CI
- **Non-root containers** — security best practice
- **Health checks** — container self-reports health status
- **Quality gates** — SonarQube blocks bad code automatically
- **Secret management** — GitHub Secrets, zero hardcoded credentials
- **Shift-left security** — security runs BEFORE deployment, not after
- **CVE scanning** — Trivy catches vulnerabilities before they reach production

---

## 👤 Author

**Jigar Parmar** — Learning DevSecOps

[![GitHub](https://img.shields.io/badge/GitHub-Jigar--Parmar13-black?logo=github)](https://github.com/Jigar-Parmar13)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Jigar%20Parmar-blue?logo=linkedin)](https://www.linkedin.com/in/jigar-parmar-95817928a/)
[![DockerHub](https://img.shields.io/badge/DockerHub-jigar1311-blue?logo=docker)](https://hub.docker.com/u/jigar1311)

---

<div align="center">
⭐ Star this repo if you found it helpful!
</div>
