import mongoose from 'mongoose';
import { Tweet, TweetSchema } from './tweet.entity';

describe('Tweet Tests', () => {
  describe('Tweet Class', () => {
    it('should create a tweet', () => {
      const tweet = new Tweet({
        content: 'Hello World',
        screen_name: 'Lucas Previato',
      });

      expect(tweet.content).toBe('Hello World');
      expect(tweet.screen_name).toBe('Lucas Previato');
    });
  });

  describe('Using MongoDB', () => {
    let connection: mongoose.Mongoose;

    beforeAll(async () => {
      connection = await mongoose.connect(
        `mongodb://root:mongo@db_test:27017/nest-tweets-test?authSource=admin`,
      );
    });

    afterEach(async () => {
      if (connection) {
        await connection.disconnect();
      }
      else {
        console.log('connection is null');
      }
    });
    it('create a tweet with mongoose', async () => {
      const TweetModel = connection.model('Tweet', TweetSchema);
      const tweet = new TweetModel({
        content: 'Hello World',
        screen_name: 'Lucas Previato',
      });
      await tweet.save();
      const tweetcreated = await TweetModel.findById(tweet._id);
      expect(tweetcreated.content).toBe('Hello World');
      expect(tweetcreated.screen_name).toBe('Lucas Previato');
    });
  });
});
