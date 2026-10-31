# 04. Architecture and API

---

## 1. Tech stack (free-tier friendly)

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js** (App Router) + **TypeScript** | Frontend and backend in one project |
| Styling | **Tailwind CSS** + **shadcn/ui** | Customize the theme (see `05`) |
| Database | **PostgreSQL** via **Supabase** or **Neon** | OPEN DECISION: pick one |
| ORM | **Prisma** or **Drizzle** | |
| Auth | **Supabase Auth**, **Clerk**, or **Auth.js** | OPEN DECISION |
| Payments | **Razorpay** (test mode first) | Payment Links or Orders + Checkout |
| Email | **Resend** | Free tier is small; fine for the pilot |
| Background jobs | **Vercel Cron** or **Supabase cron / pg_cron** | Invoice generation, reminders |
| Validation | **Zod** | Validate every input on the server |
| Testing | **Vitest** + **Playwright** | Unit and end-to-end |
| Hosting | **Vercel** (app) | Check commercial-use terms before charging customers |
| Errors | **Sentry** (free tier) | Optional |
| CI | **GitHub Actions** | Lint, type-check, tests |

> Free-tier limits and terms change. Before charging real customers, re-read each provider's pricing and terms. Some free plans restrict commercial use.

---

## 2. Suggested folder structure

```
feedesk/
├─ docs/                      # this planning pack
├─ prisma/ (or drizzle/)      # schema and migrations
├─ src/
│  ├─ app/
│  │  ├─ (marketing)/         # landing page
│  │  ├─ (auth)/              # login, signup, invite
│  │  ├─ (dashboard)/         # admin and staff app
│  │  │  ├─ dashboard/
│  │  │  ├─ students/
│  │  │  ├─ batches/
│  │  │  ├─ invoices/
│  │  │  ├─ attendance/
│  │  │  └─ settings/
│  │  ├─ pay/[token]/         # public parent payment page
│  │  └─ api/
│  │     ├─ webhooks/razorpay/
│  │     └─ cron/
│  ├─ components/
│  ├─ lib/
│  │  ├─ auth/                # session, role checks
│  │  ├─ db/                  # tenant-scoped query helpers
│  │  ├─ payments/
│  │  ├─ notifications/
│  │  └─ billing/             # invoice generation logic
│  └─ tests/
├─ .env.example               # variable names only, no secrets
└─ README.md
```

---

## 3. Key flows

### 3.1 Payment flow (online)

1. Parent opens `/pay/<token>`.
2. Server looks up the invoice by token and shows the balance.
3. Parent taps **Pay**. Server creates a gateway order for the exact balance.
4. Gateway checkout opens; parent pays.
5. Gateway sends a **webhook** to `/api/webhooks/razorpay`.
6. Server **verifies the signature**, checks `webhook_event.event_id` for duplicates, records the payment in a **database transaction**, and updates `invoice.paid_amount` and `status`.
7. Server sends the receipt email.
8. The browser redirect only shows a "processing/success" screen; it never marks anything as paid.

### 3.2 Monthly invoice generation (cron)

1. Runs daily. For each active center, checks if today is its billing day (in IST).
2. For each active enrollment without an invoice for this month, creates an invoice and items.
3. The unique constraint `(center_id, student_id, period_month)` makes the job safe to re-run.
4. Creates reminder rows according to the schedule in `02`.

### 3.3 Reminder sending (cron)

1. Runs every 15 to 60 minutes.
2. Selects `reminder` rows where `status = scheduled` and `scheduled_for <= now`, respecting quiet hours.
3. Skips if the invoice is paid, waived, or cancelled.
4. Sends the email, marks `sent` or `failed`, and logs the error.

### 3.4 WhatsApp (v1: manual)

- A button builds a `https://wa.me/<phone>?text=<encoded message>` link.
- The owner taps it, WhatsApp opens with the message ready, and the owner presses Send.
- No API cost or template approval, but not automatic.

### 3.5 Staff invitation

1. Admin enters name and email.
2. Server creates an `invited` user and emails a signed, expiring link.
3. Staff sets a password through the auth provider; status becomes `active`.

---

## 4. API list

> Use Next.js route handlers or server actions. Every endpoint below (except public ones) requires a session; `center_id` always comes from the session, never from the request body.

### Auth and center
| Method | Path | Role | Purpose |
|---|---|---|---|
| POST | `/api/auth/signup` | public | Create center and admin |
| GET | `/api/me` | any | Current user and center |
| PATCH | `/api/center` | admin | Update center settings |
| POST | `/api/staff/invite` | admin | Invite staff |
| DELETE | `/api/staff/:id` | admin | Remove staff |

