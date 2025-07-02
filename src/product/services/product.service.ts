import { Product } from './../entities/product.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({
      relations: {
        category: true,
      },
    });
  }
  async findById(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: {
        id,
      },
      relations: {
        category: true,
      }
    });
    if (!product) {
      throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);
    }
    return product;
  }
  async findByName(name: string): Promise<Product[]> {
    return await this.productRepository.find({
      where: {
        name: ILike(`%${name}%`),
      },
      relations: {
        category: true,
      },
    });
  }

  //CRUD

  async create(product: Product): Promise<Product> {
    return await this.productRepository.save(product);
  }

  async update(product: Product): Promise<Product> {
    await this.findById(product.id);
    return await this.productRepository.save(product);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);
    return await this.productRepository.delete(id);
  }
}
