import {Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Vendor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;
}