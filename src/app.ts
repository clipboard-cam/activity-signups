import express from 'express';
import { activitiesRouter } from './routes/activities';
import { studentsRouter } from './routes/students';

export function createApp(): express.Express {
  const app = express();
  app.use(express.json());

  // The portal is served from its own domain, so the browser has to be told
  // this API will answer it.
  app.use((_req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://portal.clipboard.example');
    next();
  });
  app.use('/activities', activitiesRouter);
  app.use('/students', studentsRouter);
  return app;
}
