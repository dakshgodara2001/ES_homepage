# ES Homepage

[Live Demo](https://es-homepage.vercel.app)

A dark-themed article feed built with Next.js — and a system design case study from a product manager's perspective.

---

## System Design Lesson: The Invisible Cost of Redundant Data Fetching

When I built this project, I ran into a classic architecture problem that most product teams never notice until it shows up as slow page loads, wasted bandwidth, and poor UX — **the SSR-to-client handoff gap**.

### The Problem

The system had two independent data paths doing the exact same work:

```
User requests page
       │
       ▼
┌─────────────────────┐
│  Server (SSR)       │──── Fetches 20 articles from API ──── ✅ Data ready
│  getServerSideProps  │
└─────────────────────┘
       │
       ▼  HTML sent to browser with data
       │
┌─────────────────────┐
│  Client (Browser)   │──── Fetches 20 articles AGAIN ──── ❌ Redundant
│  React Query        │
└─────────────────────┘
```

The server fetched articles, rendered them into HTML, and shipped everything to the browser. Then React Query on the client **threw away the server data** and made the exact same API call. The user saw a loading flash. The API got hit twice. On mobile networks, this meant ~500ms–2s of wasted time.

This isn't a bug a unit test would catch. It's an **architectural misalignment** — two systems designed independently, each correct in isolation, but wasteful together.

### The Fix

The solution is a single line of configuration that bridges the two systems:

```
User requests page
       │
       ▼
┌─────────────────────┐
│  Server (SSR)       │──── Fetches 20 articles from API
└─────────────────────┘
       │
       ▼  Data passed as initialData
       │
┌─────────────────────┐
│  Client (Browser)   │──── Uses SSR data immediately (no re-fetch)
│  React Query        │──── Fetches page 2, 3, 4... on scroll
└─────────────────────┘
```

By passing the server-fetched data into the client cache as `initialData` with a `staleTime` window, both systems work as one pipeline. Zero redundant calls. Instant first paint. Scroll triggers only net-new data.

### Why This Matters for Product Thinking

This pattern appears everywhere in product systems, not just frontends:

| Domain | Same Anti-Pattern |
|---|---|
| **Mobile apps** | Splash screen fetches config, then home screen fetches it again |
| **Microservices** | Service A calls Service B, then Service C calls Service B for the same data |
| **Analytics** | Dashboard loads summary, then each widget re-queries the same underlying table |
| **Onboarding** | User fills a form, backend validates it, then the next step re-validates the same fields |

The root cause is always the same: **two components designed in isolation, each assuming they own the data lifecycle**. As a PM, the most impactful architectural question you can ask is:

> *"Where in this flow does the system fetch, compute, or validate something that was already done upstream?"*

You don't need to write the code. But identifying this class of waste — and knowing the fix is about **passing context forward, not re-deriving it** — is a system design instinct that compounds across every product you build.

### The Broader Architecture

```
┌──────────────────────────────────────────────────┐
│                    Client                         │
│                                                   │
│  ┌─────────┐    ┌──────────────────────────────┐ │
│  │ Header  │    │     Infinite Scroll Engine    │ │
│  │ (sticky │    │                               │ │
│  │  glass) │    │  React Query Cache            │ │
│  └─────────┘    │  ┌───────┬───────┬───────┐   │ │
│                  │  │Page 1 │Page 2 │Page 3 │   │ │
│                  │  │(SSR)  │(lazy) │(lazy) │   │ │
│                  │  └───────┴───────┴───────┘   │ │
│                  │         ▲                     │ │
│                  │  IntersectionObserver         │ │
│                  │  (triggers fetchNextPage)     │ │
│                  └──────────────────────────────┘ │
│                         │                         │
└─────────────────────────┼─────────────────────────┘
                          │
                    ┌─────▼──────┐
                    │  Mock API  │
                    │ /articles  │
                    │ ?page&limit│
                    └────────────┘
```

**Key design decisions:**
- **SSR for first paint** — no blank screen, good for SEO
- **Client-side infinite scroll** — only fetches what the user actually sees
- **Pagination end detection** — stops fetching when API returns fewer items than the limit (no infinite empty requests)
- **Intersection Observer over scroll events** — no jank, no throttle hacks, browser-native efficiency

---

## Tech Stack

Next.js 13 · React 18 · React Query · SCSS · Vercel

---

*Built by a product manager who believes the best PMs understand the systems behind their products.*
