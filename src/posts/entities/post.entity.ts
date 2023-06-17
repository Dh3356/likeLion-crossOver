import {Column, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {UserEntity} from '../../users/entities/user.entity';

//Post Table
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string; //id

  @ManyToOne(() => UserEntity, (user) => user.posts)
  writer: UserEntity; //작성자(user)

  @Column()
  title: string; //제목

  @Column()
  content: string; //내용

  @Column({ type: 'timestamp' })
  createdAt: Date; //작성 일시
}
