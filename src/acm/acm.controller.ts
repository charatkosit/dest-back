import { Controller, Req, Res, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AcmService } from './acm.service';
import { InputAcmDto } from './dto/input-acm.dto';
import { HttpService } from '@nestjs/axios';
import { readerLoaction } from './dto/readerLocation';

@Controller('acm')
export class AcmController {
  constructor(
    private readonly acmService: AcmService,
    private readonly http: HttpService) { }

  @Post('input')
  async inputAcm(@Body() inputAcmDto: InputAcmDto) {
    console.log('input', inputAcmDto)

    //This function for re-check DeviceNum  in Debug mode 
    //To check DeviceNum then Line Notifiaction
    // const debugData = JSON.stringify(inputAcmDto)
    // สำหรับ debug โดยเพิ่มการแสดง location ลงไป ซึ่งจริงๆ จะมีแค่ token กับ deviceNum ไม่มี loc    
    const debugData = { ...inputAcmDto, loc: '' };
    const deviceNum = inputAcmDto.deviceNum;
    const location = readerLoaction.find(res => Number(res.deviceNum) === Number(deviceNum))
    console.log('location', location)
    if (location) {
      debugData.loc = location.loc;
    }
    console.log(`debugData: ${JSON.stringify(debugData)}`)
    this.acmService.sendNotification(`${JSON.stringify(debugData)}`);
    //-------------

    const visitor = await this.acmService.findVisitorByToken(inputAcmDto.token);
    const officer = await this.acmService.findOfficerByToken(inputAcmDto.token);

    //อ่านบัตร Single ที่ DeviceNum เหล่านี้  จะเรียกลิฟท์ให้ลงชั้น 1 เท่านั้น
    const deviceNumOfficeFloor = [37, 38, 49, 50, 57, 58, 61, 62, 65, 66, 69, 70, 73, 74, 77, 78, 81, 82, 85, 86, 89, 90, 93,
      94, 97, 98, 101, 102, 103, 104, 105, 106, 51, 52, 55, 56, 59, 60, 63, 64, 67, 68, 71, 72,
      75, 76, 79, 80, 83, 84, 87, 88, 91, 92, 95, 96, 99, 100]

    //อ่านบัตร Single ที่ DeviceNum เหล่านี้ จะเป็นการเก็บบัตรคืน
    const deviceNumReturnCard = [901, 902, 903, 904]  //สมมุติว่าเป็นเครื่องที่เก็บบัตรคืน  

    //อ่านบัตร DeviceNum เพื่อ Exit จากอาคาร
    const deviceNumExit = [801, 802, 803, 804]
    
    // ถ้า inputAcmDto.deviceNum อยู่ใน deviceNumExit ให้เรียก API ออกจากอาคาร
    if(deviceNumExit.includes(+inputAcmDto.deviceNum)){
      console.log('route to exit')
      try {
        const url = `http://${process.env.IP_Backend}:3000/api/return-card/exit`
        let data: any = {
          "token": inputAcmDto.token,
          "deviceNum": inputAcmDto.deviceNum,
        }
        const response = await this.http.post(url, data).toPromise();
        return response.data;

      } catch (error) {
        throw new Error(`Error calling API: ${error.message}`);
      }
    }

    // ถ้า inputAcmDto.deviceNum อยู่ใน deviceNumReturnCard ให้เรียก API ที่เก็บบัตรคืน
    if (deviceNumReturnCard.includes(+inputAcmDto.deviceNum)) {
      console.log('route to return card')
      try {
        const url = `http://${process.env.IP_Backend}:3000/api/return-card/visitor`
        let data: any = {
          "token": inputAcmDto.token,
          "deviceNum": inputAcmDto.deviceNum,
        }
        const response = await this.http.post(url, data).toPromise();
        return response.data;

      } catch (error) {
        throw new Error(`Error calling API: ${error.message}`);
      }
    }

    //debug
    // console.log(`visitor: ${JSON.stringify(visitor)}`);
    // console.log(`officer: ${JSON.stringify(officer)}`);


    if (visitor.length === 1) { // visitor.length === 1 คือ มีข้อมูลของบัตรนั้นอยู่ใน รายชื่อของ visitor
      console.log('route to single')

      //1 visitor
      try {
        let destFloor: number
        if (deviceNumOfficeFloor.includes(+inputAcmDto.deviceNum)) {
          // console.log('')
          destFloor = 1;
        } else {
          destFloor = visitor[0].destFloor;
        }


        // const destFloor = visitor[0].destFloor;
        const url = `http://${process.env.IP_Backend}:3000/api/mitsu/single`;
        let data: any = {
          "ipAddress": process.env.IP_MITSU,
          "deviceNum": inputAcmDto.deviceNum,
          "destFloor": destFloor,
          "callAttribute": visitor[0].callAttribute
        }
        const response = await this.http.post(url, data).toPromise();
        return response.data;
      } catch (error) {
        throw new Error(`Error calling API: ${error.message}`);
      }

    } else if (officer.length === 1) { // officer.length === 1 คือ มีข้อมูลของบัตรนั้นอยู่ใน รายชื่อของ officer
      console.log('บัตรพนักงาน Multi')

      try {
        // const destFloor = visitor[0].destFloor;
        const url = `http://${process.env.IP_Backend}:3000/api/mitsu/multi`;
        let data: any = {
          "ipAddress": process.env.IP_MITSU,
          "deviceNum": inputAcmDto.deviceNum,
          "multiSelectFloor": officer[0].multiSelectFloor,
          "callAttribute": officer[0].callAttribute
        }
        const response = await this.http.post(url, data).toPromise();
        return response.data;

      } catch (error) {
        throw new Error(`Error calling API: ${error.message}`);
      }


    } else {

      return `{ "message":"บัตรไม่ได้ลงทะเบียน"}`
    }

  }


}
