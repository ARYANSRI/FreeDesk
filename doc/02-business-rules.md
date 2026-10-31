# 02. Business Rules

These rules decide how the app behaves. Write them down first; ask owners to confirm; then code them. Items marked **TODO** or **OPEN** need your decision after interviews.

---

## 1. General conventions

- **Currency:** INR. Store all money as **integers in paise** (₹500 = 50000). Never use floating-point numbers for money.
- **Time zone:** store timestamps in UTC; display and compute billing dates in **Asia/Kolkata (IST)**.
- **Dates:** a "month" means a calendar month unless a center chooses an anniversary cycle (OPEN, v1.5).
- **Soft delete:** students, batches, and payments are archived, not erased, so history stays accurate.

---

## 2. Tenancy rules

1. Every business table has a `center_id`.
2. Every query is filtered by the logged-in user's `center_id`.
3. IDs in URLs are never trusted on their own; the server always checks the record belongs to the user's center.
4. Parent payment links use long random tokens, not sequential IDs.
5. Staff and admins belong to exactly one center in v1.

---

## 3. Fee plans and invoices

| Rule | Decision |
|---|---|
| Billing cycle | Monthly (v1). Quarterly/yearly later. |
| Fee source | Each batch has a default monthly fee; a student can have an override. |
| Invoice generation | Auto-created on the center's **billing day** (default: 1st of each month). |
| Due date | Billing day + grace days (default: 7 days). Configurable per center. |
| Mid-month joins | **OPEN:** full month, prorated by days, or starts next month. Default: full month. |
| Multiple batches | A student in 2 batches gets one invoice with 2 line items. |
| Invoice number | Per-center running number, e.g., `ABC-2026-0001`. |
| Invoice states | `draft` → `pending` → `partial` → `paid`, or `overdue`, `cancelled`, `waived` |
| Editing amounts | Allowed only on unpaid invoices; edits are logged. |
| Cancelling | Admin only, with a reason. |

### Late fees (v1.5)
- Optional per center: flat amount or percent, applied after the due date plus grace.
- Applied once or per week (OPEN).
- Always shown as a separate line item so parents see why.

### Discounts (v1.5)
- Sibling discount, scholarship, or custom discount, set per student.
- Stored as a line item with a negative amount.

---

## 4. Payments

| Rule | Decision |
|---|---|
| Methods | Online (UPI/cards/netbanking via gateway), plus manual (cash, UPI direct, bank transfer). |
| Partial payments | Allowed (OPEN: confirm with owners). Invoice becomes `partial` until fully paid. |
| Overpayment | Rejected online. For manual entry, warn and require confirmation; store excess as credit (OPEN, v1.5). |
| Source of truth | The **gateway webhook**, not the browser redirect. A payment is confirmed only after the webhook is verified. |
| Idempotency | The same webhook may arrive twice; processing must not double-record a payment. |
| Verification | Verify webhook signature on every call. |
| Receipts | Generated after every confirmed payment (online or manual). |
| Refunds | Admin-initiated only, recorded as a negative payment with a reason. Gateway refunds are done in the gateway dashboard in v1. |
| Failed payments | Invoice stays unpaid; parent can retry from the same link. |
| Gateway fees | **OPEN:** who bears them (center by default). Show clearly to the owner. |

### Payment link rules
- One secure token per invoice; the link shows the current balance due.
- Link stays valid while the invoice is unpaid; expires on payment or cancellation.
- No login required for parents.
- Rate-limit link views and payment attempts to prevent abuse.

---

## 5. Reminders

| Rule | Decision |
|---|---|
| Default schedule | 3 days before due, on due date, 3 days after, 7 days after |
| Channels (v1) | Email automatic; WhatsApp via a manual "Send" button (opens `wa.me` with a pre-filled message) |
| Channels (later) | WhatsApp Business API, SMS |
| Stop conditions | No reminder for paid, waived, or cancelled invoices |
| Frequency cap | Max 1 automatic reminder per invoice per day |
| Quiet hours | No sends between 9 PM and 8 AM IST |
| Opt-out | Parent can unsubscribe from emails; owner can mark "do not remind" per student |
| Message tone | Polite and plain. Always include center name, student name, amount, due date, link. |

### Sample reminder text (WhatsApp/email)
> Hello [Parent name], this is a reminder from [Center name]. [Student name]'s fee of ₹[amount] for [month] is due on [date]. You can pay securely here: [link]. Thank you!

**TODO:** write the same message in Hindi once confirmed with owners.

---

## 6. Attendance

| Rule | Decision |
|---|---|
| Unit | One record per student per batch per date |
| Statuses | Present, Absent, Late, Excused |
| Default | Everyone Present; teacher taps exceptions |
| Who can mark | Admin; staff for their own batches only |
| Edit window | Staff can edit within 24 hours; admin anytime |
| Holidays | Admin can mark a batch/date as "no class"; no attendance expected |
| Link to fees | None in v1 (attendance never blocks payment) |
| Parent notification | Later: optional absence alert |

---

## 7. Students and batches

- A student can belong to multiple batches.
- Archiving a student stops new invoices but keeps history.
- Deleting a batch with students or payments is blocked; archive it instead.
- Duplicate check: warn if the same parent phone and student name already exist.
- Parent contact: at least one of phone or email is required to send reminders.

---

## 8. Users and access

- Staff are invited by email by an admin; invitation links expire after 7 days.
- A removed staff member loses access immediately.
- Passwords handled by the auth provider; require email verification.
- Admins can be more than one per center (OPEN).
- All sensitive actions (record payment, edit invoice, cancel, export) are written to an **audit log**.

---

## 9. Edge cases to test

- Two admins record a payment for the same invoice at once
- The webhook arrives before the browser returns
- The same webhook arrives twice
- Parent opens an old payment link after paying
- A student moves batches mid-month
- Month boundaries and daylight/time zone mistakes (IST vs UTC)
- A user from Center A tries to open a Center B invoice URL
- A staff member tries to open the admin dashboard URL directly
- Reminder runs twice due to a scheduler retry
- Fee changed after invoice generation
