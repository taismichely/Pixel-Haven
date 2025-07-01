import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tb_products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  name: string;

  @IsNotEmpty()
  @Column({ length: 1000, nullable: false })
  description: string;

  @IsNumber()
  @Min(0)
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @IsNumber()
  @Min(0)
  @Column({ type: 'bigint', nullable: false })
  quantity: number;
}
