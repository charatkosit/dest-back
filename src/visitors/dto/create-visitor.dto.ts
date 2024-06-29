import {IsNotEmpty, MinLength, IsEmail} from 'class-validator'

export class CreateVisitorDto {

    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    address: string;

    phone: string;
    
    idCard: string;

    @IsNotEmpty()
    token: string;
    
    @IsNotEmpty()
    destFloor: number;
   
    bussiness: string;

    photoIDcard: string;

    photoWebCam: string;
   
    checkIn: Date;

}
