import multer, { Multer } from 'multer'
import { Injectable } from '../../core/decorators/injectable.decorator'
import { Request } from '../../core/utils/types'
import {
  v2 as cloudinary,
  UploadApiErrorResponse,
  UploadApiResponse,
} from 'cloudinary'

type TUploader = {
  destination?: string
  filename?: (req: Request, file: Express.Multer.File, cb: any) => void
}

@Injectable()
export class Uploader {
  upload: Multer

  constructor(options: TUploader = {}) {
    const storage = multer.memoryStorage()

    this.upload = multer({ storage })
  }

  single(fieldName: string) {
    return this.upload.single(fieldName)
  }

  array(fieldName: string, maxCount: number) {
    return this.upload.array(fieldName, maxCount)
  }

  fields(array: multer.Field[]) {
    return this.upload.fields(array)
  }

  async uploadToCloudinary(req: Request, fieldName: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const file = req.file
      if (!file) {
        reject(new Error('No file uploaded'))
        return
      }

      cloudinary.uploader
        .upload_stream(
          {
            resource_type: 'auto',
          },
          (
            err: UploadApiErrorResponse | undefined,
            result: UploadApiResponse | undefined,
          ) => {
            if (err) {
              reject(new Error(`Cloudinary upload failed: ${err.message}`))
              return
            }

            resolve(result?.secure_url || '')
          },
        )
        .end(file.buffer)
    })
  }
}
