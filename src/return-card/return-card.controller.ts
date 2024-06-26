import { Body, Controller, Post } from '@nestjs/common';
import { InputAcmDto } from 'src/acm/dto/input-acm.dto';
import { VisitorsService } from 'src/visitors/visitors.service';
import { ReturnCardService } from './return-card.service';
import { UpdateVisitorDto } from 'src/visitors/dto/update-visitor.dto';
import { UpdateOfficerDto } from 'src/officers/dto/update-officer.dto';


@Controller('return-card')
export class ReturnCardController {

    constructor(private visitor: VisitorsService){}

    @Post('visitor')
    async visitorReturnCard(@Body() inputAcmDto: InputAcmDto) {

        try{
            const visitor =   await this.visitor.findByToken(inputAcmDto.token);
            console.log('Visitor', visitor)
            if(visitor){
                await this.visitor.checkOut(visitor[0].id)
                return `บัตร Visitor ${visitor[0].firstName}  ถูกคืน`;
            } 
        } catch (error) {
            return 'บัตรไม่ลงทะเบียน ถูกคืน';
        }
    }

    @Post('exit')
    async officerExit(@Body() inputAcmDto: InputAcmDto) {
        console.log('Exit', inputAcmDto)
        return inputAcmDto
    }

}
