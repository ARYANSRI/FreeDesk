# 05. Design System and Wireframes

Goal: a product that looks **deliberate and trustworthy**, not like a default AI template. Owners and parents care about clarity, speed, and trust more than flashy visuals.

---

## 1. Brand sheet (fill in the TODOs yourself)

| Item | Decision |
|---|---|
| Product name | FeeDesk (TODO: confirm) |
| One-line promise | "Collect fees on time. Stop chasing parents." |
| Personality | Calm, reliable, practical, friendly |
| Tone of voice | Plain, short sentences. No buzzwords. Speak like a helpful office assistant. |
| Language | English first; Hindi labels in v1.5 (TODO) |

### Colors (starting point, change them)
Pick **one** main color plus neutrals. Avoid the default purple-blue gradient.

| Role | Suggested | Hex (TODO: adjust) |
|---|---|---|
| Primary | Deep teal or green (trust, money) | `#0F766E` |
| Primary hover | Darker shade | `#115E59` |
| Accent (sparingly) | Warm amber for "pending" | `#D97706` |
| Success | Green | `#15803D` |
| Danger / overdue | Red | `#B91C1C` |
| Background | Warm off-white | `#FAF8F5` |
| Surface (cards) | White | `#FFFFFF` |
| Text | Near-black | `#1C1917` |
| Muted text | Gray | `#57534E` |
| Border | Light gray | `#E7E5E4` |

**Rules:** status colors must always be paired with text or an icon (not color alone). Check contrast for readability on cheap phone screens.

### Typography
| Use | Font (free, Google Fonts) | Notes |
|---|---|---|
| Headings | A distinctive but readable face, e.g. **Plus Jakarta Sans** or **DM Sans** | TODO: choose and stick to it |
| Body | **Inter** or **Noto Sans** (good Hindi/Devanagari support: **Noto Sans Devanagari**) | |
| Numbers/money | Use tabular numbers for amounts | Aligns columns |

Scale: 14px base on mobile, 16px on desktop. Headings 20 / 24 / 32.

### Shape and spacing
- Corner radius: 8px (cards, inputs, buttons). Be consistent.
- Spacing scale: 4, 8, 12, 16, 24, 32, 48.
- Shadows: subtle or none; prefer 1px borders.
- Tap targets: at least 44 × 44 px.
- Icons: one set only (e.g., Lucide), one stroke weight.

### Components to customize in shadcn/ui
Set the theme tokens (colors, radius, fonts) in the Tailwind/shadcn config before building screens. Do not leave defaults.

---

## 2. How to avoid the generic "AI look"

**Avoid**
- Purple/blue gradients, glowing blobs, glassmorphism everywhere
- Centered hero with a vague headline and three identical feature cards
- Emoji as icons
- Buzzwords: "revolutionize," "seamless," "supercharge," "unlock"
- Stock illustrations of people at laptops
- Same spacing and card style on every screen

**Do**
- Use real owner language from interviews ("fees pending," "batch," "collected this month")
- Show **real screenshots** of the product on the landing page
- Use Indian context: ₹, UPI, IST dates (`12 Oct 2026`), batch names owners actually use
- Make the **dashboard the hero**: a clear number for "Collected" and "Pending"
- Write specific empty states ("No students yet. Add your first student to start tracking fees.")
- Keep layouts restrained; whitespace and alignment signal quality
- Test on a real, cheap phone over slow data

**Prompting rule:** always give the AI agent this document and say *"Follow the design system exactly. Do not add gradients, emojis, or decorative elements that aren't specified."*

---

## 3. Screen inventory

| # | Screen | Who |
|---|---|---|
| 1 | Landing page | Public |
| 2 | Sign up / Log in | Public |
| 3 | Onboarding (center, first batch, add students) | Admin |
| 4 | Dashboard | Admin |
| 5 | Students list and student detail | Admin |
| 6 | Batches list and batch detail | Admin |
| 7 | Invoices list and invoice detail | Admin |
| 8 | Record payment (modal) | Admin |
| 9 | Attendance sheet | Admin, Staff |
| 10 | Settings (center, billing day, payments, staff) | Admin |
| 11 | Parent payment page | Parent |
| 12 | Receipt | Parent, Admin |

