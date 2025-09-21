# RIMA Project Phases

Menurut saya, enaknya mulai dari setup dasar (Phase 1) karena itu fondasi yang stabil dan low-risk—setelah itu build backend dulu sebelum frontend, supaya API siap. Berikut fase pengerjaan lengkap untuk RIMA (berbasis sequential thinking, fokus pada dependencies dan integrasi):

## Fase 1: Project Setup (1-2 hari)
- Buat struktur folder: `backend/` (NestJS), `frontend/` (Angular), `.env` placeholder.
- Init git, .gitignore.
- Install basic deps dengan BUN: Backend (NestJS, Mongoose, Auth0), Frontend (Angular, PrimeNG, Tailwind).
- Setup Railway: Node untuk backend/frontend, MongoDB.

## Fase 2: Backend Foundation (2-3 hari)
- NestJS app: MongoDB connection, Auth0 guards, user schema (roles, verification), hardcode first dev.
- Basic auth endpoints (/auth/login, /auth/callback), role guards.

## Fase 3: Backend Core (3-4 hari)
- Modules: Patients (CRUD, health notes array), Reminders (CRUD, recurrence schema), Content (Articles/Videos).
- Endpoints: /patients, /reminders, /content, /cron (trigger reminder checks/sends).
- Role-based access (Relawan see own patients, Admin/Developer all).

## Fase 4: Backend Integrations (2-3 hari)
- Fonnte: /webhook/fonnte/incoming (parse incoming, LLM classify, update DB).
- LLM: Service with Anthropic prompts, track usage/cost.
- YouTube: ytdl-core for video metadata.
- WebSocket: Native WS gateway for real-time updates.

## Fase 5: Frontend Foundation (2-3 hari)
- Angular app: Routing, Auth0 SDK, PWA schematic, Tailwind config.
- Basic layout: Header/sidebar, guards for roles/pending.

## Fase 6: Frontend Core (4-5 hari)
- Pages: /patients (list/search/add/filter), /patients/:id (details, health notes CRUD), /reminders, /content (tabs add article/video).
- Components: PatientCard, ReminderForm (custom datetime picker: PrimeNG Calendar + recurrence options), PrimeNG Editor for articles.

## Fase 7: Frontend Integrations (2-3 hari)
- WebSocket client: Listen for patient/reminder updates.
- Push notifications: Angular Service Worker setup.
- Connect to backend APIs, handle responses.

## Fase 8: Testing & Deployment (2-3 hari)
- Unit/integration tests: Jest mocks for Fonnte/LLM.
- Deploy to Railway: Backend node, frontend GitHub node, MongoDB.
- Test workflows end-to-end (add patient -> verify -> reminder -> confirm).

Mulai dari Phase 1, lalu iterate per fase. Jika ada issue, fokus fix dulu sebelum lanjut.