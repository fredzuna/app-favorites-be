import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoriteProduct } from './entities/favorite-product.entity';
import { Repository } from 'typeorm';
import { CreateFavoriteProductDto } from './dto/create-favorite-product.dto';

@Injectable()
export class FavoriteProductService {
  constructor(
    @InjectRepository(FavoriteProduct)
    private favoriteProductRepository: Repository<FavoriteProduct>,
  ) {}

  create(favoriteProduct: CreateFavoriteProductDto): Promise<FavoriteProduct> {
    return this.favoriteProductRepository.save(favoriteProduct);
  }

  findAll(): Promise<FavoriteProduct[]> {
    return this.favoriteProductRepository.find();
  }

  async findOneByProductId(productId: string): Promise<FavoriteProduct | null> {
    try {
      const favoriteProduct = await this.favoriteProductRepository.findOne({
        where: { productId },
      });

      return favoriteProduct;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to retrieve favorite product',
      );
    }
  }

  async removeByProductId(productId: string): Promise<void> {
    await this.favoriteProductRepository.delete({ productId });
  }
}
