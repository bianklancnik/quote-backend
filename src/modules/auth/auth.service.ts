import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from '../user/user/users.repository';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';

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
  ): Promise<{ accessToken: string; id: string }> {
    const { email, password } = authCredentialsDTO;
    const user = await this.usersRepository.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { email };
      const accessToken: string = await this.jwtService.sign(payload);
      const id = user.id;
      return { accessToken, id };
    } else
      throw new UnauthorizedException('Please check your login credentials');
  }
}
