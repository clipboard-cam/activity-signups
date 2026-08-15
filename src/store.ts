import { Activity, Signup, SignupStatus } from './types';

/**
 * A real deployment would use a database; this in-memory store keeps the
 * exercise self-contained. Treat it exactly as you would a persistence layer:
 * every operation crosses an I/O boundary and returns a promise.
 *
 * Operations are serialised, so a handler that reads some rows and then writes
 * can treat the pair as a single atomic step.
 */

const seedActivities: Activity[] = [
  { id: 'chess', schoolId: 'ashmere', name: 'Chess Club', capacity: 8 },
  { id: 'football', schoolId: 'ashmere', name: 'Football', capacity: 2 },
  { id: 'orchestra', schoolId: 'kestrelford', name: 'Orchestra', capacity: 30 },
  { id: 'debating', schoolId: 'kestrelford', name: 'Debating', capacity: 4 },
  { id: 'netball', schoolId: 'ashmere', name: 'Netball', capacity: 2 },
];

// Live sign-ups exported from Ashmere on 12 August, so local runs and tests
// start from the data the schools actually have.
const seedSignups: Signup[] = [
  { activityId: 'netball', studentId: 'hannah', status: 'confirmed', sequence: 1 },
  { activityId: 'netball', studentId: 'imogen', status: 'confirmed', sequence: 2 },
  { activityId: 'netball', studentId: 'jess', status: 'confirmed', sequence: 3 },
];

let activities: Activity[] = [...seedActivities];
let signups: Signup[] = seedSignups.map((s) => ({ ...s }));
let sequenceCounter = seedSignups.length;

// Stands in for the round trip to the database.
const io = (): Promise<void> => new Promise((resolve) => setImmediate(resolve));

const copy = (signup: Signup): Signup => ({ ...signup });

export async function listActivities(): Promise<Activity[]> {
  await io();
  return [...activities];
}

export async function findActivity(id: string): Promise<Activity | undefined> {
  await io();
  return activities.find((a) => a.id === id);
}

export async function signupsForActivity(activityId: string): Promise<Signup[]> {
  await io();
  return signups.filter((s) => s.activityId === activityId).map(copy);
}

export async function signupsForStudent(studentId: string): Promise<Signup[]> {
  await io();
  return signups.filter((s) => s.studentId === studentId).map(copy);
}

export async function findSignup(
  activityId: string,
  studentId: string,
): Promise<Signup | undefined> {
  await io();
  const found = signups.find(
    (s) => s.activityId === activityId && s.studentId === studentId,
  );
  return found ? copy(found) : undefined;
}

export async function insertSignup(signup: Signup): Promise<Signup> {
  await io();
  signups.push(copy(signup));
  return copy(signup);
}

export async function updateSignupStatus(
  activityId: string,
  studentId: string,
  status: SignupStatus,
): Promise<void> {
  await io();
  const found = signups.find(
    (s) => s.activityId === activityId && s.studentId === studentId,
  );
  if (found) {
    found.status = status;
  }
}

export async function deleteSignup(activityId: string, studentId: string): Promise<void> {
  await io();
  signups = signups.filter(
    (s) => !(s.activityId === activityId && s.studentId === studentId),
  );
}

export async function nextSequence(): Promise<number> {
  await io();
  sequenceCounter += 1;
  return sequenceCounter;
}

export function resetStore(): void {
  activities = [...seedActivities];
  signups = seedSignups.map((s) => ({ ...s }));
  sequenceCounter = seedSignups.length;
}
