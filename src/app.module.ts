import { Module } from '@nestjs/common';
import { CatalogModule } from './catalog/catalog.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CommonModule} from "./common/common.module";

@Module({
  imports: [
      CatalogModule,
      TypeOrmModule.forRoot({
        type: 'sqlite',
        database: ':memory:',
        dropSchema: true,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: true,
        migrations: ["dist/migrations/*{.ts,.js}", "./migrations/*{.ts,.js}"]
      }),
      CommonModule
  ],
})
export class AppModule {}
