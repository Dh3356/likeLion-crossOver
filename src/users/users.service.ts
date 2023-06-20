import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateDto } from './dto/Create.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(creteDto: CreateDto) {
    if (await this.findOne(creteDto.id)) {
      throw new ConflictException('이미 존재하는 ID 입니다.');
    }
    const newUser: UserEntity = new UserEntity();
    newUser.id = creteDto.id;
    newUser.password = creteDto.password;
    newUser.email = creteDto.email;
    newUser.posts = null;
    return await this.usersRepository.save(newUser);
  }

  async findOne(userId: string) {
    return await this.usersRepository.findOne({
      where: { id: userId },
    });
  }
}
