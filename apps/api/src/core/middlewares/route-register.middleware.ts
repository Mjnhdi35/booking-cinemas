import { NextFunction, Response } from 'express'
import { AppMiddleware } from '../base/middleware.base'
import { Injectable } from '../decorators/injectable.decorator'
import { Request } from '../utils/types'

@Injectable()
export class RouteRegisterMiddleware implements AppMiddleware {
  instance: any
  handlerName: string

  constructor(instance: any, handlerName: string) {
    this.instance = instance
    this.handlerName = handlerName
  }
  use(req: Request, res: Response, next: NextFunction): void | Promise<void> {
    const context = {
      instance: this.instance,
      handlerName: this.handlerName,
      params: req.params,
    }

    req.context = context
    // console.log(req.url);
    //xem cac route
    next()
  }
}
