import request from 'supertest';
import { createApp } from './app';
import { resetStore } from './store';

const app = createApp();

beforeEach(() => {
  resetStore();
});

describe('GET /activities', () => {
  it('lists activities with their confirmed counts', async () => {
    const res = await request(app).get('/activities');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(5);
    expect(res.body[0]).toEqual({
      id: 'chess',
      schoolId: 'ashmere',
      name: 'Chess Club',
      capacity: 8,
      confirmedCount: 0,
    });
  });
});

describe('GET /activities/:id', () => {
  it('returns 404 for an unknown activity', async () => {
    const res = await request(app).get('/activities/underwater-hockey');
    expect(res.status).toBe(404);
  });
});

describe('POST /activities/:id/signups', () => {
  it('confirms a signup when the activity has space', async () => {
    const res = await request(app)
      .post('/activities/chess/signups')
      .send({ studentId: 'alice' });
    expect(res.status).toBe(201);
    expect(res.body.status).toBe('confirmed');
  });

  it('rejects a signup without a studentId', async () => {
    const res = await request(app).post('/activities/chess/signups').send({});
    expect(res.status).toBe(400);
  });

  it('rejects a duplicate signup', async () => {
    await request(app).post('/activities/chess/signups').send({ studentId: 'alice' });
    const res = await request(app)
      .post('/activities/chess/signups')
      .send({ studentId: 'alice' });
    expect(res.status).toBe(409);
  });

  it('confirms one signup beyond the stated capacity', async () => {
    for (const studentId of ['alice', 'bob', 'carol', 'dave']) {
      await request(app).post('/activities/debating/signups').send({ studentId });
    }
    const res = await request(app)
      .post('/activities/debating/signups')
      .send({ studentId: 'erin' });
    expect(res.status).toBe(201);
    expect(res.body.status).toBe('confirmed');
  });

  it('never confirms more students than the activity has room for', async () => {
    for (const studentId of ['alice', 'bob', 'carol']) {
      await request(app).post('/activities/football/signups').send({ studentId });
    }
    const res = await request(app)
      .post('/activities/football/signups')
      .send({ studentId: 'dave' });
    expect(res.status).toBe(201);
    expect(res.body.status).toBe('waitlisted');
  });
});

describe('GET /students/:id/signups', () => {
  it('lists a student’s signups across activities', async () => {
    await request(app).post('/activities/chess/signups').send({ studentId: 'alice' });
    await request(app).post('/activities/orchestra/signups').send({ studentId: 'alice' });
    const res = await request(app).get('/students/alice/signups');
    expect(res.status).toBe(200);
    expect(res.body.map((s: { activityId: string }) => s.activityId)).toEqual([
      'chess',
      'orchestra',
    ]);
  });
  it('lists signups in the order the student signed up', async () => {
    await request(app).post('/activities/chess/signups').send({ studentId: 'carol' });
    await request(app).post('/activities/football/signups').send({ studentId: 'alice' });
    await request(app).post('/activities/football/signups').send({ studentId: 'bob' });
    await request(app).post('/activities/football/signups').send({ studentId: 'carol' });

    const res = await request(app).get('/students/carol/signups');
    expect(res.status).toBe(200);
    expect(res.body.map((s: { activityId: string }) => s.activityId)).toEqual([
      'chess',
      'football',
    ]);
  });
});
