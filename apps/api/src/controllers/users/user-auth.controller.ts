import { Controller } from '../../core/decorators/controller.decorator'
import { Post } from '../../core/decorators/method.decorator'
import { Body } from '../../core/decorators/param.decorator'
import { UserAuthService } from '../../services/users/user-auth.service'

@Controller()
export class UserAuthController {
  constructor(private userAuthService: UserAuthService) {}

  @Post('login')
  login(@Body() body: any) {
    return this.userAuthService.login(body)
  }
}
