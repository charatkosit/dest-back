import { PartialType } from '@nestjs/mapped-types';
import { CreateVisitorCardDto } from './create-visitor-card.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateVisitorCardDto extends PartialType(CreateVisitorCardDto) {
    @IsNotEmpty()
    occupied: boolean;
}
