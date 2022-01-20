import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/login';

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    private url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyB-p8CKoaQr097NJ8YJRpoWpezJj5xRRUI';
    private httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
        })
      };
    constructor(private http: HttpClient) { }

    loguearse(login: LoginModel) {
        return this.http.post(`${this.url}`,login, this.httpOptions);
    }
    isLogged() {
      const token = sessionStorage.getItem('token');
      if (token != null && token != '' && token != 'undefined') {
        return true;
      } else {
        return false;
      }
    }
}
