import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/Login.dto';
import { SignUpDto } from './dto/SignUp.dto';
import { CreateDto } from '../users/dto/Create.dto';
import * as jwt from 'jsonwebtoken';
import authConfig from '../config/authConfig';
import { ConfigType } from '@nestjs/config';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    @Inject(authConfig.KEY) private config: ConfigType<typeof authConfig>,
  ) {}

  async login(loginDto: LoginDto, response: Response) {
    const userData = await this.usersService.findOne(loginDto.id);
    if (!userData || userData.password !== loginDto.password) {
      throw new UnauthorizedException(
        !userData
          ? '존재하지 않는 사용자입니다.'
          : '비밀번호가 일치하지 않습니다.',
      );
    }

    const payload = loginDto;
    const sign = jwt.sign(payload, this.config.JWT_SECRET, {
      expiresIn: '1d',
      audience: 'example.com',
      issuer: 'example.com',
    });
    response.setHeader('Authorization', 'Bearer ' + sign);
    response.cookie('jwt', sign, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, //1 day
    });
    return response.send({
      message: 'login',
    });
  }

  logout(userId: string, response: Response) {
    response.cookie('jwt', '', {
      maxAge: 0,
    });
    return response.send({
      message: 'logout',
    });
  }

  isLogined(id: string, jwtString: string) {
    try {
      const payload = jwt.verify(jwtString, this.config.JWT_SECRET) as (
        | jwt.JwtPayload
        | string
      ) & { userId: string; userPw: string };
      const { userId } = payload;
      if (id !== userId) {
        return false;
      }

      return true;
    } catch (e) {
      throw new ConflictException(e.stack);
    }
  }

  async signUp(signUpDto: SignUpDto) {
    const newUser: CreateDto = new CreateDto();
    newUser.id = signUpDto.id;
    newUser.password = signUpDto.password;
    newUser.email = signUpDto.email;
    await this.usersService.create(newUser);
  }
}
