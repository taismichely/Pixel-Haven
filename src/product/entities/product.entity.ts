import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../../category/entities/category.entity';

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

  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  brand: string;

  @IsNumber()
  @Min(0)
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @IsNumber()
  @Min(0)
  @Column({ type: 'bigint', nullable: false })
  quantity: number;

  @ManyToOne(() => Category, (category) => category.porduct, {
    onDelete: 'CASCADE',
  })
  category: Category;
}
