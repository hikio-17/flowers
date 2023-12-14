import { Column, Entity } from 'typeorm';
import { AbstractEntity } from './abstract-entity';

@Entity('products')
export class ProductEntity extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  category: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  image: string;
}
