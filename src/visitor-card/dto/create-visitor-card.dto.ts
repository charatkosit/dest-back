import { IsNotEmpty } from "class-validator";

export class CreateVisitorCardDto {

    @IsNotEmpty()
     token: string;
  
    @IsNotEmpty()
    numOnCard: string;
  
}
