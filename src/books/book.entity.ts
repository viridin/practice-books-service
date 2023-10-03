import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Book {
  @ApiProperty({ description: "Book identifier", nullable: false })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: "Title of book", nullable: true })
  @Column()
  title: string;

  @ApiProperty({ description: "Book author", nullable: true })
  @Column()
  author: string;

  @ApiProperty({ description: "Year book was writed", nullable: true })
  @Column()
  year: number;
}