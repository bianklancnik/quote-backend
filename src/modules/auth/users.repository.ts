import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { UpdatePasswordDTO } from './dto/update-password.dto';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
    const { username, password } = authCredentialsDTO;

    //hash
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({ username, password: hashedPassword });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505')
        throw new ConflictException('Username already exists');
      else throw new InternalServerErrorException();
    }
  }

  async updatePassword(
    updatePasswordDTO: UpdatePasswordDTO,
    user: User,
  ): Promise<void> {
    const { id } = user;
    const { newPassword } = updatePasswordDTO;

    //hash
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    try {
      await this.update(id, { password: hashedPassword });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getUsersAndQuotesList(): Promise<User[]> {
    const users = await this.createQueryBuilder('user')
      .select('user.username')
      .innerJoinAndSelect('user.quotes', 'quotes')
      .orderBy('quotes.upvotes', 'DESC')
      .getMany();
    return users;
  }
}
