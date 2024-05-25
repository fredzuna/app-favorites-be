import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { FavoriteProductService } from './favorite-product.service';
import { FavoriteProduct } from './entities/favorite-product.entity';

@Controller('favorite-products')
export class FavoriteProductController {
  constructor(
    private readonly favoriteProductService: FavoriteProductService,
  ) {}

  @Post()
  create(
    @Body() createFavoriteProductDto: FavoriteProduct,
  ): Promise<FavoriteProduct> {
    return this.favoriteProductService.create(createFavoriteProductDto);
  }

  @Get()
  findAll(): Promise<FavoriteProduct[]> {
    return this.favoriteProductService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<FavoriteProduct> {
    return this.favoriteProductService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateFavoriteProductDto: Partial<FavoriteProduct>,
  ): Promise<FavoriteProduct> {
    return this.favoriteProductService.update(id, updateFavoriteProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.favoriteProductService.remove(id);
  }
}
