# User profile — Yosward Ríos / Chamba Digital / Hothelia

## Persona
- Nombre: Yosward Ríos (dueño del backend / Product Engineer / Fullstack / AI).
- Rol: Product Engineer/Fullstack/AI, Perú, remote LATAM/worldwide.
- Perfil técnico: TS + Next.js + React + Nest.js + Node + Postgres/Prisma + Redis; LLMs + RAG; Railway/Cloudflare/Docker. Flagship: Hothelia.
- Cliente activo: Peña Linda Bungalows (Máncora, 26 habitaciones) — modelo reservas + consumo, comisión 5% sobre neto.

## Preferencias recurrentes (verificadas en cada turno)
- Conciso, sin relleno (no "Great!", no "I'd be happy!").
- Acción sobre descripción (entregar artefacto funcional, no solo plan).
- Precisión > estética (bugs y features operativas primero).
- Estructura clara (archivos en carpetas, commits concisos).
- Sin datos inventados (reportar bloqueos honestamente).
- Colores: #dc2626, #2563eb, #eab308, dark/light.
- Informes profesionales con KPIs (RevPAR, ADR, ocupación, ROI, costo operativo) — Bruto y Neto simultáneos.
- Comisión 5% sobre NETO (no bruto).
- Data isolation entre tenants prioritario (per-schema).

## Contexto proyecto Reservana (Otelia Beach Club PMS)
- Nombre proyecto: Reservana (independiente, aunque se conecta con Otelia.com como módulo posible).
- Stack: Next.js 14/15 + TypeScript + Prisma + Postgres + Firebase.
- Entregables: pitch (docs/pitch.md), spec (docs/spec.md), wireframe (public/wireframe.html), plan (docs/plans/next-steps.md), modelos (app/models/), componentes (app/components/), dashboard (app/dashboard/page.tsx), buscador (app/search/page.tsx), detalle club (app/club/[id]/page.tsx), admin (app/admin/page.tsx), onboarding (app/onboarding/page.tsx).
- Modelo SaaS: Esencial $40/mes, Pro $85/mes, Anual -20%, Desarrollo $500/mes.
- Inversión MVP: ~$5.300 USD (3 meses).
- Mercado fase 1: Margarita (Venezuela) — 15+ beach clubs.
- Onboarding: 3 pasos, accesible para administradores/proprietarios no técnicos, primer mes gratis (5 clubs piloto).
- Pagos: Cashea SDK (instalado), Pago Móvil, USDT/Cripto (listos para conectar en producción).
- Diseño: Solaris Light (claro: #fdf6e3, #fffdf5) + Tokyo Night (oscuro: #0f1117, #161b22); HeroUI manual (Tailwind v4); UI/UX táctil (pantallas táctiles, tablets, smartphones): minHeight 48px/56px, gap generoso, colores variables CSS.
- Despliegue: Railway (railway.json: builder DOCKERFILE, numReplicas 1, restartPolicy ON_FAILURE) + GitHub Actions (.github/workflows/deploy.yml: deploy automático con npm run build + npm start).
- Restricciones clave: NUNCA `git add -A` (absorbe trabajo frontend); `patch` con `read_file` completo (stale_write_blocked); `.dockerignore` (node_modules/, .next/); `.gitignore` (node_modules/, .next/, .env.local, AGENTS.md, tsconfig.json, package-lock.json); `ThemeToggle` con `'use client'`; `next.config.js` con `output: standalone`; `Dockerfile` multi-stage (builder + runner, alpine).
