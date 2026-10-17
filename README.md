<div align="center">

<img src="frontend/src/assets/unihub.png" alt="UniHub logo" width="150" />

# UniHub · Smart Campus

**One campus. Connected resources, bookings, and support.**

A campus operations hub for students, staff, managers, technicians, and administrators.

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=111827)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2.5-6DB33F?style=flat-square&logo=springboot&logoColor=white)
![Java](https://img.shields.io/badge/Java-21-ED8B00?style=flat-square)
![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1?style=flat-square&logo=mysql&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)

[Features](#features) · [Quick start](#quick-start) · [Configuration](#configuration) · [Testing](#testing) · [Project structure](#project-structure)

</div>

---

## Overview

UniHub brings campus resource discovery, reservations, incident reporting, and maintenance workflows into one React application backed by a Spring Boot REST API.

**IT3030 — Programming Applications and Frameworks · 2026 · Year 3 · Semester 1 · Group WD-82**

## Features

- **Campus resources** — browse rooms, laboratories, and equipment; filter resources and manage availability.
- **Bookings** — create reservations, track your bookings, cancel requests, and manage administrative approval.
- **Incident tickets** — report issues, attach images, add comments, assign technicians, and track progress.
- **Role-based workspaces** — dedicated dashboards for users, managers, technicians, and administrators.
- **Accounts** — email/password registration, Google sign-in, profile editing, and notification preferences.
- **Notifications and activity** — in-app notifications, SMTP email delivery, and administrative audit logs.
- **Reporting** — dashboard summaries, charts, and booking analytics.

## Built with

**Frontend:** React 19, Vite 7, React Router 7, Tailwind CSS 3, Axios, Recharts, Framer Motion, and Lucide icons.

**Backend:** Java 21, Spring Boot 3.2.5, Spring Security, Spring Data JPA, Hibernate, MySQL, and Spring Mail.

**Testing:** JUnit 5, Mockito, MockMvc, and an isolated H2 database. GitHub Actions checks backend tests and the frontend.

## Quick start

### 1. Install prerequisites

- **JDK 21** with `JAVA_HOME` configured.
- **Node.js 22.12+** and npm.
- **MySQL 8** running locally, or an accessible MySQL database.
- Maven is supplied through the wrapper in `backend/`.

### 2. Start the API

Open PowerShell in the project root:

```powershell
$env:DB_USERNAME = "root"
$env:DB_PASSWORD = "your-local-mysql-password"
cd backend
.\mvnw.cmd spring-boot:run
```

The default database URL is `jdbc:mysql://localhost:3306/paf?createDatabaseIfNotExist=true`. Your database account must be allowed to create the database, or you can create `paf` beforehand.

The API runs at **http://localhost:8081**.

On macOS/Linux, set the equivalent environment variables and run `./mvnw spring-boot:run` from `backend/`.

### 3. Start the web app

In a second terminal at the project root:

```powershell
cd frontend
npm ci
npm run dev
```

Open **http://localhost:5173**. Keep this port available: the backend's local CORS and OAuth redirect settings use it.

On Windows, `start-dev.bat` also starts the frontend after dependencies are installed.

### 4. Create your first account

Register through the application. New accounts receive the `USER` role.

To make an existing account the initial administrator, stop the backend, set `APP_ADMIN_EMAIL` to that account's email, and restart it from `backend/`:

```powershell
$env:APP_ADMIN_EMAIL = "your-registered-email@example.com"
.\mvnw.cmd spring-boot:run
```

This promotes only an already registered account. Remove the environment variable after the first setup; the role remains stored in the database. Administrators can then manage users through the dashboard.

## Configuration

Backend settings live in [`application.properties`](backend/src/main/resources/application.properties). Supply secrets through environment variables or your IDE's run configuration. The backend does **not** automatically load a `.env` file.

### Database

- `DB_URL` — MySQL JDBC URL; defaults to the local `paf` database.
- `DB_USERNAME` — database username; defaults to `root`.
- `DB_PASSWORD` — database password.
- `APP_ADMIN_EMAIL` — optional, explicit promotion of an existing account during startup.

Hibernate uses `ddl-auto=update` for development. Review schema migration and deployment configuration before hosting a shared instance.

### Google sign-in · optional

Set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in the backend environment. Configure the authorized redirect URI in your Google project as:

```text
http://localhost:8081/login/oauth2/code/google
```

For the frontend, copy `frontend/.env.example` to `frontend/.env.local` and set `VITE_GOOGLE_CLIENT_ID` to the same public client ID. Restart Vite after changing it.

Email/password authentication works without Google credentials. Google sign-in requires valid configuration.

### Email · optional

Set `SMTP_USERNAME`, `SMTP_PASSWORD`, and `SMTP_FROM`. The defaults use Gmail at port 587; override `SMTP_HOST` and `SMTP_PORT` for another provider.

Email delivery requires valid SMTP credentials. With email unconfigured, delivery attempts may fail while the core application remains available.

### Ticket image storage · optional

Set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`. Ticket attachments use the `ticket-images` storage bucket and public image URLs; configure that bucket in your Supabase project.

Image uploads require a working storage configuration. Keep the service-role key in the backend environment only.

> **Existing credentials:** earlier project files contained database, Google OAuth, SMTP, and Supabase credentials. Replace or revoke those credentials with their providers before reusing the project. Removing them from this folder does not revoke them or remove copies elsewhere.

## Testing

From `backend/`:

```powershell
.\mvnw.cmd -B test
```

Tests use the H2 configuration in `backend/src/test/resources/application.properties`, so they do not require your MySQL database or real external-service credentials.

From `frontend/`:

```powershell
npm run lint
npm run build
```

From the project root on Windows, run all checks with:

```powershell
.\run-tests.bat
```

The script stops if a check fails. Maven test reports are generated in `backend/target/surefire-reports/`; frontend production files are generated in `frontend/dist/`.

CI configuration: [`.github/workflows/ci.yml`](.github/workflows/ci.yml).

## Project structure

```text
UniHub/
├── backend/
│   ├── .mvn/                 Maven wrapper configuration
│   ├── src/main/java/        REST APIs, security, services, and entities
│   ├── src/main/resources/   Backend configuration
│   ├── src/test/             Unit, repository, and integration tests
│   └── pom.xml               Java dependencies and build
├── frontend/
│   ├── src/components/       Shared UI and feature components
│   ├── src/context/          Authentication, notifications, and toasts
│   ├── src/pages/            Role-specific screens
│   ├── src/services/         API clients
│   └── package.json          Frontend dependencies and scripts
├── docs/
│   └── ResourceAPI.postman_collection.json
├── .github/workflows/ci.yml
├── seed_resources.sql        Optional seed data; review before use
├── start-dev.bat
├── run-tests.bat
└── README.md
```

## API and development notes

- API requests use the `/api` prefix at `http://localhost:8081`.
- Login creates a server session; the frontend sends its session cookie with requests. An email header is not authentication.
- Resource API examples are available in the [Postman collection](docs/ResourceAPI.postman_collection.json).
- Keep generated output, runtime databases, uploads, and local secrets out of version control.
- Use the same hostname (`localhost`) for the browser and API to avoid local session-cookie issues.

---

<div align="center">

**UniHub — Smart Campus Operations Hub**  
IT3030 · Group WD-82 · 2026

</div>
