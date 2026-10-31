# 06. Plan, Validation, and Launch

---

## 1. PC and account setup checklist

### Install
- [ ] **Node.js (LTS)**. Check: `node -v`, `npm -v`
- [ ] **Git**. Check: `git --version`
- [ ] **Antigravity** (sign in with Google). Verify requirements on its official site.
- [ ] **VS Code** (optional second editor)
- [ ] **Chrome** (for testing and dev tools)
- [ ] **Postman** or **Thunder Client** (API testing)
- [ ] Database viewer: Supabase/Neon dashboard, or DBeaver

### Git setup
```
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

### Accounts (free)
- [ ] GitHub
- [ ] Supabase or Neon (database)
- [ ] Razorpay (test mode first)
- [ ] Resend (email)
- [ ] Vercel (hosting; check commercial-use terms before charging customers)
- [ ] Sentry (optional)

### Project hygiene
- [ ] Create repo, `git init`, connect to GitHub
- [ ] Add `.env` to `.gitignore` **before** the first commit
- [ ] Create `.env.example` with variable names only
- [ ] Copy this `docs/` folder into the repo

> Android Studio is **not needed** for a web app.

---

## 2. Customer validation (do this before heavy building)

### Who to talk to
10 coaching centers or private tutors near you. Aim for a mix of sizes (20 to 150 students).

### Rules
- Don't pitch. Listen. Ask about past behavior, not hypothetical opinions.
- Take notes with exact phrases.
- Ask to see how they track fees today (notebook, Excel, app).

### Interview script
**Warm-up**
1. How many students and batches do you have? How many teachers?
2. How do you take admissions and fees today?

**Pain**
3. Walk me through what happens when a parent doesn't pay on time.
4. How much time per week do you spend on fee reminders and records?
5. About how much money was pending or late last month? How often is it hard to recover?
6. What is the most annoying part of fee collection and attendance?

**Current solutions**
7. Do you use any software or app now? (Name it.) What do you like and dislike?
8. Have you tried something and stopped? Why?

**Payments**
9. How do parents usually pay: cash, UPI, bank transfer, cheque?
10. Would parents pay online if you sent a link? Any resistance?

**Willingness to pay**
11. If a tool cut your fee chasing time in half, what would you pay per month?
12. Who decides about buying tools: you or someone else?

**Close**
13. Can I show you a simple version in a few weeks? Would you try it free for a month?
14. Do you know another center owner I should talk to?

### Scoring the results
| Signal | Meaning |
|---|---|
| 6+ of 10 describe fee chasing as a real pain, unprompted | Proceed |
| They mention a different bigger pain (e.g., admissions, test results) | Reconsider the product focus |
| Most shrug or say WhatsApp is fine | Pick another niche or problem |
| 3+ say they'd try it, 1+ would pay | Strong signal |

**Interview log (copy for each owner)**
```
Name / center:
Students / batches:
Current method:
Time spent per week:
Late/pending amount:
Biggest pain (their words):
Tools tried:
Would pay (₹/month):
Willing to pilot? Y/N
Notes:
```

---

## 3. Build plan (about 6 weeks part-time; adjust to your pace)

| Phase | Weeks | Deliverables | Done when |
|---|---|---|---|
| 0. Setup | 0 | Repo, accounts, docs, design tokens | App boots locally |
| 1. Foundation | 1 | Auth, centers, roles, database schema, tenant-safe query helper, RLS | Two test centers can't see each other's data |
| 2. Core data | 2 | Batches, students, enrollments, CSV import (optional) | Owner can add 20 students quickly |
| 3. Invoices | 3 | Invoice generation, manual payments, receipts, dashboard | Owner sees correct pending/collected totals |
| 4. Online payments | 4 | Razorpay test mode, payment page, webhook, idempotency | Test payment marks invoice paid exactly once |
| 5. Reminders and attendance | 5 | Email reminders, `wa.me` button, attendance sheet | Reminders skip paid invoices |
| 6. Polish and deploy | 6 | Responsive UI, error states, tests, deployment, landing page | Live URL works on a real phone |
| 7. Pilot | 7+ | 2 to 3 centers using it | Weekly feedback calls |

### Definition of done (every feature)
- Works on a phone-width screen
- Role and tenant checks enforced server-side
- Inputs validated
- Loading, empty, and error states handled
- At least one test for the happy path and one for a failure
- No secrets in code

---

## 4. Pricing (hypothesis to test)

| Plan | Price | Limits |
|---|---|---|
| Pilot | Free for 1 to 2 months | Up to 3 centers, direct support |
| Starter | ₹299 to ₹499 / month | Up to 50 students |
| Standard | ₹699 to ₹999 / month | Up to 200 students, staff accounts, reports |

Notes:
- Ask owners what they'd pay before fixing prices.
- Gateway fees are charged by the payment provider, separate from your subscription.
- Annual plans with a discount improve cash flow later.
- Don't build billing for FeeDesk itself until a few centers want to pay; collect the first payments manually.

---

## 5. Go-to-market (small and local)

1. Visit the 10 interview centers again with a working demo.
2. Offer setup help: import their student list yourself during the pilot.
3. Ask satisfied owners for referrals to other centers.
4. Share a 1-page flyer or WhatsApp message with a demo link.
5. Track: signups, active centers, invoices paid through the app, churn, owner feedback.

---

## 6. Legal and compliance checklist

> This is a planning checklist, **not legal advice**. Rules change; confirm current requirements with a qualified professional (CA/lawyer) before charging real customers.

### Before real customers
- [ ] **Privacy policy and terms of service** on the site
- [ ] **Student data involves minors.** India's data protection law (DPDP Act) has special rules for children's data, including parental consent. Get advice on how consent should be collected (likely from the center on behalf of parents) and document it.
- [ ] Collect only necessary data; set a data-retention and deletion policy
- [ ] Define who is responsible for the data (center vs FeeDesk) in your terms
- [ ] **Payment gateway KYC:** each gateway has onboarding requirements (business or personal PAN, bank account, website details)
- [ ] **Business structure and GST:** ask a CA whether you need to register and how to invoice your subscriptions
- [ ] **Service agreement** for centers (what you provide, support, uptime expectations, data ownership)
- [ ] **Email compliance:** unsubscribe option and accurate sender details
- [ ] **WhatsApp/SMS:** follow provider rules; get consent; use approved templates for any API sending
- [ ] **Refund and cancellation policy** for your own subscription

### Security basics
- [ ] HTTPS everywhere
- [ ] Backups tested
- [ ] A way to export or delete a center's data on request
- [ ] A plan for a data breach (who to notify, how)

---

## 7. Risks and checkpoints

| Checkpoint | Question | If "no" |
|---|---|---|
| After interviews | Is the pain real? | Change niche or problem |
| After phase 3 | Does the owner understand it without help? | Simplify UI |
| After pilot month 1 | Are they using it weekly? | Find out why not before adding features |
| After pilot month 2 | Will anyone pay? | Adjust price, features, or target |
