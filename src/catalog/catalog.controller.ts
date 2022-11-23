import {Controller, Get, Header, Query} from '@nestjs/common';
import {CatalogQueryDto} from "../common/dto/catalog-query.dto";
import { Protocol } from '../common/decorators/protocol.decorator';
import {CatalogService} from "./catalog.service";

@Controller('/')
export class CatalogController {
    constructor(
        private readonly catalogService: CatalogService,
    ) {}

    @Get()
    @Header('Content-Type','application/json')
    findAll(
        @Protocol('https') protocol: string,
        @Query() catalogQuery: CatalogQueryDto,
    ) {
        return this.catalogService.findAll(catalogQuery)
    }
}
