import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MitsuModule } from './mitsu/mitsu.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisitorsModule } from './visitors/visitors.module';
import { Visitor } from './visitors/entities/visitor.entity';
import { AcmModule } from './acm/acm.module';
import { OfficersModule } from './officers/officers.module';
import { Officer } from './officers/entities/officer.entity';
import { ConfigModule } from '@nestjs/config';
import { ReturnCardController } from './return-card/return-card.controller';
import { ReturnCardModule } from './return-card/return-card.module';
import { VisitorsService } from './visitors/visitors.service';
import { VisitorCardModule } from './visitor-card/visitor-card.module';
import { VisitorCard } from './visitor-card/entities/visitor-card.entity';


@Module({
  imports: [
    ConfigModule.forRoot(),   
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_IP,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DB_NAME,
      entities: [Visitor,Officer,VisitorCard],
      synchronize: true,
    }),
    MitsuModule,
    VisitorsModule,
    OfficersModule,
    AcmModule,
    OfficersModule,
    ReturnCardModule,
    VisitorCardModule],
  controllers: [AppController, ReturnCardController],
  providers: [
  
      AppService],
})
export class AppModule {}
