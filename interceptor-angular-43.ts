//For Angular 4.3 +
import { Injectable, Injector } from '@angular/core';
import { tap } from 'rxjs/operators';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpClient
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as uuidv1 from 'uuid/v1';

const interceptMode = false;

@Injectable()
export class ApiSaverInterceptor implements HttpInterceptor {

  private requestToMirror;
  private responseToMirror;

  constructor(private injector: Injector) { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (interceptMode) {
      return next.handle(request).pipe(
        tap(
          event => {
            if (!request.url.includes('http://127.0.0.1:3001')) {
              if (event instanceof HttpResponse) {
                const uuid = uuidv1();
                this.requestToMirror = {
                  uri: request.url,
                  method: request.method,
                  body: request.body,
                  uuid
                };

                this.responseToMirror = {
                  uuid,
                  statusCode: event.status,
                  body: event.body
                };

                const http = this.injector.get(HttpClient);
                http.post('http://127.0.0.1:3001/request', {
                  uri: request.url,
                  method: request.method,
                  body: request.body,
                  uuid
                }).toPromise();
                http.post('http://127.0.0.1:3001/response', {
                  uuid,
                  statusCode: event.status,
                  body: event.body
                }).toPromise();

                console.log('req', this.requestToMirror);
                console.log('resp', this.responseToMirror);
              }
            }

          },
          error => {
            if (event instanceof HttpResponse) {
              console.log('api call error :', event);
            }
          }
        )
      );
    } else {
      let modifiedRequest;
      if (request.url.includes('/market/api/') && !request.url.includes('monitoring')) {
        modifiedRequest = request.clone({
          url: request.url.replace('/market/api/', 'http://127.0.0.1:3001/market/api/')
        });
        console.log('api', request.url);
      } else if (request.url.includes('/market/static/') && !request.url.includes('monitoring')) {
        modifiedRequest = request.clone({
          url: request.url.replace('/market/static/', 'http://127.0.0.1:3001/market/static/')
        });
        console.log('static', request.url);
      }
      return next.handle(modifiedRequest);
    }

  }
}
