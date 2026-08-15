import { Router } from 'express';
import * as store from '../store';

export const studentsRouter = Router();

studentsRouter.get('/:id/signups', async (req, res) => {
  const result = (await store.signupsForStudent(req.params.id)).sort(
    (a, b) => a.sequence - b.sequence,
  );
  res.json(result);
});
