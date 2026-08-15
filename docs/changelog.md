# Changelog

What has changed in this service and why. We keep this by hand — the team
agreed to it after a release nobody could explain six months later. Newest
first.

## 16 August 2026 — Alex

Moved the dev server to 3001; 3000 collides with everything else people run
locally. Spelled out in the README that the test suite makes real HTTP requests
against the app, with the curl equivalents for driving it by hand.

## 15 August 2026 — Alex

Tidied the package description and pinned the Node version in `.nvmrc`.

## 14 August 2026 — Alex

Added Priya's note from her school calls to `docs/product-notes.md`, including
the one about the portal sign-up button.

Refreshed the seed data from Ashmere's export of 12 August, so running the
service locally starts from something close to what the schools actually have
rather than an empty list.

## 5 August 2026 — Marta

Let the portal read the activity list. The portal is on
portal.clipboard.example and this API is not, so the browser was blocking the
response to `GET /activities`. Sending the allow-origin header is all it needs.

## 28 July 2026 — Marta

Made the store asynchronous ahead of the Postgres migration. Every store
operation now returns a promise and the handlers await it, so swapping the
in-memory implementation for real queries is a change to one module rather than
to every route. No behaviour change.

## 2 July 2026 — Alex

Fixed sign-up ordering for students across activities. Waitlisted sign-ups were
being numbered independently of confirmed ones, so a student's sign-ups came
back from `/students/:id/signups` in the wrong order. Corrected the sequence
handling and added a regression test.

## 17 June 2026 — Alex (CLIP-841)

Allow one extra confirmed sign-up, for Kestrelford High. Kestrelford
deliberately over-enrol by one on every activity — they run with a standing assumption that
one student will drop out in the first fortnight. Relaxing the capacity check
by one confirmed place.

Note this is currently global; if another school wants a hard cap we will need
to make it per-school.

## 4 May 2026 — Alex

First version of the activity sign-ups service: list activities, view one, sign
up for one, and list a student's sign-ups. Capacity is enforced on sign-up and
anyone over it goes on the waitlist.
