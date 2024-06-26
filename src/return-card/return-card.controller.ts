import { Body, Controller, Post } from '@nestjs/common';
import { InputAcmDto } from 'src/acm/dto/input-acm.dto';

@Controller('return-card')
export class ReturnCardController {

    @Post('input')
    async inputAcm(@Body() inputAcmDto: InputAcmDto) {
        console.log('returnCard', inputAcmDto)
        return inputAcmDto
    }



}
