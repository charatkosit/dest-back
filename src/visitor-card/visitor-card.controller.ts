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

  @Patch('update/:token')
  update(@Param('token') token, @Body() updateVisitorCardDto: UpdateVisitorCardDto) {
    console.log(`token: ${token} updateVisitorCardDto: ${updateVisitorCardDto}`);
    return this.visitorCardService.update(token, updateVisitorCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.visitorCardService.remove(+id);
  }
}
