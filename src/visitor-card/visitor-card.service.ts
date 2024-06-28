import { Injectable } from '@nestjs/common';
import { CreateVisitorCardDto } from './dto/create-visitor-card.dto';
import { UpdateVisitorCardDto } from './dto/update-visitor-card.dto';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { VisitorCard } from './entities/visitor-card.entity';

@Injectable()
export class VisitorCardService {

  constructor(
    @InjectRepository(VisitorCard)
    private visitorCardRepository: Repository<VisitorCard>
  ) { }

  async create(createVisitorCardDto: CreateVisitorCardDto) {
    const visitorCard= new VisitorCard();
    visitorCard.token = createVisitorCardDto.token;
    visitorCard.numOnCard = createVisitorCardDto.numOnCard;
    try{
      return await this.visitorCardRepository.save(visitorCard)
    }catch(error){
      console.log('ไม่สามารถ บันทีกได้' + error);
      return error;
    }
   
  }

  findAll() {
    return `This action returns all visitorCard`;
  }

 async findFreeAll(): Promise<any> {
    const result = await this.visitorCardRepository.find({
      select: ['token', 'numOnCard','occupied'],
      where: [{ occupied: false }]
    });

    return result;
  }

 async findFreeOne(numOnCard: string) : Promise<any> {
  const result = await this.visitorCardRepository.find({
    select: [ 'token', 'numOnCard','occupied'],
    where: [{ numOnCard: numOnCard,
              occupied: false}]
  });

  return result;
  }

  findOne(id: number) {
    return `This action returns a #${id} visitorCard`;
  }

 async update(id:number, updateVisitorCardDto: UpdateVisitorCardDto) :Promise<UpdateResult> {
      return  await this.visitorCardRepository.update(id, updateVisitorCardDto);
  }

  remove(id: number) {
    return `This action removes a #${id} visitorCard`;
  }
}
