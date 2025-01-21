import { JwtPayload } from 'jsonwebtoken'
import { Injectable } from '../core/decorators/injectable.decorator'
import { JwtStrategy } from '../strategies/jwt.stategy'
import { PassportService } from '../services/passport.service'
import { AppContext } from '../core/base/context.base'
import { AppGruad } from '../core/base/guard.base'
import { PROTECTED_METADATA_KEY } from '../utils/constants'
import { getMetadata } from '../core/metadata/metadata'
import { UnAuthorizedException } from '../core/base/error.base'

@Injectable()
export class AuthGuard extends AppGruad {
  constructor(
    jwtStrategy: JwtStrategy,
    private passportService: PassportService,
  ) {
    super()
  }
  canActive(context: AppContext): boolean {
    const passport = this.passportService.passport
    const controllerClass = context.getClass()
    const handler = context.getHandler()
    const req = context.switchToHttpRequest()
    const res = context.switchToHttpResponse()
    const next = context.getNextFunction()
    const isProtected =
      getMetadata(PROTECTED_METADATA_KEY, handler) ??
      getMetadata(PROTECTED_METADATA_KEY, controllerClass)
    if (!isProtected) {
      return true
    }

    passport.authenticate(
      'jwt',
      { session: false },
      (error: any, payload: JwtPayload, info: any) => {
        if (error || info) {
          throw new UnAuthorizedException()
        }
        return true
      },
    )(req, res, next)

    return true
  }
}
