import 'dotenv/config';

export const env = {
  mongodb_uri: process.env.MONGODB_URI,
  database_name: process.env.DATABASE_NAME,
  app_host: process.env.APP_HOST,
  app_port: process.env.APP_PORT,
  author: process.env.AUTHOR_NAME,
  build_mode: process.env.BUILD_MODE
};
