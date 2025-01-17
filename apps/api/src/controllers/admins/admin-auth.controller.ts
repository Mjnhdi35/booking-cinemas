import { Controller } from '../../core/decorators/controller.decorator'
import { Post } from '../../core/decorators/method.decorator'
import { Body } from '../../core/decorators/param.decorator'
import { Protected } from '../../decorators/protected.decorator'
import { AdminAuthService } from '../../services/admins/admin-auth.service'

@Controller()
export class AdminAuthController {
  constructor(private adminAuthService: AdminAuthService) {}

  @Post('login-admin')
  login(@Body() body: any) {
    return this.adminAuthService.login(body)
  }
}
