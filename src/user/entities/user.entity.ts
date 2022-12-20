import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { NewsEntity } from '../../news/entities/news.entity';
import { CommentEntity } from '../../comment/entities/comment.entity';
import { Roles } from '../models/user.dto';

@Entity('tbl_users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'password',
    type: 'text',
    nullable: false,
    default: '',
  })
  password: string;

  @Column({
    name: 'email',
    type: 'text',
    nullable: false,
    default: '',
  })
  email: string;

  @Column({ name: 'lastName', type: 'text', nullable: true, default: '' })
  lastName: string;

  @Column({ name: 'firstName', type: 'text', nullable: true, default: '' })
  firstName: string;

  @Column({ name: 'image', type: 'text', nullable: true, default: '' })
  image: string;

  @Column({ name: 'role', type: 'text', nullable: false, default: 'user' })
  role: Roles;

  @OneToMany(() => NewsEntity, (news) => news.user)
  news: NewsEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.user)
  comments: CommentEntity[];
}
