import { ObjectId } from 'mongodb';

export interface UserProfile {
  bio?: string;
  fitnessGoal?: string;
  avatar?: string;
}

export interface User {
  _id?: ObjectId;
  username: string;
  hashedPassword: string;
  createdAt: Date;
  profile: UserProfile;
}

export interface UserCredentials {
  username: string;
  password: string;
}

export interface UserAuthResponse {
  username: string;
  password: string;
  message: string;
}
