import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Headers,
  Req,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreateDto } from './dto/Create.dto';
import { UpdateDto } from './dto/Update.dto';
import { Request } from 'express';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(
    @Headers('userId') userId: string,
    @Body() createDto: CreateDto,
    @Req() request: Request,
  ) {
    const jwtToken = request.cookies['jwt'];
    return this.postsService.create(createDto, userId, jwtToken);
  }

  @Get()
  findPage(
    @Headers('userId') userId: string,
    @Query('limit') limit: number,
    @Query('page') page: number,
    @Req() request: Request,
  ) {
    const jwtToken = request.cookies['jwt'];
    return this.postsService.findPage(userId, limit, page, jwtToken);
  }

  @Get(':id')
  findOne(
    @Headers('userId') userId: string,
    @Param('id') id: string,
    @Req() request: Request,
  ) {
    const jwtToken = request.cookies['jwt'];
    return this.postsService.findOne(id, userId, jwtToken);
  }

  @Patch(':id')
  update(
    @Headers('userId') userId: string,
    @Param('id') id: string,
    @Body() updateDto: UpdateDto,
    @Req() request: Request,
  ) {
    const jwtToken = request.cookies['jwt'];
    return this.postsService.update(id, updateDto, userId, jwtToken);
  }

  @Delete(':id')
  remove(
    @Headers('userId') userId: string,
    @Param('id') id: string,
    @Req() request: Request,
  ) {
    const jwtToken = request.cookies['jwt'];
    return this.postsService.remove(id, userId, jwtToken);
  }
}
