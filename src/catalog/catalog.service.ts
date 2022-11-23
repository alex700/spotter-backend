import {Injectable, OnModuleInit} from '@nestjs/common';
import {Product} from "./entities/product.entity";
import {Like, Repository} from "typeorm";
import {Vendor} from "./entities/vendor.entity";
import { InjectRepository } from '@nestjs/typeorm';
import {CatalogQueryDto} from "../common/dto/catalog-query.dto";
import {CreateProductDto} from "./dto/create-product.dto";
import products from "./data/demo-catalog.json";

@Injectable()
export class CatalogService  implements OnModuleInit {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(Vendor)
        private readonly vendorRepository: Repository<Vendor>,
    ) {}

    findAll(catalogQuery: CatalogQueryDto) {
        const { limit, offset, filters } = catalogQuery;

        let filterCriteria = {
                select: {
                    id: true,
                    title: true,
                    price: true,
                    stricken_price: true,
                    image: true,
                    vendor: {title: true}
                },
                relations: ['vendor'],
                skip: offset || 0, // default offset
                take: limit || 12, // default limit
                where: {}
            }
        if (filters) {
            filterCriteria.where = [
                {title: Like(`%${filters}%`)},
                {vendor: Like(`%${filters}%`)}
            ];
        }

        return this.productRepository.find(filterCriteria);
    }

    async create(createProductDto: CreateProductDto) {
        const vendor = await this.preloadVendorByTitle(createProductDto.vendor);

        const product = this.productRepository.create(
            {...createProductDto, vendor}
        );
        return this.productRepository.save(product);
    }

    private async preloadVendorByTitle(title: string): Promise<Vendor> {
        const existingVendor = await this.vendorRepository.findOneBy({ title });
        if (existingVendor) {
            return existingVendor;
        }
        return this.vendorRepository.create({ title });
    }

    /**
     * Load catalog demo data
     */
    onModuleInit() {
        console.log(`Init seeds...`);
        products.forEach((data) => {
            this.create({
                title: data.title,
                price: data.price,
                stricken_price: data.stricken_price,
                image: data.image,
                vendor: data.vendor
            })
        })
    }
}
