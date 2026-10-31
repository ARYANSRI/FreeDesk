# FeeDesk

A multi-tenant web application for coaching centers and tutors to collect fees, track attendance, and eliminate manual WhatsApp fee chasing.

## Tech Stack (Phase 0 Scaffold)

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Theme:** FeeDesk Design System (Deep Teal `#0F766E`, Warm Off-White `#FAF8F5`, 8px Radius)
- **Database & Auth:** Supabase (Postgres + Supabase Auth) [Phase 1]
- **ORM:** Prisma [Phase 1]
- **Payments:** Razorpay [Phase 4]
- **Testing:** Vitest + React Testing Library

## Prerequisites on Windows

- Node.js LTS (v18+ or v20+)
- npm (v9+)
- Git for Windows

## Quick Start on Windows

1. **Install dependencies:**

   ```powershell
   npm install
   ```

2. **Set up environment variables:**

   ```powershell
   Copy-Item .env.example .env.local
   ```

3. **Run the development server:**

   ```powershell
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Run tests:**

   ```powershell
   npm test
   ```

5. **Run lint & formatting checks:**
   ```powershell
   npm run lint
   npm run format:check
   ```

## Folder Structure

```
d:\Project\
├─ doc/                      # Project planning pack (PRD, rules, DB schema, design)
├─ src/
│  ├─ app/
│  │  ├─ (marketing)/        # Landing page
│  │  ├─ (auth)/             # Login, signup, invite
│  │  ├─ (dashboard)/        # Admin & staff application
│  │  ├─ pay/[token]/        # Public parent payment portal (mobile-first, no login)
│  │  └─ api/                # Razorpay webhooks & cron jobs
│  ├─ components/            # UI components (Button, Card, shadcn tokens)
│  ├─ lib/                   # Auth, DB, billing (paise conversion), notifications
│  └─ tests/                 # Vitest test suites
├─ .env.example              # Template for environment variables
├─ .gitignore                # Excludes .env, node_modules, .next
├─ package.json
├─ tailwind.config.ts
└─ tsconfig.json
```
