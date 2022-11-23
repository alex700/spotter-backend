import {
    Column,
    Entity,
    JoinTable,
    JoinColumn,
    ManyToMany, ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Vendor } from './vendor.entity';


@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column('decimal', { nullable: true, precision: 7, scale: 4 })
    price: string;

    @Column('decimal', { nullable: true, precision: 7, scale: 4 })
    stricken_price: string;

    @Column({ nullable: true })
    image: string;

    @ManyToOne((type) => Vendor, {
        cascade: true,
    })
    @JoinColumn({ name: "vendor" })
    vendor: Vendor;
}
