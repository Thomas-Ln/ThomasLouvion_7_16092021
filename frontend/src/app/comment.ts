import { User } from './user';
import { Post } from './post';

export interface Comment {
  id: number;
  content: string;
  user?: {
    name: User["name"]
  };
  user_id: User["id"];
  post_id: Post["id"];
  createdAt: Date;
  updatedAt: Date;
  moderated: true | false;
}
