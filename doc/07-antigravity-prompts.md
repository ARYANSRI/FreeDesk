# 07. Antigravity Prompts and Project Rules

How to use: build **one phase at a time**. Start each phase by asking the agent to read the docs and propose a plan, review the plan, then let it build. After each phase, run the app, test it, and commit to Git.

> I haven't verified Antigravity's current features. If it supports project rules or workspace instructions, paste the "Project rules" section there. Otherwise, include it at the top of your first prompt and keep it in `docs/`.

---

## 1. Project rules (paste once, keep in the repo)

```
You are helping build FeeDesk, a multi-tenant web app for coaching centers
(fee collection, attendance). Read everything in /docs before coding.

STACK
- Next.js (App Router) + TypeScript, Tailwind CSS, shadcn/ui
- PostgreSQL with [Prisma or Drizzle]
- Auth: [chosen provider]
- Razorpay (test mode), Resend for email
- Validation with Zod, tests with Vitest and Playwright

NON-NEGOTIABLE RULES
1. Multi-tenancy: every business table has center_id. center_id comes from
   the server-side session, never from the request body or URL.
2. Authorize every endpoint and server action by role AND center.
3. Money is stored as integer paise. Never use floats for money.
4. Payments are confirmed only by verified gateway webhooks, with
   idempotency. Never trust the browser redirect.
5. Validate all input with Zod on the server.
6. Never hardcode secrets. Use environment variables; keep .env out of Git.
7. Follow /docs/05-design-system.md exactly. Do not add gradients, emojis,
   or decorative elements that are not specified.
8. Mobile-first: everything must work at 360px width.
9. Include loading, empty, and error states for every screen.
10. Write tests for business rules and for tenant isolation.
11. Keep changes small. Explain what you changed and how to run it.
12. If something in the docs is ambiguous or marked OPEN/TODO, ask me
    instead of guessing.
```

---

## 2. Phase prompts

### Phase 0: Scaffold
```
Read all files in /docs. Then:
1. Summarize the product and the rules back to me in 10 lines.
2. List any ambiguities or OPEN decisions you see.
3. Propose the project setup plan (do not write code yet).
Wait for my approval.
```
After approval:
```
Create the Next.js + TypeScript project with Tailwind and shadcn/ui,
following the folder structure in /docs/04-architecture-and-api.md.
Set up ESLint, Prettier, Vitest, and a .env.example with the variable names
from the docs. Configure the Tailwind/shadcn theme using the colors, fonts,
radius, and spacing from /docs/05-design-system.md. Show me how to run it.
```

### Phase 1: Foundation (database, auth, tenancy)
```
Implement Phase 1 from /docs/06-plan-and-launch.md.
- Create the database schema from /docs/03-database-design.md with
  migrations.
- Implement signup (creates a center + admin), login, logout, and a
  /api/me endpoint.
- Implement role checks for admin and staff.
- Create a tenant-scoped query helper so queries always filter by center_id.
- Enable Row Level Security policies if using Supabase/Postgres.
- Write automated tests proving a user from Center A cannot read, update,
  or delete Center B's data.
Show me the plan first, then implement.
```

### Phase 2: Batches and students
```
Implement batches, students, and enrollments (CRUD, archive, search) with
the permissions in /docs/01-PRD.md section 6. Build the Students and Batches
screens using the layouts in /docs/05-design-system.md. Staff can only see
their own batches. Add Zod validation and tests. Add a duplicate-student
warning as described in /docs/02-business-rules.md.
```

### Phase 3: Invoices and manual payments
```
Implement invoice generation per /docs/02-business-rules.md:
- monthly generation by billing day in Asia/Kolkata
- unique (center_id, student_id, period_month) so re-runs are safe
- invoice items, statuses, and numbering per center
- manual payment recording with an audit log entry
- receipts
- the admin dashboard totals (collected, pending, overdue)
Write unit tests for billing logic and edge cases listed in section 9 of
/docs/02-business-rules.md.
```

### Phase 4: Online payments
```
Integrate Razorpay in test mode following section 3.1 of
/docs/04-architecture-and-api.md.
- Public /pay/[token] page (mobile-first, no login)
- Create an order for the exact balance
- Webhook endpoint: verify signature, dedupe using webhook_event,
  record payment in a database transaction, update invoice status
- Never mark an invoice paid from the client-side redirect
- Tests: duplicate webhook, invalid signature, webhook arriving before
  redirect, partial payment
Explain how to test with Razorpay's test cards and a tunnel (e.g., ngrok)
for the webhook.
```

### Phase 5: Reminders and attendance
```
Implement reminder scheduling and sending (email via Resend) per
/docs/02-business-rules.md section 5, including quiet hours, stop
conditions, and a frequency cap. Add the "Send on WhatsApp" button that
opens a pre-filled wa.me link. Then implement the attendance sheet and
history per section 6, with staff limited to their own batches.
Add tests for reminder skipping and attendance permissions.
```

### Phase 6: Polish, security, deploy
```
Review the whole app against:
- the security checklist in /docs/04-architecture-and-api.md section 5
- the "definition of done" in /docs/06-plan-and-launch.md
- the accessibility and performance targets in /docs/05-design-system.md
List problems found, fix them, and add end-to-end Playwright tests for:
signup → add student → generate invoice → pay (test mode) → receipt.
Then give me deployment steps for Vercel and a production checklist.
```

---

## 3. Useful follow-up prompts

**When something breaks**
```
Here is the error and the file involved: [paste]. Explain the cause in
simple terms, fix it with the smallest change, and add a test so it
doesn't return.
```

**Code review**
```
Act as a strict senior reviewer. Review the code from this phase for
tenant-isolation leaks, missing authorization, unvalidated inputs,
money-handling mistakes, and race conditions. List issues by severity.
```

**Design pass without the "AI look"**
```
Review the screens against /docs/05-design-system.md. Remove anything
that looks like a generic template: gradients, emojis, buzzword copy,
inconsistent spacing. Replace placeholder text with the plain language
used by coaching center owners. Do not add new decorative elements.
```

**Explain it to me**
```
Explain how the webhook processing works, step by step, as if I'm new to
backend development. Point to the exact files and functions.
```

---

## 4. Habits that keep AI-built code safe

- Read the agent's plan before it writes code.
- Commit to Git after every working step so you can undo.
- Run the app and click through it; don't trust "it works".
- Test the **failure** cases (wrong role, other center's ID, duplicate webhook).
- Keep prompts small and specific; one feature at a time.
- Never paste real secrets into prompts.
- Re-read the business rules when a bug looks like a "logic" bug.
