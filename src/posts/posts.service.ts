import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateDto } from './dto/Create.dto';
import { UpdateDto } from './dto/Update.dto';
import { PostEntity } from './entities/post.entity';
import { UsersService } from '../users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
  ) {}
  async create(createDto: CreateDto, userId: string, jwtString: string) {
    if (!this.authService.isLogined(userId, jwtString)) {
      throw new UnauthorizedException('로그인되어 있지 않습니다.');
    }
    const newPost = new PostEntity();
    newPost.title = createDto.title;
    newPost.content = createDto.content;
    newPost.writer = await this.usersService.findOne(userId);
    newPost.createdAt = new Date();
    await this.postRepository.save(newPost);
    delete newPost.writer;
    newPost['isMine'] = true;
    return newPost;
  }

  async findPage(
    userId: string,
    limit: number,
    page: number,
    jwtToken: string,
  ) {
    if (page < 1) {
      throw new BadRequestException('page must greater then 0');
    }
    const offset = (page - 1) * limit;
    const posts: PostEntity[] = await this.postRepository.find({
      skip: offset,
      take: limit,
      order: {
        createdAt: 'DESC',
      },
      relations: ['writer'],
    });

    posts.forEach((post) => {
      post['isMine'] = post.writer.id === userId;
      delete post.writer;
    });

    return posts;
  }

  async findOne(id: string, userId: string, jwtString: string) {
    const post = await this.postRepository.findOne({
      where: { id: id },
      relations: ['writer'],
    });
    if (!post) {
      throw new NotFoundException('존재하지 않는 게시물입니다.');
    }
    if (
      post.writer.id !== userId ||
      !this.authService.isLogined(userId, jwtString)
    ) {
      throw new UnauthorizedException('권한이 없습니다.');
    }
    delete post.writer.posts;
    delete post.writer.password;
    delete post.writer.email;
    return post;
  }

  async update(
    id: string,
    updateDto: UpdateDto,
    userId: string,
    jwtString: string,
  ) {
    const post = await this.findOne(id, userId, jwtString);
    post.title = updateDto.title;
    post.content = updateDto.content;
    await this.postRepository.save(post);
    return post;
  }

  async remove(id: string, userId: string, jwtString: string) {
    const post = await this.findOne(id, userId, jwtString);
    await this.postRepository.remove(post);
  }
}
