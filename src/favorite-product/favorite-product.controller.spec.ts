import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteProductController } from './favorite-product.controller';
import { FavoriteProductService } from './favorite-product.service';
import { CreateFavoriteProductDto } from './dto/create-favorite-product.dto';
import { FavoriteProduct } from './entities/favorite-product.entity';

describe('FavoriteProductController', () => {
  let controller: FavoriteProductController;
  let service: FavoriteProductService;

  const mockFavoriteProductService = {
    create: jest.fn((dto: CreateFavoriteProductDto) => {
      return Promise.resolve({
        id: Date.now(),
        ...dto,
      } as FavoriteProduct);
    }),
    findAll: jest.fn(() =>
      Promise.resolve([
        {
          id: 1,
          productId: 'product1',
          name: 'favorite Product',
          description: 'Test Description',
          price: 100,
          imageUrl: 'http://images.com/image.jpg',
          jsonData: '{"key":"value"}',
        },
      ]),
    ),
    findOneByProductId: jest.fn((productId: string) => {
      return Promise.resolve({
        id: 1,
        productId,
        name: 'favorite Product',
        description: 'Test Description',
        price: 100,
        imageUrl: 'http://images.com/image.jpg',
        jsonData: '{"key":"value"}',
      } as FavoriteProduct);
    }),
    removeByProductId: jest.fn((productId: string) => Promise.resolve()),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavoriteProductController],
      providers: [
        {
          provide: FavoriteProductService,
          useValue: mockFavoriteProductService,
        },
      ],
    }).compile();

    controller = module.get<FavoriteProductController>(
      FavoriteProductController,
    );
    service = module.get<FavoriteProductService>(FavoriteProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a favorite product', async () => {
      const dto: CreateFavoriteProductDto = {
        productId: 'product1',
        name: 'favorite Product',
        description: 'Test Description',
        price: 100,
        imageUrl: 'http://images.com/image.jpg',
        jsonData: '{"key":"value"}',
      };
      expect(await controller.create(dto)).toEqual({
        id: expect.any(Number),
        ...dto,
      });
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of favorite products', async () => {
      expect(await controller.findAll()).toEqual([
        {
          id: 1,
          productId: 'product1',
          name: 'favorite Product',
          description: 'Test Description',
          price: 100,
          imageUrl: 'http://images.com/image.jpg',
          jsonData: '{"key":"value"}',
        },
      ]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOneByProductId', () => {
    it('should return a single favorite product by productId', async () => {
      const productId = 'product1';
      expect(await controller.findOneByProductId(productId)).toEqual({
        id: 1,
        productId,
        name: 'favorite Product',
        description: 'Test Description',
        price: 100,
        imageUrl: 'http://images.com/image.jpg',
        jsonData: '{"key":"value"}',
      });
      expect(service.findOneByProductId).toHaveBeenCalledWith(productId);
    });
  });

  describe('removeByProductId', () => {
    it('should remove a favorite product by productId', async () => {
      const productId = 'product1';
      await controller.removeByProductId(productId);
      expect(service.removeByProductId).toHaveBeenCalledWith(productId);
    });
  });
});
