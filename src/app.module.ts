import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteProductModule } from './favorite-product/favorite-product.module';
import { FavoriteProduct } from './favorite-product/entities/favorite-product.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [FavoriteProduct],
      synchronize: true,
    }),
    FavoriteProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
