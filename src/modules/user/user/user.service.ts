import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UpdatePasswordDTO } from 'src/modules/auth/dto/update-password.dto';
import { UsersRepository } from 'src/modules/user/user/users.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  async userInformation(user: User): Promise<{
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    count: number;
  }> {
    const quoteNumber = await this.usersRepository
      .createQueryBuilder('user')
      .select('COUNT(quote.id)')
      .innerJoin('user.quotes', 'quote')
      .where('user.id = :uid')
      .setParameter('uid', user.id)
      .execute();

    const count = quoteNumber.reduce(
      (sum, num) => Number(sum) + Number(num.count),
      0,
    );
    const { id, email, firstName, lastName } = user;
    return { id, email, firstName, lastName, count };
  }

  async updateUserPassword(
    updatePasswordDTO: UpdatePasswordDTO,
    user: User,
  ): Promise<void> {
    return this.usersRepository.updatePassword(updatePasswordDTO, user);
  }
}
