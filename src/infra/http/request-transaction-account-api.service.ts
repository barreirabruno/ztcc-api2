import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class RequestTransactionAccountApiService {
  constructor(private httpService: HttpService) {}

   async execute(vatNumberParam: string): Promise<AxiosResponse> {
    try {
      const url = 'https://transaction-account-ztcc.herokuapp.com/ztcc/v1/account/status'
      const bodyParams = {
        vatNumber: vatNumberParam
      }
      return await firstValueFrom(this.httpService.post(url, bodyParams))
    } catch (error) {
      throw new HttpException(error.response, error.status)
    }
  }
}
