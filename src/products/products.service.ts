import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepo: Repository<ProductEntity>,
  ) {}

  async createProduct(data: any) {
    const product = await this.productRepo.create(data);
    await this.productRepo.save(product);
    return product;
  }

  async findAll() {
    const products = await this.productRepo.find();

    return products;
  }

  async findProduct(id: number) {
    const product = await this.productRepo.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async updateProduct(id: number, data: any) {
    const product = await this.findProduct(id);

    if (!product) {
      throw new NotFoundException(
        `Failed to update product. product with id ${id} not found`,
      );
    }

    await this.productRepo.update({ id }, data);
  }

  async deleteProduct(id: number) {
    const product = await this.findProduct(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    await product.remove();
  }
}