---

## 4. Wireframes (text sketches)

### 4.1 Admin dashboard (desktop)
```
┌──────────────────────────────────────────────────────────────┐
│ FeeDesk        Dashboard  Students  Batches  Invoices  ⚙     │
├──────────────────────────────────────────────────────────────┤
│  October 2026                                     [Send all] │
│                                                              │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐             │
│  │ Collected   │ │ Pending     │ │ Overdue     │             │
│  │ ₹ 84,500    │ │ ₹ 31,000    │ │ ₹ 12,500    │             │
│  │ 42 students │ │ 18 students │ │ 6 students  │             │
│  └─────────────┘ └─────────────┘ └─────────────┘             │
│                                                              │
│  Overdue and due soon                                        │
│  ───────────────────────────────────────────────────────     │
│  Aarav Sharma   Class 10 Maths   ₹2,000   5 days late [Remind]│
│  Riya Verma     Class 9 Science  ₹1,800   Due in 2d   [Remind]│
│  ...                                                         │
└──────────────────────────────────────────────────────────────┘
```

### 4.2 Dashboard (mobile)
```
┌────────────────────┐
│ ☰  FeeDesk         │
├────────────────────┤
│ October 2026       │
│ Collected ₹84,500  │
│ Pending   ₹31,000  │
│ Overdue   ₹12,500  │
│ ─────────────────  │
│ Aarav Sharma       │
│ ₹2,000 · 5d late   │
│ [WhatsApp] [Record]│
│ ─────────────────  │
│ Riya Verma  ...    │
└────────────────────┘
```

### 4.3 Student detail
```
Aarav Sharma                           [Edit] [Archive]
Parent: Mr. Sharma · 98xxxxxx10 · email
Batches: Class 10 Maths (Morning)

Fees
 Oct 2026   ₹2,000   Overdue    [Remind] [Record payment]
 Sep 2026   ₹2,000   Paid 4 Sep [Receipt]

Attendance (last 30 days): 22 present · 2 absent
```

### 4.4 Record payment (modal)
```
Record payment · Aarav Sharma · Oct 2026
Amount due: ₹2,000
Amount paid: [ 2000 ]
Method: ( ) Cash  ( ) UPI  ( ) Bank  ( ) Other
Date: [ 12 Oct 2026 ]   Note: [ optional ]
                         [Cancel]  [Save payment]
```

### 4.5 Attendance sheet
```
Class 10 Maths · Morning · Today
[ Mark all present ]
Aarav Sharma       (• Present)  ( ) Absent  ( ) Late
Riya Verma         ( ) Present  (• Absent)  ( ) Late
...
                                         [Save attendance]
```

### 4.6 Parent payment page (mobile, no login)
```
┌────────────────────┐
│ [Logo] Sunrise     │
│ Coaching Center    │
│                    │
│ Fee for October    │
│ Student: Aarav     │
│ Class 10 Maths     │
│                    │
│ Amount due         │
│ ₹ 2,000            │
│ Due 8 Oct 2026     │
│                    │
│ [   Pay ₹2,000   ] │
│ UPI · Cards · Net  │
│ banking            │
│ Secured by Razorpay│
└────────────────────┘
```

---

## 5. UX states to design (often forgotten)

- Loading (skeletons, not spinners everywhere)
- Empty states with a clear next action
- Error states with plain-language fixes
- Success confirmations (payment recorded, reminder sent)
- Permission denied (staff opens an admin page)
- Offline or slow network message
- Confirmation before destructive actions (cancel invoice, archive student)

---

## 6. Accessibility and performance targets

- Text contrast meets WCAG AA
- Works at 360px wide and on low-end Android phones
- Keyboard-navigable forms with clear labels and error messages
- Page loads quickly on 4G; avoid heavy libraries and large images
- No animation library needed for v1 (use simple CSS transitions)
