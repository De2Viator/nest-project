import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommentEntity } from '../../comment/entities/comment.entity';
import { UserEntity } from '../../user/entities/user.entity';

@Entity('tbl_news')
export class NewsEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'author', type: 'text', nullable: true, default: ' ' })
  author: string;

  @Column({ name: 'authorId', type: 'bigint', nullable: false, default: 0 })
  authorId: number;

  @Column({ name: 'title', type: 'text', nullable: true, default: 'Заголовок' })
  title: string;

  @Column({
    name: 'description',
    type: 'text',
    nullable: true,
    default: 'Заголовок',
  })
  description: string;

  @Column({
    name: 'cover',
    type: 'text',
    nullable: true,
    default: '',
  })
  cover: string;

  @Column({
    name: 'views',
    type: 'bigint',
    nullable: false,
    default: 0,
  })
  views: number;

  @OneToMany(() => CommentEntity, (comment) => comment.news)
  comments: CommentEntity[];

  @ManyToOne(() => UserEntity, (user) => user.news)
  user: UserEntity;
}
