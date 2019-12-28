import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    this.http.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAeh4QXJCSigVYadkAKWcBFsZkAMBFO4EY',
    {
      email: email,
      password: password,
      returnSecuredToken: true
    });
  }
}
