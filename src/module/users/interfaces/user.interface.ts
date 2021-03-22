import { Document } from 'mongoose';

export interface User {
  username: string;
  nickname: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserDocument extends User, Document {}
