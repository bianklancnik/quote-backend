import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class UpdatePasswordDTO {
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'password is too weak (must include at least 1 upper case letter, 1 lower case letter and 1 number or special character)!',
  })
  newPassword: string;
}
