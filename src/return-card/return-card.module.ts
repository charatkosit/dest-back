import { Module } from '@nestjs/common';
import { ReturnCardService } from './return-card.service';
import { ReturnCardController } from './return-card.controller';
import { Visitor } from 'src/visitors/entities/visitor.entity';
import { VisitorsService } from 'src/visitors/visitors.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { VisitorsModule } from 'src/visitors/visitors.module';

@Module({
  imports: [VisitorsModule,
            HttpModule,
],
  providers: [ReturnCardService, VisitorsService],
  controllers: [ReturnCardController],
  exports: [ReturnCardService]

})
export class ReturnCardModule { }
