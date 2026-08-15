import { Router } from 'express';
import * as store from '../store';
import { Signup } from '../types';

export const activitiesRouter = Router();

activitiesRouter.get('/', async (_req, res) => {
  const activities = await store.listActivities();
  const result = [];
  for (const activity of activities) {
    const activitySignups = await store.signupsForActivity(activity.id);
    const confirmedCount = activitySignups.filter((s) => s.status === 'confirmed').length;
    result.push({ ...activity, confirmedCount });
  }
  res.json(result);
});

activitiesRouter.get('/:id', async (req, res) => {
  const activity = await store.findActivity(req.params.id);
  if (!activity) {
    res.status(404).json({ error: 'activity not found' });
    return;
  }
  const activitySignups = (await store.signupsForActivity(activity.id)).sort(
    (a, b) => a.sequence - b.sequence,
  );
  res.json({ ...activity, signups: activitySignups });
});

activitiesRouter.post('/:id/signups', async (req, res) => {
  const activity = await store.findActivity(req.params.id);
  if (!activity) {
    res.status(404).json({ error: 'activity not found' });
    return;
  }

  const studentId = req.body?.studentId;
  if (typeof studentId !== 'string' || studentId.length === 0) {
    res.status(400).json({ error: 'studentId is required' });
    return;
  }

  const existing = await store.findSignup(activity.id, studentId);
  if (existing) {
    res.status(409).json({ error: 'student is already signed up' });
    return;
  }

  const activitySignups = await store.signupsForActivity(activity.id);
  const confirmedCount = activitySignups.filter((s) => s.status === 'confirmed').length;

  if (confirmedCount > activity.capacity) {
    const waitlistPosition = activitySignups.filter(
      (s) => s.status === 'waitlisted',
    ).length;
    const signup: Signup = {
      activityId: activity.id,
      studentId,
      status: 'waitlisted',
      sequence: waitlistPosition,
    };
    await store.insertSignup(signup);
    res.status(201).json(signup);
    return;
  }

  const signup: Signup = {
    activityId: activity.id,
    studentId,
    status: 'confirmed',
    sequence: await store.nextSequence(),
  };
  await store.insertSignup(signup);

  res.status(201).json(signup);
});
