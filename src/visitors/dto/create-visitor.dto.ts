import {IsNotEmpty, MinLength, IsEmail} from 'class-validator'

export class CreateVisitorDto {

    @IsNotEmpty()
    @MinLength(5)
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    address: string;

    @IsNotEmpty({message:'กรุณาใส่หมายเลขโทรศัพท์'})
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
