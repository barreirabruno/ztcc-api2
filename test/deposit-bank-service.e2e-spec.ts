import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { DepositBankServiceModule } from '../src/deposit-bank-service/deposit-bank-service.module';
import { controllerParamsMock, controllerResponseMock } from './mocks/e2e'

describe('DepositBankServiceController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [DepositBankServiceModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/account/deposit (POST)', async () => {
    const httpRequest = await request(app.getHttpServer())
      .post('/account/deposit')
      .send(controllerParamsMock)

    expect(httpRequest.statusCode).toBe(201)
    expect(httpRequest.body).toEqual(controllerResponseMock)
  });
});
