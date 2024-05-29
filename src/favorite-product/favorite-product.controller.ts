import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FavoriteProductService } from './favorite-product.service';
import { FavoriteProduct } from './entities/favorite-product.entity';
import { CreateFavoriteProductDto } from './dto/create-favorite-product.dto';

@Controller('favorite')
export class FavoriteProductController {
  constructor(
    private readonly favoriteProductService: FavoriteProductService,
  ) {}

  @Post()
  async create(
    @Body() createFavoriteProductDto: CreateFavoriteProductDto,
  ): Promise<FavoriteProduct> {
    try {
      return await this.favoriteProductService.create(createFavoriteProductDto);
    } catch (error) {
      throw new HttpException(
        'Error creating favorite product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll(): Promise<FavoriteProduct[]> {
    try {
      return await this.favoriteProductService.findAll();
    } catch (error) {
      throw new HttpException(
        'Error fetching favorite products',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':productId')
  async findOneByProductId(
    @Param('productId') productId: string,
  ): Promise<FavoriteProduct | null> {
    try {
      const product =
        await this.favoriteProductService.findOneByProductId(productId);
      return product;
    } catch (error) {
      throw new HttpException(
        'Error fetching favorite product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':productId')
  async removeByProductId(
    @Param('productId') productId: string,
  ): Promise<void> {
    try {
      await this.favoriteProductService.removeByProductId(productId);
    } catch (error) {
      throw new HttpException(
        'Error removing favorite product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
