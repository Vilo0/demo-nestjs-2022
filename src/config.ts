import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    mongo: {
      uri: process.env.MONGO_URI,
      dbName: process.env.MONGO_DBNAME,
    },
    apiKey: process.env.API_KEY,
    jwtSecret: process.env.JWT_SECRET,
  };
});
