# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server on localhost:3000
npm run build    # production build (run before deploying to catch type/lint errors)
npm run lint     # eslint check
```

There are no tests in this project.

## Architecture Overview

**ProcureWide** is a procurement order management SaaS. Companies submit procurement orders through the app; an admin team fulfills them. Built with Next.js 16 App Router, React 19, TypeScript, Supabase (auth + DB), Tailwind CSS v4, shadcn/ui, and Framer Motion.

### Two User Roles

- **`app_admin`** — sees all companies, manages orders for any company, sees who submitted each order
- **Regular user** — scoped to their `company_id`, sees only their company's data

Role is stored in the `profiles` table (`id, company_id, role, username`). Every protected page calls `requireProfile("/auth")` from `lib/auth.ts` at the top of the Server Component to gate access and get the current user+profile.

### Route Layout

```
/                          public landing page
/auth                      login + sign-up
/dashboard                 admin: company list | user: overview summary
/orders                    user: full order list (grouped by billing period)
/orders/new                user: create a new order
/orders/[orderId]          admin + user: view/edit a single order
/dashboard/companies/[id]          admin: orders for a specific company
/dashboard/companies/[id]/new      admin: create order for a specific company
/profile                   basic profile page
```

### Global Shell (app/layout.tsx)

The root layout is `async` and fetches auth state directly. It renders:
1. `<Navbar>` — slim `h-12` for logged-in users (logo + username + logout only), full navbar for logged-out
2. `<Sidebar>` — only rendered when logged in; dynamically adapts based on role (see below)
3. Content wrapper — `ml-60 pt-12` applied only when logged in so public pages are unaffected

### Navbar Split Pattern

`Navbar.tsx` is a Server Component that fetches the user's `username` from Supabase and passes it to `NavbarClient.tsx` (Client Component). This prevents auth flicker without client-side loading states.

### Sidebar Behaviour

`Sidebar.tsx` is a Client Component that receives `isAdmin: boolean` and `companies: CompanyRow[]` as props (fetched server-side in the root layout).

- **Admin with no company selected** (`/dashboard`): shows a Dashboard link + searchable company list with pending-order badges
- **Admin with a company selected** (URL matches `/dashboard/companies/[id]`): slides to a company-scoped view with Back button, Add New Order, and company nav items — transition direction is tracked via a `useRef` so the slide animates correctly forward/back
- **Regular user**: Add New Order button + Dashboard / Orders / Analytics / Notifications / Settings links

### Tailwind CSS v4

No `tailwind.config.js` — all theme tokens are defined as CSS variables in `app/globals.css` inside an `@theme {}` block and `@layer base`. Use `hsl(var(--token))` for raw CSS, `bg-card`, `text-accent`, etc. for Tailwind classes. Sidebar CSS variables are pre-defined (`--sidebar-background`, etc.).

### Supabase Client Usage

Two separate clients — never mix them:
- **Server** (`lib/supabase/server.ts`): use in Server Components, Route Handlers, Server Actions. Created with `await createClient()`.
- **Browser** (`lib/supabase/client.ts`): use in Client Components only (e.g., logout handler in `NavbarClient.tsx`).

There is no root `middleware.ts` file; session refresh is handled inside each Server Component via `auth.getUser()`.

### Auth Guards

```ts
// Redirects to /auth if not logged in; returns { user, profile }
const { user, profile } = await requireProfile("/auth");

// Additionally checks role === "app_admin"; redirects to /dashboard otherwise
const { user, profile } = await requireAdmin();
```

### Data Fetching

All DB queries are plain async server functions in `lib/`:
- `lib/orders.ts` — `fetchCompanyOrders`, `fetchOrderById`
- `lib/companies.ts` — `fetchAllCompanies`, `fetchCompanyData` (reads from `companies_with_pending_orders` Supabase view)
- `lib/auth.ts` — `requireProfile`, `requireAdmin`, `fetchUsernameById`

The `CompanyOrder` type from `lib/orders.ts` is the canonical order shape used across components. `OrderRow` in `types/index.ts` is the same shape without optional computed fields — they're compatible.

### Billing Period Grouping

Orders are grouped into billing periods: the 21st of one month through the 20th of the next. Logic lives in `lib/helpers.ts` (`getBillingPeriod`, `parseDateTime`). This grouping is used in `CompanyOrders.tsx` and drives the XLSX export filename.

### Key Components

| Component | Purpose |
|---|---|
| `UserDashboard` | User's `/dashboard` — stat cards (total/completed/pending/spend) + recent completed + pending order lists |
| `CompanyOrders` | Full order list grouped by billing period with search + XLSX export per period |
| `CompanyDashboard` | Admin's `/dashboard` — searchable company list with pending order counts |
| `NewCompanyOrder` | Order creation form; sends Slack notification on submit via a Server Action |
| `ViewOrder` | Read/edit view for a single order and its line items |

### Slack Notifications

New orders trigger a Slack notification via `formatSlackNewOrder` in `lib/helpers.ts`. The notification URL uses the absolute origin: `${origin}/orders/${orderId}`.

### XLSX Export

Client-side only, triggered by a Server Action (`exportOrderItemsForOrdersAction` in `lib/orders/actions.ts`) that returns raw `OrderItemRow[]`. The client assembles and downloads the `.xlsx` using the `xlsx` package.

### Button Variants

Beyond shadcn defaults, two custom variants are defined in `components/ui/button.tsx`:
- `accent` — green background with glow shadow on hover (primary CTA)
- `hero` / `hero-outline` — used on the public landing page only
