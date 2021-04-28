import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

interface AuthResponseData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string
}

Injectable({providedIn:'any'})

export class AuthService {

  constructor(private http: HttpClient) {}

  signup(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAeBWXzhWNqT4-63Cw_MbgKbPGhm_-18XQ',
    {
      email: email,
      password: password,
      returnSecureToken: true
    })
  }

}
