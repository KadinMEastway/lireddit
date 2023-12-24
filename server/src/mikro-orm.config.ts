import { __prod__ } from './constants';
import { Post } from './entities/Post';
import path from 'path';
import { MikroORM } from '@mikro-orm/postgresql';

export default {
  migrations: {
    path: path.join(__dirname, './migrations'), // path to the folder with migrations
    glob: '!(*.d).{js,ts}', // how to match migration files (all .js and .ts files, but not .d.ts)
  },
  entities: [Post],
  dbName: 'lireddit',
  type: 'postgresql',
  user: 'kadineastway',
  password: 'caPfen-mustuk-2mogme',
  debug: !__prod__,
  allowGlobalContext: true,
} as Parameters<typeof MikroORM.init>[0];