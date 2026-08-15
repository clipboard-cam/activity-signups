# Take-Home Exercise: Activity Sign-Ups API

Thanks for taking the time to do this exercise. If you do not get to everything, write down what you would have done next in `NOTES.md` — we would rather read that than see an unfinished attempt at everything.

## The scenario

This repo contains a small REST API for a school activity sign-up system. Students sign up for activities; each activity has a capacity, and once it is full, further sign-ups go on a waitlist. Two schools use it: Kestrelford High and Ashmere College.

See `README.md` for how to install, run, and test. Background from our product team is in `docs/product-notes.md`.

## Your tasks

### Task 1 — Capacity policy

Ashmere College has reported:

> "Football has a capacity of 2, but 3 students ended up with confirmed places. This is causing us real problems — the coach only has equipment for 2."

Kestrelford High's requirements are different, and `docs/changelog.md` is the best record of them.

Implement a capacity policy that serves both schools. Add or update tests so the behaviour you settle on is pinned for both.

**There is no single correct design here.** Several approaches are reasonable, and we are interested in the one you chose and what you traded away, not in matching a hidden answer. A simple design you can explain clearly beats an elaborate one. If a decision is taking a while, pick the simpler option and note the alternative in `NOTES.md`.

### Task 2 — Add a withdrawal feature

Add an endpoint:

```
DELETE /activities/:id/signups/:studentId
```

Behaviour:

- Removes the student's signup from the activity.
- If the withdrawn student had a **confirmed** place and there are students on the waitlist, the student who has been waiting longest is promoted to confirmed.
- Responds `404` if the activity or the signup does not exist.
- Responds `204` on success.

Add tests for the behaviour, including the edge cases you think matter.

If anything is ambiguous, unclear, or contradictory, email us your questions — asking good questions counts in your favour. If you'd rather not wait for an answer, record the question and the assumption you proceeded with in a `QUESTIONS.md`.

### Decisions you will have to make

This exercise is built around choices rather than a hidden correct answer. We
care more about the reasoning than the option. Areas where you will have to
decide something, none of which the repo settles for you:

- How capacity policy is modelled, given two schools that want different things.
- Who gets a freed place when someone withdraws.
- What happens to sign-ups that already break the rule you are introducing.
- How the system behaves when several students act at the same moment.
- Anything else you find that the repo, the brief and the product notes do not
  agree on.

For each one you act on, `NOTES.md` should say what you chose, what you gave
up, and who is affected. Where you would rather ask than decide, ask — see
below.

### Task 3 — Write NOTES.md

Create a `NOTES.md` covering, briefly:

1. The capacity design you built, at least one alternative you rejected, and why you chose as you did.
2. What would make you revisit that design.
3. Any other trade-offs or assumptions you made, and what you would do next.
4. One or two things you would change about the existing code.
5. **Anything in this repo you believe is wrong, stale or misleading** — a comment, a test name, a changelog entry, a document. Write "nothing" if you found nothing.
6. **Questions you would want answered before this shipped to a real school.** Write "none" if you have none.
7. **What you checked yourself, and how.** Which behaviour did you verify with your own eyes rather than trusting a passing test — and what did you do to verify it?
8. **Where you disagreed with a tool, a document or a colleague's past decision,** and what you did about it. Write "nothing" if that did not come up.
9. **What you are least confident in.** One thing you would want a second pair of eyes on, and why.

Write `NOTES.md` in your own words. Sections 7 to 9 are about what *you* did and what *you* think, so they are the ones an assistant cannot write for you.

## What we assess

- **Design judgment**: the decisions you spotted, the trade-offs you identified, and how you reasoned about them — especially in terms of the schools, students and parents affected, not only the code.
- **Correctness**, including edge cases.
- **Tests** that pin down the behaviour you added or changed.
- **Code clarity** and consistency with the existing style.
- **Communication** in NOTES.md: what you decided, and why.

## What we do NOT assess

Do not spend time on: authentication, swapping the in-memory store for a real database, deployment, logging, API documentation, or a frontend. Exhaustive test coverage is not expected — well-chosen tests are.

## AI tools

You may use AI coding tools, and we do not treat that as a lesser way of working.

What we do ask is that you own what you submit. The follow-up conversation goes
through your `NOTES.md` and your code line by line: why this design and not the
one you rejected, why this student gets the place and not that one, what would
break if a decision went the other way. We will also ask you to extend the
solution while we talk. A submission you cannot explain is worth less to us
than a smaller one you can, so if you leave something out, say so in `NOTES.md`
rather than shipping something you have not read.

## Submitting

Leave your work in this environment — `NOTES.md` and `QUESTIONS.md` alongside the code. Nothing to send.

You are working in a recorded session: we can replay how the solution came together, and we will look at it. That is not there to catch anyone out. It is there because how someone works through a problem — what they read first, what they run, what they do when a test goes red — tells us things a finished diff cannot, and it is the part of the job an interview usually cannot see. Work the way you normally would.
