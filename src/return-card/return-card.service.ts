import { Injectable } from '@nestjs/common';
import { InputAcmDto } from 'src/acm/dto/input-acm.dto';
import { VisitorsService } from 'src/visitors/visitors.service';


@Injectable()
export class ReturnCardService {

    // constructor(private visitor: VisitorsService) { }


    async visitorReturnCard(inputAcmDto: InputAcmDto) {
        // const result = await this.visitor.findByToken(inputAcmDto.token);
        // console.log('Return Card', result);
        return 'Return Card';
    }
}
