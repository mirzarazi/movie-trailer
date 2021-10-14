import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ViaplayService {
  constructor(private httpService: HttpService) {}
  async movieInfo(url: string): Promise<any> {
    return (await lastValueFrom(this.httpService.get(url))).data;
  }
}
