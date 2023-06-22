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
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreateDto } from './dto/Create.dto';
import { UpdateDto } from './dto/Update.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Headers() headers: any, @Body() createDto: CreateDto) {
    const jwtString = headers.authorization.split('Bearer ')[1];
    return this.postsService.create(createDto, headers.userid, jwtString);
  }

  @Get()
  findPage(@Query('limit') limit: number, @Query('page') page: number) {
    return this.postsService.findPage(limit, page);
  }

  @Get(':id')
  findOne(@Headers() headers: any, @Param('id') id: string) {
    const jwtString = headers.authorization.split('Bearer ')[1];
    return this.postsService.findOne(id, headers.userid, jwtString);
  }

  @Patch(':id')
  update(
    @Headers() headers: any,
    @Param('id') id: string,
    @Body() updateDto: UpdateDto,
  ) {
    const jwtString = headers.authorization.split('Bearer ')[1];
    return this.postsService.update(id, updateDto, headers.userid, jwtString);
  }

  @Delete(':id')
  remove(@Headers() headers: any, @Param('id') id: string) {
    const jwtString = headers.authorization.split('Bearer ')[1];
    return this.postsService.remove(id, headers.userid, jwtString);
  }
}
