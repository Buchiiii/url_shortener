import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";

interface Response<T> {
    data: T,
    message: string,
}

@Injectable()
export class TransformResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {

        return next.handle().pipe(
            map((data: T) => {
                const response: Response<T> = {
                    data: data,
                    message: 'Success'
                };
                return response;
            })
        );
    }
}