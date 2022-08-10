import { User } from 'src/entities/user.entity';

export type GetUserList = {
  userList: User[];
  pages: number;
};
