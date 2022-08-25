import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/entities/user.entity';
import { UpdatePasswordDTO } from 'src/modules/auth/dto/update-password.dto';
import { GetUser } from 'src/modules/auth/get-user.decorator';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  @UseGuards(AuthGuard())
  userInformation(@GetUser() user: User): Promise<{
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    count: number;
  }> {
    return this.userService.userInformation(user);
  }

  @Patch('me/update-password')
  @UseGuards(AuthGuard())
  updateUserPassword(
    @Body() updatePasswordDTO: UpdatePasswordDTO,
    @GetUser() user: User,
  ): Promise<void> {
    return this.userService.updateUserPassword(updatePasswordDTO, user);
  }
}
