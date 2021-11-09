import { User } from './user';
import { Post } from './post';

export interface Comment {
  id: number;
  content: string;
  author_id: User["id"];
  post_id: Post["id"];
  createdAt: Date;
  updatedAt: Date;
  moderated: true | false;
}
