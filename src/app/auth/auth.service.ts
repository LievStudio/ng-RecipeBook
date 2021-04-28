import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface AuthResponseData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string
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
    }).pipe(catchError(errRes => {
      let errorMessage = 'An unidentified error has occurred';

      if (!errRes.error || !errRes.error.error) {
        return throwError(errorMessage);
      }

      switch(errRes.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'This email already exists'
      }
      return throwError(errorMessage);
    }))
  }

  login(email: string, password: string) {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
    {

    })
  }
}
