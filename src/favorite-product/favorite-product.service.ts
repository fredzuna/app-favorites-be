import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoriteProduct } from './entities/favorite-product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FavoriteProductService {
  constructor(
    @InjectRepository(FavoriteProduct)
    private favoriteProductRepository: Repository<FavoriteProduct>,
  ) {}

  create(favoriteProduct: FavoriteProduct): Promise<FavoriteProduct> {
    return this.favoriteProductRepository.save(favoriteProduct);
  }

  findAll(): Promise<FavoriteProduct[]> {
    return this.favoriteProductRepository.find();
  }

  findOne(id: number): Promise<FavoriteProduct> {
    return this.favoriteProductRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateFavoriteProductDto: Partial<FavoriteProduct>,
  ): Promise<FavoriteProduct> {
    await this.favoriteProductRepository.update(id, updateFavoriteProductDto);
    return this.favoriteProductRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.favoriteProductRepository.delete(id);
  }
}
