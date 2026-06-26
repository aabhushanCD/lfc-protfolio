import { Injectable } from '@nestjs/common';

import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  async register(registerDto: RegisterDto): Promise<User> {
    const user = await this.usersService.create(registerDto);
    return user;
  }
}
