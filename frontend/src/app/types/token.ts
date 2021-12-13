import { User } from './user';

export interface Token {
  token: string;
  userId: User["id"];
}
