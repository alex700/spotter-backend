import {Module, OnModuleInit} from '@nestjs/common';
import { CatalogController } from './catalog.controller';
import { CatalogService } from './catalog.service';
import {Product} from "./entities/product.entity";
import {Vendor} from "./entities/vendor.entity";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Product, Vendor])],
  controllers: [CatalogController],
  providers: [CatalogService]
})

export class CatalogModule {}
