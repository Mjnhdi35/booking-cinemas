import { map, Observable } from 'rxjs'
import { AppContext } from '../core/base/context.base'
import { AppInterceptor } from '../core/base/interceptor.base'
import { NextCallFunction } from '../core/base/next-call-function.base'
import { Injectable } from '../core/decorators/injectable.decorator'

@Injectable()
export class BaseResponseFormatter implements AppInterceptor {
  intercept(context: AppContext, next: NextCallFunction): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        message: 'Thanh cong',
        data,
        statusCode: 200,
      })),
    )
  }
}
