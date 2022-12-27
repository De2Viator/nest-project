import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { NewsEntity } from '../../news/entities/news.entity';
import { UserEntity } from '../../user/entities/user.entity';

@Entity('tbl_comments')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'newsId', type: 'bigint', nullable: false, default: 0 })
  newsId: number;

  @Column({ name: 'userId', type: 'bigint', nullable: false, default: 0 })
  userId: number;

  @Column({ name: 'comment', type: 'text', nullable: true, default: ' ' })
  comment: string;

  @ManyToOne(() => NewsEntity, (news) => news.comments, {
    createForeignKeyConstraints: false,
  })
  news: NewsEntity;

  @ManyToOne(() => UserEntity, (user) => user.comments, {
    createForeignKeyConstraints: false,
  })
  user: UserEntity;
}
