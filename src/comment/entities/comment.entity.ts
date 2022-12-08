import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_comments')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'newsId', type: 'bigint', nullable: false, default: 0 })
  newsId: number;

  @Column({ name: 'userId', type: 'bigint', nullable: false, default: 0 })
  userId: number;

  @Column({ name: 'author', type: 'text', nullable: true, default: ' ' })
  author: string;

  @Column({ name: 'cover', type: 'text', nullable: true, default: ' ' })
  cover: string;

  @Column({ name: 'comment', type: 'text', nullable: true, default: ' ' })
  comment: string;
}
