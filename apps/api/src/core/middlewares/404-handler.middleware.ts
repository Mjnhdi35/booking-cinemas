import { Response, NextFunction } from 'express'
import { AppMiddleware } from '../base/middleware.base'
import { Injectable } from '../decorators/injectable.decorator'
import { Request } from '../utils/types'

@Injectable()
export class NotFoundHandlerMiddleware implements AppMiddleware {
  use(req: Request, res: Response, next: NextFunction): void | Promise<void> {
    res.status(404).send({
      message: 'Not found roi ne',
      statusCode: 404,
    })
  }
}
