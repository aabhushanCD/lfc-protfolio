import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

// Workaround for "Unsafe call of a type that could not be resolved" lint/TS check

export class RegisterDto {
  @IsEmail()
  @ApiProperty({ description: 'The email of the user' })
  email!: string;

  @IsString()
  @ApiProperty({ description: 'Password is required' })
  password!: string;
}
