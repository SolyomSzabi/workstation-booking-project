import { appDataSource } from '../db';
import { User } from '../db';

import { genSaltSync, hashSync } from 'bcrypt';

export interface IUsersRepository {
  findAllUsers(): Promise<User[]>;
  findUser(user: User): Promise<User | null>;
  findUserById(id: number): Promise<User[]>;
  saveUser(user: User): Promise<User>;
  updateUser(user: User): Promise<User | null>;
  deleteUser(user: User): Promise<boolean>;
  findUserByEmail(email: string): Promise<User[]>;
  findUserByName(name: string): Promise<User[]>;
}

export class UserRepository implements IUsersRepository {
  findAllUsers(): Promise<User[]> {
    return appDataSource.getRepository(User).find({
      relations: { booking: { workstation: { floor: { building: true } } } },
    });
  }

  saveUser(user: User): Promise<User> {
    const saltRounds = 10;
    const salt = genSaltSync(saltRounds);
    const hash = hashSync(user.password as string, salt);

    const userToSave = new User();
    userToSave.email = user.email;
    userToSave.userName = user.userName;
    userToSave.password = hash;
    userToSave.admin = user.admin;
    userToSave.active = user.active;

    return appDataSource.getRepository(User).save(userToSave);
  }

  findUser(user: User): Promise<User | null> {
    return appDataSource
      .getRepository(User)
      .findOne({ where: { userID: user.userID } });
  }

  findUserById(id: number): Promise<User[]> {
    return appDataSource.getRepository(User).find({ where: { userID: id } });
  }

  findUserByName(name: string): Promise<User[]> {
    return appDataSource
      .getRepository(User)
      .find({ where: { userName: name } });
  }

  findUserByEmail(email: string): Promise<User[]> {
    return appDataSource.getRepository(User).find({ where: { email: email } });
  }

  async updateUser(user: User): Promise<User | null> {
    if ((await this.findUser(user)) === null) return null;
    const updateResult = appDataSource
      .createQueryBuilder()
      .update(User)
      .set({
        email: user.email,
        userName: user.userName,
        password: user.password,
        active: user.active,
        admin: user.admin,
        booking: user.booking,
      })
      .where('userId=:id', { id: user.userID })
      .execute();
    const updatedUser = this.findUser(user);
    return updatedUser;
  }

  async deleteUser(user: User): Promise<boolean> {
    if ((await this.findUser(user)) === null) return false;

    await appDataSource
      .createQueryBuilder()
      .delete()
      .from(User)
      .where('userId=:id', { id: user.userID })
      .execute();
    if ((await this.findUser(user)) === null) {
      return true;
    } else {
      return false;
    }
  }
}
