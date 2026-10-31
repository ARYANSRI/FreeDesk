# 01. Product Requirements Document (PRD)

**Product:** FeeDesk (working name)
**Version:** 0.1 (draft)
**Status:** Hypothesis, pending customer interviews

---

## 1. Problem statement

**Who:** Owners of small coaching centers and private tutors in India (10 to 200 students).

**Problem:** Fee collection is manual. Owners track dues in notebooks or Excel, remind parents one by one on WhatsApp, and reconcile payments by checking bank or UPI apps. Late payments, forgotten dues, and awkward conversations cost them time and money. Attendance is also tracked on paper, so parents rarely get clear updates.

**Solution:** One web app where the owner adds batches and students, sets fee plans, and sends parents a payment link with automatic reminders. A dashboard shows who has paid, who is late, and this month's total. Attendance is marked in a few taps.

**Why it matters:** Collecting fees on time is directly tied to the owner's income, so the value is easy to measure (hours saved, dues recovered).

> TODO: after interviews, replace this section with the owners' own words and numbers.

---

## 2. Goals and non-goals

### Goals (version 1)
- An owner can sign up and be collecting fees within 30 minutes.
- Parents can pay from a phone without installing anything or creating an account.
- The owner always knows who owes what.
- Strict data separation between centers (multi-tenant).

### Non-goals (version 1)
- Native Android or iOS apps (we build a mobile-friendly web app).
- Online classes, video, or a learning management system.
- Payroll for teachers.
- Official WhatsApp Business API automation (later).
- Marketplace features or student discovery.

---

## 3. Target users and personas

### Persona A: Center owner ("Admin")
- Runs a coaching center with 1 to 5 teachers.
- Not very technical, uses WhatsApp and Excel daily.
- Wants: fewer reminders to send, clear dues, proof of payments.
- Frustrations: chasing parents, mismatched records, no time for admin.

### Persona B: Teacher ("Staff")
- Takes classes for one or more batches.
- Wants: quick attendance marking, list of their students.
- Should NOT see revenue or other teachers' batches unless permitted.

### Persona C: Parent or student ("Payer")
- Receives a link by SMS, email, or WhatsApp.
- Wants: see amount due, pay via UPI or card, get a receipt.
- Does not want to download an app or remember a password.

---

## 4. Feature list (prioritized)

### Must have (Version 1)
| # | Feature | Notes |
|---|---|---|
| M1 | Owner signup and login | Creates a new center (tenant) |
| M2 | Center profile | Name, logo, contact, UPI/payment settings |
| M3 | Batches | Name, subject, schedule, fee amount, teacher |
| M4 | Students | Name, parent contact, batch(es), status |
| M5 | Fee plans and invoices | Monthly fee per student; auto-generate dues each cycle |
| M6 | Payment links | Parent pays online; status updates automatically |
| M7 | Manual payment entry | Cash or direct UPI recorded by owner |
| M8 | Reminders | Email auto-reminders; "Send on WhatsApp" button |
| M9 | Dashboard | Collected this month, pending, overdue list |
| M10 | Attendance | Mark per batch per day; simple history |
| M11 | Receipts | Downloadable or emailable receipt after payment |
| M12 | Roles | Admin and Staff (limited access) |

### Should have (Version 1.5)
- Import students from CSV or Excel
- Late fee rules
- Sibling or scholarship discounts
- Parent portal view (read-only, magic link)
- Monthly report export (CSV/PDF)
- Hindi labels

### Later
- Official WhatsApp Business API reminders
- SMS reminders (needs provider and template approval)
- Teacher attendance and salary tracking
- Homework and test scores
- Multiple branches per center
- Subscription billing for FeeDesk itself
- PWA install and push notifications
- Mobile apps

---

## 5. User flows

### Flow 1: Owner onboarding
1. Owner opens the site and signs up with email.
2. Enters center name and phone.
3. Creates the first batch (name, monthly fee, schedule).
4. Adds students (one by one or CSV later).
5. Sees the dashboard with first dues generated.

### Flow 2: Collecting a fee
1. System generates this month's invoices on the billing day.
2. Owner opens the dashboard, sees "Pending: 18 students".
3. Taps "Send reminders" (email) or "Send on WhatsApp" for a student.
4. Parent opens the link, sees the amount and pays by UPI/card.
5. The payment gateway notifies the server (webhook).
6. Invoice becomes **Paid**; parent gets a receipt; dashboard updates.

### Flow 3: Offline payment
1. Parent pays cash at the center.
2. Owner opens the student's invoice and taps "Record payment".
3. Chooses method (cash/UPI/bank), amount, date, note.
4. Invoice updates; receipt is generated.

### Flow 4: Marking attendance
1. Teacher logs in and opens today's batch.
2. Sees the student list, all defaulting to Present.
3. Taps students who are absent; saves.
4. Admin can view attendance history per student.

### Flow 5: Parent pays via link (no account)
1. Parent gets a link like `/pay/<secure-token>`.
2. Page shows center name, student, month, amount, and a Pay button.
3. After payment, the page shows a success state and a receipt link.

---

## 6. Roles and permissions

| Capability | Admin (owner) | Staff (teacher) | Parent (via link) |
|---|---|---|---|
| Manage center settings | ✅ | ❌ | ❌ |
| Create/edit batches | ✅ | ❌ | ❌ |
| View all students | ✅ | Only own batches | ❌ |
| Add/edit students | ✅ | ❌ (optional later) | ❌ |
| View fee amounts and dues | ✅ | ❌ | Own child only |
| Record manual payments | ✅ | ❌ | ❌ |
| Send reminders | ✅ | ❌ | ❌ |
| Mark attendance | ✅ | Own batches | ❌ |
| View dashboard revenue | ✅ | ❌ | ❌ |
| Pay an invoice | ❌ | ❌ | ✅ |
| Invite/remove staff | ✅ | ❌ | ❌ |
| Export data | ✅ | ❌ | ❌ |

**Rule:** every request is checked against both the user's role and their center. A user from Center A must never read or write Center B's data, even by guessing IDs.

---

## 7. Success metrics (for the pilot)

- 3 centers actively using it for 2 consecutive months
- At least 70% of invoices paid or recorded through the app
- Owner reports saving 3+ hours per week (self-reported)
- At least 1 center agrees to pay after the free pilot

---

## 8. Risks and open questions

| Risk | Mitigation |
|---|---|
| Owners don't feel the pain | Interview before building (see `06`) |
| Parents resist online payment | Keep manual entry and cash recording first-class |
| Existing tools are "good enough" | Stay niche, simple, and local (UPI, WhatsApp, Hindi) |
| Student data is about minors | Collect minimum data; get legal advice on consent (see `06`) |
| Payment compliance complexity | Start with each center's own gateway account |

**TODO:** list questions to ask owners that could change this PRD.
