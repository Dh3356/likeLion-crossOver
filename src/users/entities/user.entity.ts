import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { PostEntity } from '../../posts/entities/post.entity';

//User Table
@Entity('User')
export class UserEntity {
  @PrimaryColumn()
  id: string; //id

  @Column()
  password: string; //password

  @Column()
  email: string; //email

  @OneToMany((type) => PostEntity, (post) => post.writer)
  posts: PostEntity[]; //작성 post 목록
}
