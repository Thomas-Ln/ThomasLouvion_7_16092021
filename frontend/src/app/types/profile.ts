import { User } from './user';

export interface Profile {
  name: User['name'],
  email: User['email'],
  created_at: Date;
  posts: number,
  comments: number,
}
