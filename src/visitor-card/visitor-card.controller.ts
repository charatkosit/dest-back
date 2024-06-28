import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VisitorCardService } from './visitor-card.service';
import { CreateVisitorCardDto } from './dto/create-visitor-card.dto';
import { UpdateVisitorCardDto } from './dto/update-visitor-card.dto';

@Controller('visitorCard')
export class VisitorCardController {
  constructor(private readonly visitorCardService: VisitorCardService) {}

  @Post('create')
  create(@Body() createVisitorCardDto: CreateVisitorCardDto) {
    return this.visitorCardService.create(createVisitorCardDto);
  }

  @Get('findFreeAll')
  findAll() {
    return this.visitorCardService.findAll();
  }

  @Get('findToken/:id')
  findTokenOne(@Param('id') id: string) {
    return this.visitorCardService.findTokenOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateVisitorCardDto: UpdateVisitorCardDto) {
    console.log(`id: ${id} updateVisitorCardDto: ${updateVisitorCardDto}`);
    return this.visitorCardService.update(+id, updateVisitorCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.visitorCardService.remove(+id);
  }
}
