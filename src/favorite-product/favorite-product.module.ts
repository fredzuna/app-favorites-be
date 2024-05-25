import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteProductService } from './favorite-product.service';
import { FavoriteProductController } from './favorite-product.controller';
import { FavoriteProduct } from './entities/favorite-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FavoriteProduct])],
  controllers: [FavoriteProductController],
  providers: [FavoriteProductService],
})
export class FavoriteProductModule {}
