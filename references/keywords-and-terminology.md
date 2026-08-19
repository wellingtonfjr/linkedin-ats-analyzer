# Keywords & Regional Terminology Reference

Use this as a starting point, not an exhaustive checklist — treat entries as illustrative of the *kind* of terms recruiters search for, and reason about what's actually relevant to the person's real experience. Never suggest a keyword the person doesn't actually have evidence for in their profile; the point is surfacing real gaps, not keyword-stuffing.

## Table of Contents

- [Regional terminology](#regional-terminology)
- [Front-end — React](#front-end--react)
- [Front-end — Angular](#front-end--angular)
- [Front-end — Vue](#front-end--vue)
- [Back-end — Java](#back-end--java)
- [Back-end — Node.js](#back-end--nodejs)
- [Back-end — Python](#back-end--python)
- [Back-end — Go](#back-end--go)
- [Full-stack](#full-stack)
- [Mobile](#mobile)
- [DevOps / SRE](#devops--sre)
- [Data Engineering / ML](#data-engineering--ml)

---

## Regional terminology

| Concept | US | UK | Europe (EU) | Latin America | Notes |
|---|---|---|---|---|---|
| Front-end role title | "Front End Engineer" / "Front End Developer" (both common; "Engineer" trends more senior/FAANG-adjacent) | "Frontend Developer" (one word common) | "Frontend Developer" (one word common in DE/NL job boards too) | "Desarrollador Frontend" / "Front End Developer" (English titles common in tech even on PT/ES profiles) | Match whichever the person's target companies use — check a few real job postings in-region if unsure |
| Back-end role title | "Backend Engineer" / "Software Engineer, Backend" | "Backend Developer" / "Software Engineer" | "Backend Developer" / "Software Engineer" | "Desarrollador Backend" / "Backend Developer" | |
| Seniority | "Senior", "Staff", "Principal" — fairly standardized ladder | "Senior", "Lead" more common than "Staff/Principal" outside big tech | "Senior", "Lead" more common than "Staff/Principal" outside big tech | "Senior", "Semi-Senior" ("SSR"), "Junior" — semi-senior is a distinctly LatAm/ES-market rung with no direct US equivalent | If the person is "semi-senior" and targeting the US/UK, consider whether "Mid-level" reads better there |
| Remote | "Remote", "Hybrid", "On-site" | "Remote", "Hybrid" | "Remote", "Home Office" (esp. DE), "Hybrid" | "Remoto", "Trabajo remoto" — LatAm candidates targeting US/EU remote roles should say "Remote (LatAm timezone)" explicitly | Timezone overlap is a real recruiter search factor for cross-region remote |
| Currency/comp mentions | Rare on profile itself | Rare | Rare | Rare | Not a profile field either way — skip |
| CV vs Resume | "Resume" | "CV" | "CV" | "CV" | Doesn't usually appear on the profile itself, but affects how the person should think about density of detail — EU/UK CVs traditionally denser than US resumes, LinkedIn splits the difference |

### Work authorization — when location ≠ target market

If the person's profile location differs from their target market, work authorization is often the first thing a recruiter checks, and it's worth a short, factual line on the profile rather than leaving it implicit. A few common cases (state these as facts only when you're confident, otherwise ask the person rather than asserting their legal status):

- **EU-based, targeting the UK** (e.g. Portugal → UK): since Brexit, EU citizenship no longer grants automatic UK work rights. Worth a line like "Open to UK relocation/sponsorship discussions" rather than assuming visible EU residency reads as "can work in the UK."
- **EU-based, targeting elsewhere in the EU**: EU citizens generally have free movement across the EU/EEA — usually no authorization note needed, remote/relocation interest is enough.
- **LATAM-based, targeting US/EU**: work authorization is typically the single biggest practical blocker recruiters screen for. If the person doesn't have existing authorization, framing as "open to remote (no relocation)" is usually more realistic than implying on-site eligibility; if they do have authorization or citizenship elsewhere, state it explicitly since it's a genuine differentiator.
- **General rule**: never assert someone's citizenship, visa status, or work eligibility — always phrase it as a question back to them ("do you already have the right to work in the UK, or would this be a sponsorship/relocation situation?") before suggesting specific wording.

## Front-end — React

Core: `React`, `React.js`, `TypeScript`, `JavaScript (ES6+)`, `Redux` / `Zustand` / `Context API`, `React Hooks`, `Next.js`, `component-driven development`, `REST API integration`, `GraphQL`, `responsive design`, `CSS-in-JS` / `Tailwind CSS` / `styled-components`, `Webpack` / `Vite`, `Jest` / `React Testing Library`, `performance optimization` (e.g. "reduced bundle size", "improved Core Web Vitals"), `accessibility (a11y)`, `CI/CD`.

Signals that read as senior: leading a design-system, mentoring, cross-team component library ownership, measurable perf wins.

## Front-end — Angular

Core: `Angular`, `TypeScript`, `RxJS`, `NgRx` / `Akita`, `Angular Material`, `dependency injection`, `component architecture`, `reactive forms`, `REST API integration`, `unit testing (Jasmine/Karma)`, `SCSS`, `CI/CD`, `monorepo (Nx)`.

## Front-end — Vue

Core: `Vue.js`, `Vue 3` / `Composition API`, `Vuex` / `Pinia`, `Nuxt.js`, `TypeScript`, `component-driven development`, `REST API integration`, `Vite`, `unit testing (Vitest/Jest)`, `SCSS/Tailwind`.

## Back-end — Java

Core: `Java`, `Spring Boot`, `Spring Framework`, `microservices`, `REST API design`, `Hibernate / JPA`, `Kafka` / `RabbitMQ` (messaging), `SQL` (Postgres/MySQL), `unit testing (JUnit, Mockito)`, `Maven` / `Gradle`, `CI/CD`, `Docker`, `Kubernetes` (if applicable), `system design`, `scalability`, `distributed systems`.

## Back-end — Node.js

Core: `Node.js`, `Express` / `NestJS` / `Fastify`, `TypeScript`, `REST API design`, `GraphQL`, `PostgreSQL` / `MongoDB`, `microservices`, `message queues (Kafka/RabbitMQ/SQS)`, `unit/integration testing (Jest, Supertest)`, `Docker`, `CI/CD`, `serverless (Lambda)` if applicable.

## Back-end — Python

Core: `Python`, `Django` / `FastAPI` / `Flask`, `REST API design`, `PostgreSQL`, `Celery` (async tasks), `SQLAlchemy` / `ORM`, `unit testing (pytest)`, `Docker`, `CI/CD`, `microservices`, `system design`.

## Back-end — Go

Core: `Go` / `Golang`, `REST/gRPC API design`, `concurrency (goroutines, channels)`, `microservices`, `PostgreSQL`, `Docker`, `Kubernetes`, `CI/CD`, `system design`, `performance/throughput` (Go roles specifically reward mentioning latency/throughput numbers).

## Full-stack

Combine the relevant front-end + back-end lists above based on the person's actual stack, plus: `end-to-end feature ownership`, `API design`, `database design`, `deployment/CI-CD`, `cross-functional collaboration (product/design)`.

## Mobile

Core: `iOS (Swift, SwiftUI)` or `Android (Kotlin, Jetpack Compose)` or `React Native` / `Flutter` (cross-platform), `REST API integration`, `offline-first / caching`, `App Store / Play Store release process`, `CI/CD (Fastlane)`, `unit/UI testing`, `performance profiling`, `push notifications`.

## DevOps / SRE

Core: `CI/CD`, `Kubernetes`, `Docker`, `Terraform` / `IaC`, `AWS` / `GCP` / `Azure`, `observability (Prometheus, Grafana, Datadog)`, `incident response / on-call`, `SLOs/SLIs`, `infrastructure automation`, `cost optimization`, `security hardening`.

## Data Engineering / ML

Core: `Python`, `SQL`, `Airflow` / `dbt` (pipelines), `Spark`, `data warehousing (Snowflake/BigQuery/Redshift)`, `ETL/ELT`, `PyTorch` / `TensorFlow` (if ML), `model deployment / MLOps`, `A/B testing`, `data quality / validation`.
