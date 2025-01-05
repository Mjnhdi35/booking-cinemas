import { Response, NextFunction } from 'express'
import { AppMiddleware } from '../core/base/middleware.base'
import { Injectable } from '../core/decorators/injectable.decorator'
import { Request } from '../core/utils/types'

@Injectable()
export class SingleFileUploadMiddleware implements AppMiddleware {
  constructor() {}
  use(req: Request, res: Response, next: NextFunction): void | Promise<void> {
    throw new Error('Method not implemented.')
  }

  // onInit() {
  //   console.log('single file upload middleware init')
  // }
}
