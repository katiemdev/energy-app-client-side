import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getToken();
    if (this.authService.currentUser) {
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + authToken,
        },
      });
    } else {
    }
    return next.handle(req);
    // .pipe(
    //   catchError((err) => {
    //     if (
    //       [401].indexOf(err.status) !== -1 &&
    //       err.error.message == 'No token provided'
    //     ) {
    //       this.router.navigate(['']);
    //     }

    //     const error = err || err.statusText;
    //     return throwError(() => {
    //       // console.log(error);
    //       new Error(error.error);
    //     });
    //   })
    // );
  }
}
