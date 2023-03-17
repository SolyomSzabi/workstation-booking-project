import { User } from '../../db';
import { IUsersRepository } from '../../repository';
import { userSchema } from './schema';
import { ValidationError } from 'joi';
import logger from '../../logger';

export interface IUsersService {
  getUsers(): Promise<User[]>;
  findUserByEmail(email: string): Promise<User[]>;
  findUserById(id: number): Promise<User[]>;
  isEmailRegistered(email: string): Promise<boolean>;
  isUserNameRegistered(name: string): Promise<boolean>;
  createUser(users: User): Promise<{ status: string; message: string[] }>;
  updateUser(users: User): Promise<{ status: string; message: string[] }>;
  deleteUser(users: User): Promise<{ status: string; message: string[] }>;
}

export class UserService implements IUsersService {
  constructor(private userRepository: IUsersRepository) {}

  async getUsers(): Promise<User[]> {
    return await this.userRepository.findAllUsers();
  }

  async createUser(user: User): Promise<{ status: string; message: string[] }> {
    try {
      const value = await userSchema.validateAsync(user);
    } catch (error) {
      if (error instanceof ValidationError) {
        logger.error(error);
        const { details } = error;
        const errorMessage = details.map(ve => ve.message);
        return { status: 'Error', message: errorMessage };
      }
    }

    const newUser = await this.userRepository.saveUser(user);

    return {
      status: 'OK',
      message: [`User is succesfully saved with userID: ${newUser.userID}`],
    };
  }

  async findUserByEmail(email: string): Promise<User[]> {
    return await this.userRepository.findUserByEmail(email);
  }

  async findUserById(id: number): Promise<User[]> {
    return await this.userRepository.findUserById(id);
  }

  async isEmailRegistered(email: string): Promise<boolean> {
    return (await this.userRepository.findUserByEmail(email)).length != 0;
  }

  async isUserNameRegistered(name: string): Promise<boolean> {
    return (await this.userRepository.findUserByName(name)).length != 0;
  }

  async updateUser(user: User): Promise<{ status: string; message: string[] }> {
    const updatedUser: boolean =
      (await this.userRepository.updateUser(user)) !== null;
    return {
      status: updatedUser ? 'OK' : 'Error',
      message: updatedUser
        ? [`User with ID ${user.userID} has been updated!`]
        : ['Something went wrong!'],
    };
  }

  async deleteUser(user: User): Promise<{ status: string; message: string[] }> {
    const deleteUser: boolean =
      (await this.userRepository.deleteUser(user)) === !null;
    return {
      status: deleteUser ? 'OK' : 'Error',
      message: deleteUser
        ? [`User succesfully deleted with ID ${user.userID}!`]
        : [`User with ID ${user.userID} not found!`],
    };
  }
}
