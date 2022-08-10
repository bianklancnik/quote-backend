import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDTO } from '../../auth/dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { UpdatePasswordDTO } from '../../auth/dto/update-password.dto';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
    const { email, firstName, lastName, password, confirmPassword } =
      authCredentialsDTO;
    //check if passwords match
    if (password === confirmPassword) {
      //hash
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = this.create({
        email,
        password: hashedPassword,
        firstName,
        lastName,
      });

      try {
        await this.save(user);
      } catch (error) {
        if (error.code === '23505')
          throw new ConflictException('Email is already registered');
        else throw new InternalServerErrorException();
      }
    } else {
      throw new InternalServerErrorException('Passwords do not match');
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
}
