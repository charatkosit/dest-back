import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InputAcmDto } from 'src/acm/dto/input-acm.dto';
import { VisitorsService } from 'src/visitors/visitors.service';


@Injectable()
export class ReturnCardService {

    constructor(private readonly http:HttpService) { }

    async sendNotification(message: string) {
        // ส่งข้อมูลไปยัง Line Notify API
        const lineNotifyToken = process.env.LINE_NOTIFY_TOKEN; // แทนค่าด้วย Line Notify Token ของคุณ
        const url = 'https://notify-api.line.me/api/notify';
        
        const headers = {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${lineNotifyToken}`,
        };
        
        const data = new URLSearchParams();
        data.append('message', message);
        
        try {
          await this.http.post(url, data.toString(), { headers }).toPromise();
        } catch (error) {
          console.error('Error sending Line Notify:', error);
          throw error;
        }
      }
}
