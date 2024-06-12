import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OfficersService } from './officers.service';
import { CreateOfficerDto } from './dto/create-officer.dto';
import { UpdateOfficerDto } from './dto/update-officer.dto';

@Controller('officers')
export class OfficersController {
  constructor(private readonly officersService: OfficersService) {}

  @Post()
  create(@Body() createOfficerDto: CreateOfficerDto) {
    return this.officersService.create(createOfficerDto);
  }

  @Get('count')
  count(){
    return this.officersService.count();
  } 

  @Get()
  findAll() {
    return this.officersService.findAll();
  
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log(`id: ${id} findOne: ${this.officersService.findOne(+id)}`);
    return this.officersService.findOne(+id);
  }



  @Patch('editOfficer/:id')
  update(@Param('id') id: string, @Body() updateOfficerDto: UpdateOfficerDto) {
    console.log(`id: ${id} updateOfficerDto: ${updateOfficerDto}`);
    return this.officersService.update(+id, updateOfficerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.officersService.remove(+id);
  }
}
