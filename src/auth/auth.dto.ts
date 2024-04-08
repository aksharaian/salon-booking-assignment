import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsNotEmpty({
    message: 'email is required',
  })
  email: string;

  @IsNotEmpty({
    message: 'password is required',
  })
  password: string;
}
