import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({ description: 'The email of the user' })
  email?: string;

  @IsString()
  @ApiProperty({ description: 'The password of the user' })
  @MinLength(8)
  password?: string;
}
