# Product notes: withdrawals and the waitlist

Forwarded from Priya (Head of Product), 12 August — context for the withdrawal work.

---

Hi team,

A few things from my calls with schools this week, for whoever picks up the
withdrawal feature:

1. Withdrawals are common in the first two weeks of term, so freed spots
   need to be re-filled automatically — nobody at the school has time to
   manage this by hand.

2. On who gets the freed spot: schools care a lot that every student gets
   *something*. When a spot opens up, priority should go to the waitlisted
   student who is confirmed in the fewest other activities, using how long
   they have waited as the tiebreak. A student with no activities at all
   should jump the queue ahead of someone who already has three.

3. One school mentioned that students who withdraw by accident (it happens —
   guardians share portal logins) shouldn't lose their place if they rejoin
   quickly. Not sure how we want to handle that yet.

4. Separately, Ashmere have raised something odd twice this term. When
   sign-ups open at 9am the whole year group hits the page at once, and both
   times they ended up with more confirmed students than the activity had
   room for — on one occasion four confirmed places on a capacity of two.
   They cannot reproduce it when they try it themselves afterwards, one
   sign-up at a time, which is why it took them a term to report it. Whoever
   picks up the capacity work should make sure it holds up under that kind of
   load.

5. Last one, and it may be nothing to do with us. The portal team shipped the
   sign-up button to students last week — before that the portal only showed
   the activity list. Ashmere say students can see the activities fine, but
   clicking "sign up" does nothing at all: no error, no confirmation, the page
   just sits there. Our developer checked the API from his terminal and says
   sign-ups work perfectly, so he thinks it is a portal problem. The portal
   team say their code is calling us and getting nothing back. I do not know
   who is right.

Happy to jump on a call if any of this is unclear.

Priya
