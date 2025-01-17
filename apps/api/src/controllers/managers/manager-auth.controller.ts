import { Controller } from '../../core/decorators/controller.decorator'
import { Post } from '../../core/decorators/method.decorator'
import { Body } from '../../core/decorators/param.decorator'
import { ManagerAuthService } from '../../services/managers/manager-auth.service'

@Controller()
export class ManagerAuthController {
  constructor(private managerAuthService: ManagerAuthService) {}

  @Post('login-manager')
  login(@Body() body: any) {
    return this.managerAuthService.login(body)
  }
}
