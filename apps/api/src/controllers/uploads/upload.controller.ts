import { Controller } from '../../core/decorators/controller.decorator'
import { Post } from '../../core/decorators/method.decorator'
import { Req } from '../../core/decorators/param.decorator'
import { Request } from '../../core/utils/types'
import { Uploader } from '../../services/uploads/upload.service'

@Controller('upload')
export class UploadController {
  constructor(private uploader: Uploader) {}
  @Post()
  async create(@Req() req: Request) {
    if (!req.file) {
      return { error: 'No file uploaded' }
    }
    try {
      const fileUrl = await this.uploader.uploadToCloudinary(req, 'file')
      return { fileUrl }
    } catch (error: any) {
      return { error: 'Error uploading file: ' + error.message }
    }
  }
}
