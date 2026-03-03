# ES Homepage

[Live](https://es-homepage.vercel.app)

Dark-themed article feed. Next.js, React Query, infinite scroll.

## What it does

Shows a paginated list of articles. First page is server-rendered, rest loads on scroll via infinite scroll (IntersectionObserver + React Query).

## The one thing worth reading

The app had a bug where the server fetched articles during SSR, then React Query on the client fetched the same articles again. Two API calls for the same data. Loading flash on every page load. Wasted bandwidth.

Fix: pass SSR data into React Query as `initialData` with a `staleTime`. Client uses what the server already fetched. Only fetches new pages on scroll.

This is a common pattern — two systems each assuming they own the data. Mobile apps do it (splash screen fetches config, home screen fetches it again). Microservices do it. Dashboards do it. The fix is always the same: pass context forward instead of re-deriving it.

## How it works

- Server fetches page 1 via `getServerSideProps`
- Hands data to React Query cache on the client
- IntersectionObserver triggers `fetchNextPage` when user scrolls near bottom
- Stops fetching when API returns fewer items than the page size

## Stack

Next.js 13, React 18, React Query, SCSS, Vercel
