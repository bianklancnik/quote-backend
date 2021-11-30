import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { UpdatePasswordDTO } from './dto/update-password.dto';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
    return this.authService.signUp(authCredentialsDTO);
  }

  @Post('login')
  signIn(
    @Body() authCredentialsDTO: AuthCredentialsDTO,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDTO);
  }

  @Get('me')
  @UseGuards(AuthGuard())
  userInformation(@GetUser() user: User): { id: string; username: string } {
    return this.authService.userInformation(user);
  }

  @Patch('me/update-password')
  @UseGuards(AuthGuard())
  updateUserPassword(
    @Body() updatePasswordDTO: UpdatePasswordDTO,
    @GetUser() user: User,
  ): Promise<void> {
    return this.authService.updateUserPassword(updatePasswordDTO, user);
  }

  @Get('test')
  test() {
    console.log('neki');
  }
}
