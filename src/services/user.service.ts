import { defaultClient as client, defaultPool as pool } from '@database/connection';
import { UserDB } from '@database/Classes/UserDB';
import { IUser } from '@database/Interfaces';

export class UserService {
  private userDB = new UserDB(client, pool);

  async getUsers(): Promise<IUser[]> {
    const users = await this.userDB.getAll();
    return users;
  }

  async getUserById(user_id: string): Promise<IUser[]> {
    const user = await this.userDB.getById(user_id);
    return user;
  }

  async createUser(user: IUser): Promise<IUser[]> {
    const createdUser = await this.userDB.create(user);
    return createdUser;
  }

  async updateUser(user_id: string, user: IUser): Promise<IUser[]> {
    const updatedUser = await this.userDB.updateById(user_id, user);
    return updatedUser;
  }

  async deleteUser(user_id: string): Promise<IUser[]> {
    const deletedUser = await this.userDB.deleteById(user_id);
    return deletedUser;
  }
}
