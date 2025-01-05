import 'reflect-metadata'
import { UserController } from './controllers/user.controller'
import { AppManager } from './core/app.manager'
import { connectDb } from './db/connect.db'
import { AuthGuard } from './guards/auth.gaurd'
import { AuthController } from './controllers/auth.controller'
import { SingleFileUploadMiddleware } from './middlewares/signle-file-upload.middleware'
import { BaseResponseFormatter } from './interceptors/response-formatter.interceptor'
import { BodyValidateInterceptor } from './interceptors/body-validate.interceptor'
import { ValidationPipe } from './pipes/validation.pipe'
import { UserResolver } from './graph/resolvers/user.resolver'
import { AuthGraphMiddleware } from './graph/middlewares/auth.middleware'
import express from 'express'
import { expressMiddleware } from '@apollo/server/express4'
import dotenv from 'dotenv'
import path from 'path'
import { buildSchema } from 'type-graphql'
import { ApolloServer, BaseContext } from '@apollo/server'
dotenv.config()

const app = new AppManager({
  controllers: [UserController, AuthController],
  prefix: ['api'],
  guards: [AuthGuard],
  middlewares: [
    { forRoutes: ['/upload'], useClass: SingleFileUploadMiddleware },
  ],
  interceptors: [
    {
      forRoutes: ['/user', '/post'],
      useClass: BaseResponseFormatter,
    },
    BodyValidateInterceptor,
  ],
  pipes: [
    {
      forRoutes: ['/user'],
      useClass: ValidationPipe,
    },
  ],
})

async function bootstrap() {
  await connectDb()

  app.use('/static', express.static(path.resolve('./uploads')))

  const container = app.getContainer()
  const resolvers = [UserResolver]
  const middlewares = [AuthGraphMiddleware]

  for (const resolver of resolvers) {
    app.diRegister(resolver)
  }

  for (const middleware of middlewares) {
    app.diRegister(middleware)
  }

  const schema = await buildSchema({
    resolvers: resolvers as any,
    globalMiddlewares: middlewares,
    container,
  })

  const server = new ApolloServer<BaseContext>({
    schema,
    introspection: true,
  })

  await server.start()
  app.use('/', express.json())
  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req }) => ({ req }),
    }) as unknown as express.Handler,
  )

  app.init()

  app.listen(3000, () => {
    console.log('App is running at http://localhost:' + 3000)
  })
}

bootstrap()
