import { Body, Controller, Headers, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/SignUp.dto';
import { LoginDto } from './dto/Login.dto';
import { Response } from 'express';

//권한에 관한 Controller
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Headers() loginDto: LoginDto, @Res() response: Response) {
    return this.authService.login(loginDto, response);
  }

  @Post('/logout')
  logout(@Headers('userId') userId: string, @Res() response: Response) {
    return this.authService.logout(userId, response);
  }

  @Post('/sign_up')
  signup(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }
}
