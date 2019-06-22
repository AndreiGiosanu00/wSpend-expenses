import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any;
  user: any;

  constructor (public http: HttpClient) {}

  registerUser(user) {

    let headers =  new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, {headers: headers});

  }

  sendSMS(user) {
    let headers =  new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/sms', user, {headers: headers});
  }

  authenticateUser(user) {

    let headers =  new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers});

  }

  storeUserData(token, user) {

    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.authToken = token;
    this.user = user;

  }

  logout() {

    this.authToken = this.user = null;
    localStorage.clear();

  }

  getProfile() {

    let headers =  new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');

    return this.http.get('http://localhost:3000/users/profile',{headers: headers});

  }

  loadToken() {

    const token = localStorage.getItem('id_token');
    this.authToken = token;

  }

  loggedIn() {

    let token = localStorage.getItem('id_token');

    if (token) {
      return true;
    }

    return  false;

  }



}
