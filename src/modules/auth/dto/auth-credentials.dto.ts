import {
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AuthCredentialsDTO {
  @IsString()
  email: string;

  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsString()
  @MinLength(8, {
    message: 'Password must be longer than or equal to 8 characters',
  })
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password is too weak (must include at least 1 upper case letter, 1 lower case letter and 1 number or special character)!',
  })
  password: string;

  @IsString()
  @IsOptional()
  confirmPassword: string;
}
