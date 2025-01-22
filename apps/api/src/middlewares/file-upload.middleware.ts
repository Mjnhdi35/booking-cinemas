import { NextFunction, Response } from 'express'
import { AppMiddleware } from '../core/base/middleware.base'
import { Injectable } from '../core/decorators/injectable.decorator'
import { Uploader } from '../services/uploads/upload.service'
import { Request } from '../core/utils/types'
import { BadRequestException } from '../core/base/error.base'

@Injectable()
export class FileUploadMiddleware implements AppMiddleware {
  constructor(private uploader: Uploader) {}

  use(req: Request, res: Response, next: NextFunction): void {
    this.uploader.single('file')(req, res, (error: any) => {
      if (error) {
        throw new BadRequestException(error)
      }
      next()
    })
  }
}
