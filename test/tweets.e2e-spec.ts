import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import request from 'supertest';

describe('tweet controller (e2e)', () => {
  let app: INestApplication;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });
  afterEach(async () => {
    if (app) {
      await app.close();
    }
  });

  it('Post /tweets', async () => {
    const res = await request(app.getHttpServer())
      .post('/tweets')
      .send({
        content: 'Hello World',
        screen_name: 'Lucas Previato',
      })
      .expect(201);
    expect(res.body._id).toBeDefined();
    expect(res.body).toMatchObject({
      content: 'Hello World',
      screen_name: 'Lucas Previato',
    });
  });
});
