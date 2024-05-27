import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FavoriteProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  imageUrl: string;

  @Column({ type: 'text' })
  jsonData: string;
}
