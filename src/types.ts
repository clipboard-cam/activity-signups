export interface Activity {
  readonly id: string;
  readonly schoolId: string;
  readonly name: string;
  readonly capacity: number;
}

export type SignupStatus = 'confirmed' | 'waitlisted';

export interface Signup {
  readonly activityId: string;
  readonly studentId: string;
  status: SignupStatus;
  // Position of this signup within its activity: 1 for the first student to
  // sign up, 2 for the next, and so on. Sequences are only meaningful when
  // compared within a single activity.
  readonly sequence: number;
}
