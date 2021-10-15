import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ViaplayService {
  constructor(private httpService: HttpService) {
    this.httpService.axiosRef.interceptors.response.use((response) => {
      return response.data;
    });
  }
  async movieInfo(url: string): Promise<any> {
    const info = await lastValueFrom(this.httpService.get(url));
    return info;
  }
}
