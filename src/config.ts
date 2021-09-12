import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    mongo: {
      uri: process.env.MONGO_URI,
      dbName: process.env.MONGO_DBNAME,
    },
    jwtSecret: process.env.JWT_SECRET,
  };
});
