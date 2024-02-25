/* eslint-disable @typescript-eslint/no-explicit-any */
import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, Provider, inject } from "@angular/core";
import { Auth, idToken } from "@angular/fire/auth";
import { Observable, switchMap, take } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private auth = inject(Auth)
  private idToken$  = idToken(this.auth);
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.idToken$.pipe(
      take(1),
      switchMap((token) => {
        if (!token) return next.handle(req);
        const headers = req.headers.set('Authorization', `Bearer ${token}`);
        const request = req.clone({
          headers
        })
        return next.handle(request);
      })
    )
  }
  
}

export const authInterceptorProvider :Provider =  {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
}