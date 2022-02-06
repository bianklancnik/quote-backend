import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { User } from 'src/entities/user.entity';
import { UpdatePasswordDTO } from './dto/update-password.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
    return this.usersRepository.createUser(authCredentialsDTO);
  }

  async signIn(
    authCredentialsDTO: AuthCredentialsDTO,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDTO;
    const user = await this.usersRepository.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else
      throw new UnauthorizedException('Please check your login credentials');
  }

  userInformation(user: User): { id: string; username: string } {
    const { id, username } = user;
    return { id, username };
  }

  async updateUserPassword(
    updatePasswordDTO: UpdatePasswordDTO,
    user: User,
  ): Promise<void> {
    return this.usersRepository.updatePassword(updatePasswordDTO, user);
  }

  async getUsersAndQuotesList(): Promise<User[]> {
    const list = await this.usersRepository.getUsersAndQuotesList();
    return list;
  }
}
