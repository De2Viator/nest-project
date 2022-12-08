import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'author', type: 'text', nullable: false, default: '' })
  lastName: string;

  @Column({ name: 'firstName', type: 'text', nullable: false, default: '' })
  firstName: number;
}
