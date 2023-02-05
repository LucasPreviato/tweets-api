import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Tweet, TweetSchema } from './entities/tweet.entity';
import { TweetsService } from './tweets.service';

describe('TweetsService', () => {
  const uri =
    'mongodb://root:mongo@db_test:27017/nest-tweets-test?authSource=admin';
  let service: TweetsService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(uri),
        MongooseModule.forFeature([{ name: Tweet.name, schema: TweetSchema }]),
      ],
      providers: [TweetsService],
    }).compile();

    service = module.get<TweetsService>(TweetsService);
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('tweet should be created', async () => {
    const tweet = await service.create({
      content: 'Hello World',
      screen_name: 'Lucas Previato',
    });

    expect(tweet.content).toBe('Hello World');
    expect(tweet.screen_name).toBe('Lucas Previato');

    const tweetCreated = await service['tweetModel'].findById(tweet._id);
    expect(tweetCreated.content).toBe('Hello World');
    expect(tweetCreated.screen_name).toBe('Lucas Previato');
  });
});
