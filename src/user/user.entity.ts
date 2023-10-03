// user.entity.ts
import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class BookUser {
  @ApiProperty({ description: "User identifier", nullable: false })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: "Name of user", nullable: false })
  @Column()
  username: string;

  @ApiProperty({ description: "User`s password", nullable: false })
  @Column()
  password: string;
}
