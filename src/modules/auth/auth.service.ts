import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  async signUp(signUpDto: SignUpDto) {
    const user = await this.usersService.findOne(
      {
        username: signUpDto.username,
      },
      { id: true },
    );
    if (user) throw new UnauthorizedException('User already exists ');

    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(signUpDto.password, salt);

    const newUser = await this.usersService.create({
      username: signUpDto.username,
      password,
    });

    return newUser;
  }
  async signIn(signInDto: SignInDto) {
    const user = await this.usersService.findOne(
      {
        username: signInDto.username,
      },
      { username: true, email: true, emailVerified: true, password: true },
    );
    if (!user) throw new UnauthorizedException('Invalid username or password');

    const compareResult = await bcrypt.compare(
      signInDto.password,
      user.password,
    );
    if (!compareResult)
      throw new UnauthorizedException('Invalid username or password');

    return {
      user: {
        username: user.username,
        email: user.email,
        emailVerified: user.emailVerified,
      },
      message: 'Your logged now',
    };
  }
}
