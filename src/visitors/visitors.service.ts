import { Injectable } from '@nestjs/common';
import { CreateVisitorDto } from './dto/create-visitor.dto';
import { UpdateVisitorDto } from './dto/update-visitor.dto';
import { Visitor } from './entities/visitor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, DeleteResult, Like, Repository, UpdateResult } from 'typeorm';
import { timestamp } from 'rxjs';

@Injectable()
export class VisitorsService {

  constructor(
    @InjectRepository(Visitor)
    private visitorRepository: Repository<Visitor>

  ) { }



  async create(createVisitorDto: CreateVisitorDto) {
    const visitor = new Visitor();
    visitor.firstName = createVisitorDto.firstName;
    visitor.lastName = createVisitorDto.lastName;
    visitor.address = createVisitorDto.address;
    visitor.phone = createVisitorDto.phone;
    visitor.idCard = createVisitorDto.idCard;
    visitor.bussiness = createVisitorDto.bussiness;
    visitor.token = createVisitorDto.token;
    visitor.destFloor = createVisitorDto.destFloor;
    visitor.photoIDcard = createVisitorDto.photoIDcard;
    visitor.photoWebCam = createVisitorDto.photoWebCam;
    visitor.checkIn = new Date();
    visitor.checkOut = null;

    return await this.visitorRepository.save(visitor)
  }

  async findAll() : Promise<Visitor[]>{
    return await this.visitorRepository.find({
      select: ['id','firstName', 'lastName', 'phone', 'idCard', 'token', 'destFloor','callAttribute', 'checkIn', 'checkOut'],
      order: { id: 'DESC' }
    })
  }

  async findAllToday() : Promise<Visitor[]>{
    return await this.visitorRepository.find({
      select: ['id','firstName', 'lastName', 'phone', 'idCard', 'token', 'destFloor','callAttribute', 'checkIn', 'checkOut'],
      where: { checkIn: Between(new Date(new Date().toISOString().slice(0,10) + ' 00:00:00'), new Date(new Date().toISOString().slice(0,10) + ' 23:59:59'))},
      order: { id: 'DESC' }
    })
  }

  async findOne(id: number): Promise<Visitor[]> {
    return await this.visitorRepository.find({
      select: ['id','firstName', 'lastName', 'phone', 'idCard', 'token', 'destFloor','callAttribute', 'checkIn', 'checkOut'],
      where: [{ id: id }]
    })
  }

  async findByToken(token: string): Promise<any> {
    const result = await this.visitorRepository.find({
      select: ['id','firstName', 'lastName', 'phone', 'idCard', 'token', 'destFloor','callAttribute', 'checkIn', 'checkOut'],
      where: [{ token: token }]
    });
 
    return result;
  }

  async findByTokenToday(token: string): Promise<any> {
   // ค้นหาข้อมูลวันนี้ โดยดูเฉพาะวันที่ checkIn ที่ตรงกับวันนี้ และ token ที่ตรงกับที่ส่งมา
    const today = new Date();
    const result = await this.visitorRepository.find({
      select: ['id','firstName', 'lastName', 'phone', 'idCard', 'token', 'destFloor','callAttribute', 'checkIn', 'checkOut'],
      where: { token: token, checkIn: Between(new Date(today.toISOString().slice(0,10) + ' 00:00:00'), new Date(today.toISOString().slice(0,10) + ' 23:59:59'))}
    });
     return result;
  }


  async update(id: number, updateVisitorDto: UpdateVisitorDto) :Promise<UpdateResult>{
    return await this.visitorRepository.update(id,updateVisitorDto) 
  }

  async checkout(id: number) :Promise<UpdateResult>{
    return await this.visitorRepository.update(id,{checkOut: new Date()})
  }

  async remove(id: number) :Promise<DeleteResult> {
    return await this.visitorRepository.delete(id);
  }

  async countToday() :Promise<number> {
    return await this.visitorRepository.count({
      where: { checkIn: Between(new Date(new Date().toISOString().slice(0,10) + ' 00:00:00'), new Date(new Date().toISOString().slice(0,10) + ' 23:59:59'))}
    });
  }

  async checkOut(id: number) :Promise<UpdateResult>{
    return await this.visitorRepository.update(id,{checkOut: new Date()})
  } 
}
