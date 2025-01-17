import { Response, NextFunction } from 'express'
import { AppErrorMiddleware } from '../base/error-middleware.base'
import { Request } from '../utils/types'
import { Injectable } from '../decorators/injectable.decorator'

@Injectable()
export class ErrorHandlerMiddleware implements AppErrorMiddleware {
  use(error: any, req: Request, res: Response, next: NextFunction): void {
    if (next === undefined) return (res as unknown as NextFunction)()

    const message = error.message ?? 'Internal Error'
    const statusCode = error.statusCode ?? 500

    // console.log(error)

    res.status(statusCode).send({ statusCode, message })
  }
}
