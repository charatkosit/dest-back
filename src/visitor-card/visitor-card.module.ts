import { Module } from '@nestjs/common';
import { VisitorCardService } from './visitor-card.service';
import { VisitorCardController } from './visitor-card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisitorCard } from './entities/visitor-card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VisitorCard])],
  controllers: [VisitorCardController],
  providers: [VisitorCardService],
})
export class VisitorCardModule {}
