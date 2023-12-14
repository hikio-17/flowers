import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get()
  async findAll() {
    const products = await this.productService.findAll();

    return {
      data: {
        products,
      },
    };
  }

  @Get(':id')
  async findProduct(@Param('id') id: number) {
    const product = await this.productService.findProduct(id);

    return {
      data: {
        product,
      },
    };
  }

  @UseGuards(AuthGuard)
  @Post()
  async createProduct(@Body() data: any) {
    const product = await this.productService.createProduct(data);

    return product;
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async updateProduct(@Param('id') id: number, @Body() data: any) {
    const product = await this.productService.updateProduct(id, data);

    return {
      status: 'success',
      message: `Product with id ${id} successfully updated`,
      data: {
        product,
      },
    };
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteProduct(@Param('id') id: number) {
    await this.productService.deleteProduct(id);

    return {
      status: 'success',
      message: `Product with id ${id} is successfully deleted`,
    };
  }
}
