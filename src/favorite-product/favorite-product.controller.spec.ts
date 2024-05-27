import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteProductController } from './favorite-product.controller';
import { FavoriteProductService } from './favorite-product.service';

describe('FavoriteProductController', () => {
  let controller: FavoriteProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavoriteProductController],
      providers: [FavoriteProductService],
    }).compile();

    controller = module.get<FavoriteProductController>(
      FavoriteProductController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
