import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { FavoriteProductService } from './favorite-product.service';
import { FavoriteProduct } from './entities/favorite-product.entity';
import { CreateFavoriteProductDto } from './dto/create-favorite-product.dto';

@Controller('favorite')
export class FavoriteProductController {
  constructor(
    private readonly favoriteProductService: FavoriteProductService,
  ) {}

  @Post()
  create(
    @Body() createFavoriteProductDto: CreateFavoriteProductDto,
  ): Promise<FavoriteProduct> {
    return this.favoriteProductService.create(createFavoriteProductDto);
  }

  @Get()
  findAll(): Promise<FavoriteProduct[]> {
    return this.favoriteProductService.findAll();
  }

  @Get(':productId')
  findOneByProductId(
    @Param('productId') productId: string,
  ): Promise<FavoriteProduct | null> {
    return this.favoriteProductService.findOneByProductId(productId);
  }

  @Delete(':productId')
  removeByProductId(@Param('productId') productId: string): Promise<void> {
    return this.favoriteProductService.removeByProductId(productId);
  }
}