### Batches
| Method | Path | Role | Purpose |
|---|---|---|---|
| GET | `/api/batches` | admin, staff (own) | List |
| POST | `/api/batches` | admin | Create |
| PATCH | `/api/batches/:id` | admin | Update |
| POST | `/api/batches/:id/archive` | admin | Archive |

### Students
| Method | Path | Role | Purpose |
|---|---|---|---|
| GET | `/api/students?batch=&status=&q=` | admin, staff (own batches) | List/search |
| POST | `/api/students` | admin | Create |
| PATCH | `/api/students/:id` | admin | Update |
| POST | `/api/students/:id/archive` | admin | Archive |
| POST | `/api/students/import` | admin | CSV import (v1.5) |
| POST | `/api/students/:id/enrollments` | admin | Add to batch |

### Invoices and payments
| Method | Path | Role | Purpose |
|---|---|---|---|
| GET | `/api/invoices?status=&month=` | admin | List |
| GET | `/api/invoices/:id` | admin | Detail |
| POST | `/api/invoices/generate` | admin | Manual generation for a month |
| PATCH | `/api/invoices/:id` | admin | Edit unpaid invoice |
| POST | `/api/invoices/:id/cancel` | admin | Cancel with reason |
| POST | `/api/invoices/:id/payments` | admin | Record manual payment |
| GET | `/api/invoices/:id/receipt` | admin | Receipt PDF/HTML |
| POST | `/api/invoices/:id/remind` | admin | Send reminder now |
| GET | `/api/invoices/:id/whatsapp-link` | admin | Pre-filled `wa.me` link |

### Public (parent)
| Method | Path | Auth | Purpose |
|---|---|---|---|
| GET | `/api/pay/:token` | token | Invoice summary |
| POST | `/api/pay/:token/order` | token | Create gateway order |
| GET | `/api/pay/:token/receipt` | token | Receipt after payment |

### Webhooks and jobs
| Method | Path | Auth | Purpose |
|---|---|---|---|
| POST | `/api/webhooks/razorpay` | signature | Payment events |
| GET | `/api/cron/generate-invoices` | cron secret | Monthly invoicing |
| GET | `/api/cron/send-reminders` | cron secret | Reminder dispatch |

### Attendance
| Method | Path | Role | Purpose |
|---|---|---|---|
| GET | `/api/batches/:id/attendance?date=` | admin, staff (own) | Get a day's sheet |
| PUT | `/api/batches/:id/attendance` | admin, staff (own) | Save a day's sheet |
| GET | `/api/students/:id/attendance` | admin | History |

### Dashboard and reports
| Method | Path | Role | Purpose |
|---|---|---|---|
| GET | `/api/dashboard` | admin | Totals, pending, overdue |
| GET | `/api/reports/fees.csv?month=` | admin | Export |

---

## 5. Security checklist

- [ ] Server-side authorization on **every** endpoint (role and center)
- [ ] Zod validation on all inputs
- [ ] Row Level Security enabled and tested
- [ ] Webhook signature verified; duplicate events ignored
- [ ] Payment link tokens are long, random, and unguessable
- [ ] Rate limiting on login, payment-link, and reminder endpoints
- [ ] Secrets only in environment variables; `.env` is in `.gitignore`
- [ ] Cron endpoints protected by a secret
- [ ] HTTPS only; secure, HTTP-only cookies
- [ ] No gateway secrets or other tenants' data ever sent to the browser
- [ ] Audit log for sensitive actions
- [ ] Dependencies pinned; run `npm audit` periodically
- [ ] Regular database backups

---

## 6. Environment variables (names only)

```
DATABASE_URL=
AUTH_SECRET=
NEXT_PUBLIC_APP_URL=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=
RESEND_API_KEY=
EMAIL_FROM=
CRON_SECRET=
```

> Never commit real values. Provide an `.env.example` with these names empty.

---

## 7. Payment model options (OPEN DECISION)

| Option | How it works | Pros | Cons |
|---|---|---|---|
| **A. Each center uses its own Razorpay account** | Center adds its own keys; money goes straight to them | Simple, no money handling by you, fewer compliance concerns | Each owner must complete gateway KYC; onboarding friction |
| **B. FeeDesk collects and pays out** | One platform account, split to centers | Smoother onboarding | Needs a marketplace/route product, extra approval, and financial/legal responsibility |

**Recommendation for v1:** Option A, or even start with manual payment entry plus UPI links while you validate the idea.
