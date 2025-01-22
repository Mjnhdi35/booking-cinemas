import 'reflect-metadata'
import { AppManager } from './core/app.manager'
import { connectDb } from './db/connect.db'
import { AuthGuard } from './guards/auth.gaurd'
import { BaseResponseFormatter } from './interceptors/response-formatter.interceptor'
import { BodyValidateInterceptor } from './interceptors/body-validate.interceptor'
import { ValidationPipe } from './pipes/validation.pipe'
import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import cors from 'cors'
import { UserController } from './controllers/users/user.controller'
import { UserAuthController } from './controllers/users/user-auth.controller'
import { AdminController } from './controllers/admins/admin.controller'
import { AdminAuthController } from './controllers/admins/admin-auth.controller'
import { MovieController } from './controllers/movies/movie.controller'
import { BookingController } from './controllers/bookings/booking.controller'
import { UploadController } from './controllers/uploads/upload.controller'
import { FileUploadMiddleware } from './middlewares/file-upload.middleware'
import { v2 as cloudinary } from 'cloudinary'
dotenv.config()

const app = new AppManager({
  controllers: [
    UserController,
    UserAuthController,
    AdminController,
    AdminAuthController,
    MovieController,
    BookingController,
    UploadController,
  ],
  prefix: ['api'],
  guards: [AuthGuard],
  middlewares: [
    {
      forRoutes: ['/upload'],
      useClass: FileUploadMiddleware,
    },
  ],
  interceptors: [
    {
      forRoutes: ['/users', '/admins', '/movies', '/bookings'],
      useClass: BaseResponseFormatter,
    },
    BodyValidateInterceptor,
  ],
  pipes: [
    {
      forRoutes: ['/users', '/admins', '/movies', '/bookings'],
      useClass: ValidationPipe,
    },
  ],
})

async function bootstrap() {
  await connectDb()
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })
  app.use(
    '*',
    cors({
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST', 'PATCH', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    }),
  )

  app.use('/', express.json())

  app.init()

  app.listen(3000, () => {
    console.log('App is running at http://localhost:' + 3000)
  })
}

bootstrap()
