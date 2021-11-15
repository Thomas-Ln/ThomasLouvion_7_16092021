import { User } from './user';

export interface Post {
  id: number;
  title: string;
  text: string | null;
  image: string | null;
  user_id: User["id"];
  createdAt: Date;
  updatedAt: Date;
  moderated: true | false;
}
