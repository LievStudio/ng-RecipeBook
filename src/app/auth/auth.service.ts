import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface AuthResponseData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}

const API_KEY = 'AIzaSyAeBWXzhWNqT4-63Cw_MbgKbPGhm_-18XQ';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
    {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError))
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
    {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError))
  }

  private handleError(errRes: HttpErrorResponse){
    let errorMessage = 'An unidentified error has occurred';

    if (!errRes.error || !errRes.error.error) {
      return throwError(errorMessage);
    }

    switch(errRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Password is incorrect';
        break;
    }
    return throwError(errorMessage);
  }
}
