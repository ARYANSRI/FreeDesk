# FeeDesk: Project Planning Pack

> **FeeDesk** is a working name. Change it anywhere you like.
> A multi-tenant web app that helps coaching centers and tutors collect fees, track attendance, and stop chasing parents on WhatsApp.

## Files in this pack

| File | What it contains |
|---|---|
| `01-PRD.md` | Problem statement, users, features (priorities), user flows, roles and permissions |
| `02-business-rules.md` | Fee, payment, reminder, and attendance rules (where most bugs come from) |
| `03-database-design.md` | Tables, relationships, ER diagram, multi-tenant isolation |
| `04-architecture-and-api.md` | Tech stack, folder structure, payments and notification flows, API list, security |
| `05-design-system.md` | Brand and style sheet, wireframes, and how to avoid a generic "AI look" |
| `06-plan-and-launch.md` | Setup checklist, weekly plan, customer interview script, pricing, legal checklist |
| `07-antigravity-prompts.md` | Ready-to-paste prompts and a project rules file for the AI agent |

## How to use this pack

1. **Do the customer interviews first** (script in `06`). Update `01-PRD.md` with what you learn.
2. Fill in every `TODO` and `OPEN DECISION` marker. Search the files for those words.
3. Put these files in your project's `/docs` folder so the AI agent can read them.
4. Build in the phases from `06`, using the prompts in `07`, one phase at a time.

## Open decisions (resolve these early)

1. **Product name and domain.**
2. **Payment model.** Does each center connect its own Razorpay account (simpler, recommended for v1), or does FeeDesk collect money on behalf of centers (needs Razorpay Route or similar, with extra approval)? See `04`.
3. **WhatsApp.** v1 uses email plus a "send on WhatsApp" button that opens a pre-filled message. Official WhatsApp API comes later. See `04`.
4. **Auth provider.** Supabase Auth, Clerk, or Auth.js. See `04`.
5. **Languages.** English only, or English plus Hindi labels in v1?

## Assumptions (all unproven until you interview owners)

- Coaching centers lose real time and money chasing fees.
- Owners will pay roughly ₹300 to ₹800 per month for a tool that fixes this.
- Parents will pay through a link on their phone.

> These are hypotheses, not facts. Validate them before building a lot.
