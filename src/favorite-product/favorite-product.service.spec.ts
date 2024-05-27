import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteProductService } from './favorite-product.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoriteProduct } from './entities/favorite-product.entity';
import { CreateFavoriteProductDto } from './dto/create-favorite-product.dto';
import { InternalServerErrorException } from '@nestjs/common';

describe('FavoriteProductService', () => {
  let service: FavoriteProductService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let repository: Repository<FavoriteProduct>;

  const mockFavoriteProductRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FavoriteProductService,
        {
          provide: getRepositoryToken(FavoriteProduct),
          useValue: mockFavoriteProductRepository,
        },
      ],
    }).compile();

    service = module.get<FavoriteProductService>(FavoriteProductService);
    repository = module.get<Repository<FavoriteProduct>>(
      getRepositoryToken(FavoriteProduct),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a favorite product', async () => {
      const createDto: CreateFavoriteProductDto = {
        productId: 'product-1',
        name: 'Test favorite product',
        description: 'favorite description',
        price: 100,
        imageUrl: 'http://images.com/image111.jpg',
        jsonData: '{"key":"value"}',
      };
      const favoriteProduct = { id: 1, ...createDto };
      mockFavoriteProductRepository.save.mockResolvedValue(favoriteProduct);

      expect(await service.create(createDto)).toEqual(favoriteProduct);
      expect(mockFavoriteProductRepository.save).toHaveBeenCalledWith(
        createDto,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of favorite products', async () => {
      const favoriteProducts = [
        {
          id: 1,
          productId: 'product-1',
          name: 'Test favorite product',
          description: 'favorite description',
          price: 100,
          imageUrl: 'http://images.com/image111.jpg',
          jsonData: '{"key":"value"}',
        },
      ];
      mockFavoriteProductRepository.find.mockResolvedValue(favoriteProducts);

      expect(await service.findAll()).toEqual(favoriteProducts);
      expect(mockFavoriteProductRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOneByProductId', () => {
    it('should return a single favorite product by productId', async () => {
      const productId = 'product-1';
      const favoriteProduct = {
        id: 1,
        productId,
        name: 'Test favorite product',
        description: 'favorite description',
        price: 100,
        imageUrl: 'http://images.com/image111.jpg',
        jsonData: '{"key":"value"}',
      };
      mockFavoriteProductRepository.findOne.mockResolvedValue(favoriteProduct);

      expect(await service.findOneByProductId(productId)).toEqual(
        favoriteProduct,
      );
      expect(mockFavoriteProductRepository.findOne).toHaveBeenCalledWith({
        where: { productId },
      });
    });

    it('should throw an InternalServerErrorException on error', async () => {
      const productId = 'product-1';
      mockFavoriteProductRepository.findOne.mockRejectedValue(new Error());

      await expect(service.findOneByProductId(productId)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('removeByProductId', () => {
    it('should remove a favorite product by productId', async () => {
      const productId = 'product-1';
      mockFavoriteProductRepository.delete.mockResolvedValue({});

      await service.removeByProductId(productId);
      expect(mockFavoriteProductRepository.delete).toHaveBeenCalledWith({
        productId,
      });
    });
  });
});
