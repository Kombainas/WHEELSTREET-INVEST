# 7AM Community — Deployment Guide

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | Production URL, e.g. `https://7am.lt` |
| `NEXT_PUBLIC_VERIFY_URL` | Yes | QR verification domain, e.g. `https://verify.7am.lt` |
| `NEXTAUTH_URL` | Yes | Must match `NEXT_PUBLIC_SITE_URL` for NextAuth |
| `NEXTAUTH_SECRET` | Yes | Random secret for session signing (`openssl rand -base64 32`) |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase service role key (server-only) |
| `ADMIN_USERNAME` | Yes | Admin login username |
| `ADMIN_PASSWORD` | Yes | Admin login password |
| `NEXT_PUBLIC_CONTACT_EMAIL` | No | Contact email shown in UI (defaults to `info@7am.lt`) |

## Vercel Deployment

1. Connect the GitHub repo to Vercel
2. Add all env vars above in **Settings > Environment Variables**
3. Deploy — Vercel auto-builds on push to `main`

## Domain Setup

### Primary domain: `7am.lt`

1. In Vercel **Settings > Domains**, add `7am.lt`
2. In your DNS provider, add:
   - `A` record: `7am.lt` → `76.76.21.21`
   - `CNAME` record: `www.7am.lt` → `cname.vercel-dns.com`

### Verify subdomain: `verify.7am.lt`

1. In Vercel **Settings > Domains**, add `verify.7am.lt`
2. In your DNS provider, add:
   - `CNAME` record: `verify.7am.lt` → `cname.vercel-dns.com`
3. Set `NEXT_PUBLIC_VERIFY_URL=https://verify.7am.lt` in env vars

Both domains point to the same Vercel project. QR codes encode `https://verify.7am.lt/v/<token>`.

## QR Link Flow

- Server generates QR via `getVerifyLink(token)` → `https://verify.7am.lt/v/<token>`
- Partner scans QR → lands on verification page
- `/v/[token]` has `noindex, nofollow` (metadata + X-Robots-Tag header)

## Protected Routes

- `/admin/*` and `/member/*` have `noindex, nofollow` metadata + X-Robots-Tag headers
- `/admin/*` and `/member/*` are behind NextAuth middleware
