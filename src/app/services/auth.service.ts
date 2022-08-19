import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  Subject,
  throwError,
} from 'rxjs';
import { User } from 'src/models/User';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string = `${environment.SERVER_URL}/auth`;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  private currentUserSubject!: BehaviorSubject<User>;
  public currentUser!: Observable<User>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser')!)
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  //GET Current User
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  // POST Login
  signIn(user: any) {
    return this.http.post<any>(`${this.apiUrl}/login`, user).pipe(
      map((res) => {
        localStorage.setItem('access_token', res.token);
        localStorage.setItem('currentUser', JSON.stringify(res.user));
        this.currentUserSubject.next(res.user);
        // console.log(res);
        return res.user;
      })
    );
  }

  // .subscribe({
  //   next: (res: any) => {
  //     // store user details and jwt token in local storage to keep user logged in between page refreshes
  //     localStorage.setItem('access_token', res.token);
  //     localStorage.setItem('currentUser', JSON.stringify(user));
  //     this.currentUserSubject.next(user);
  //     this.router.navigate(['dashboard/' + user._id]);
  //     console.log(res);
  //   },
  //   error: (e) => {
  //     this.handleError(e);
  //   },
  // });

  // POST Register
  signUp(user: User): Observable<any> {
    let api = `${this.apiUrl}/register`;
    return this.http
      .post(api, user)
      .pipe(catchError((err) => this.handleError(err)));
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  // GET User
  getUserProfile(id: any): Observable<any> {
    let url = `${this.apiUrl}/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res) => {
        return res || {};
      }),
      catchError((err) => this.handleError(err))
    );
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }

  logout() {
    // remove user from local storage to log user out
    let removeToken = localStorage.removeItem('access_token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null!);
    if (removeToken == null) {
      this.router.navigate(['']);
    }
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      if (error.error.message == 'No token provided') {
        this.logout();
      }

      console.error(
        `Backend returned code ${error.status}, body was:
        ${error.error.message}`
      );
    }

    // Return an observable with a user-facing error message.
    return throwError(() => new Error(JSON.stringify(error.error)));
  }
}
