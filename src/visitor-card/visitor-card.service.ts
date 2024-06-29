import { Injectable, NotFoundException } from '@nestjs/common';
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
    const visitorCard = new VisitorCard();
    visitorCard.token = createVisitorCardDto.token;
    visitorCard.numOnCard = createVisitorCardDto.numOnCard;
    try {
      return await this.visitorCardRepository.save(visitorCard)
    } catch (error) {
      console.log('ไม่สามารถ บันทีกได้' + error);
      return error;
    }

  }

  findAll() {
    return `This action returns all visitorCard`;
  }

  async findFreeAll(): Promise<any> {
    const result = await this.visitorCardRepository.find({
      select: ['token', 'numOnCard', 'occupied'],
      where: [{ occupied: false }]
    });

    return result;
  }

  async findTokenOne(numOnCard: string): Promise<any> {
    const result = await this.visitorCardRepository.find({
      select: ['token', 'numOnCard', 'occupied'],
      where: [{ numOnCard: numOnCard }]
    });

    return result;
  }

  async findOne(numOnCard: string) : Promise<VisitorCard>{
    return await this.visitorCardRepository.findOneBy( { numOnCard } );
  }

  async update(token: string, updateVisitorCardDto: UpdateVisitorCardDto): Promise<UpdateResult> {
    console.log(`token on Service: ${token}`);
    return await this.visitorCardRepository.update({token}, updateVisitorCardDto);
  }

  remove(id: number) {
    return `This action removes a #${id} visitorCard`;
  }
}
