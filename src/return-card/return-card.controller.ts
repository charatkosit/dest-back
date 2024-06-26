import { Body, Controller, Post } from '@nestjs/common';
import { InputAcmDto } from 'src/acm/dto/input-acm.dto';
import { VisitorsService } from 'src/visitors/visitors.service';
import { ReturnCardService } from './return-card.service';



@Controller('return-card')
export class ReturnCardController {

    constructor(private visitor: VisitorsService,
        private returnCard: ReturnCardService
    ){}

    @Post('visitor')
    async visitorReturnCard(@Body() inputAcmDto: InputAcmDto) {

        try{
            const visitor =   await this.visitor.findByTokenToday(inputAcmDto.token);
            console.log('Visitor', visitor)
            if(visitor){
                await this.visitor.checkOut(visitor[0].id)
                this.returnCard.sendNotification(`บัตร Visitor ${visitor[0].firstName}  ถูกคืน`);
                return `บัตร Visitor ${visitor[0].firstName}  ถูกคืนที่ DeviceNum: ${inputAcmDto.deviceNum}`;
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
