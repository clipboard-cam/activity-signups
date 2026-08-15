# Activity Sign-Ups API

A small Express + TypeScript API for school activity sign-ups. See `BRIEF.md` for the exercise instructions, `docs/changelog.md` for what has changed and why, and `docs/product-notes.md` for background from the product team.

## Requirements

- Node.js 20+ (`.nvmrc` pins 22; run `nvm use` if you have nvm)

## Setup

```bash
npm install
```

## Commands

```bash
npm test           # run the Jest test suite
npm run typecheck  # TypeScript type check
npm run dev        # start the API on http://localhost:3001
```

The test suite drives the API itself — it starts the app in-process and makes
real HTTP requests against it, so a passing suite means the endpoints answered,
not just that the functions returned. To poke at an endpoint by hand, start the
service with `npm run dev` and use curl:

```bash
curl http://localhost:3001/activities
curl -X POST http://localhost:3001/activities/chess/signups \
  -H 'content-type: application/json' -d '{"studentId":"alice"}'
```

## API

- `GET /activities` — list activities with confirmed sign-up counts
- `GET /activities/:id` — activity detail including its sign-ups
- `POST /activities/:id/signups` — body `{ "studentId": "alice" }`; confirms or waitlists
- `GET /students/:id/signups` — a student's sign-ups across activities

Data is held in memory and seeded in `src/store.ts`; restarting the server resets it. The store's operations are asynchronous so that it behaves like the database it stands in for — a request handler waits on it exactly as it would wait on a real query.
