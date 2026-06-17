import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register a new user' })
  @Post('sign-up')
  signup(@Body() signupDto: SignUpDto) {
    return this.authService.signUp(signupDto);
  }

  @ApiOperation({ summary: 'Login with existing credentials' })
  @Post('sign-in')
  signin(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @ApiOperation({ summary: 'Logout and revoke refresh token' })
  @Post('sign-out')
  signout() {}

  @ApiOperation({ summary: 'Issue a new access token using refresh token' })
  @Post('refresh-token')
  refresh() {}

  @ApiOperation({ summary: 'Send a password reset link to email' })
  @Post('reset-password')
  resetPassword() {}
}
