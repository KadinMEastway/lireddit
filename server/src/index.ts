import mikroConfig from './mikro-orm.config';
import { MikroORM, RequestContext } from '@mikro-orm/core';
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4'
import { buildSchema } from 'type-graphql';
import bodyParser from 'body-parser'
import { HelloResolver, PostResolver } from './resolvers';

const main = async () => {
  const orm = await MikroORM.init(mikroConfig);
  await orm.getMigrator().up();

  const port = 4000;
  const app = express();
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver],
      validate: false,
    }),
  });
  await apolloServer.start();

  app.use((_req, _res, next) => {
    RequestContext.create(orm.em, next);
  });

  app.use(
    bodyParser.json(),
    expressMiddleware(apolloServer, {context: async ({ req, res }) => ({ em: orm.em, req, res })
    })
  );

  app.listen(port, () => {
    console.log(`Server started on localhost:${port}`);
  });
}

main().catch((err) => {
  console.error(err);
});