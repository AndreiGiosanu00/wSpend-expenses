import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any;
  user: any;
  expense: any;
  goal: any;


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

  getProfile() {

    let headers =  new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');

    return this.http.get('http://localhost:3000/users/profile',{headers: headers});

  }

  addExpense(expenseWithUsername) {
    let headers =  new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');

    console.log(expenseWithUsername);

    return this.http.post('http://localhost:3000/expenses/add_expense', expenseWithUsername, {headers: headers});
  }

  getAllExpenses() {
    let headers =  new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');

    this.user = JSON.parse(localStorage.getItem('user'));

    return this.http.get('http://localhost:3000/expenses/' + this.user['username'], {headers: headers});
  }

  updateExpense(expenseUpdated) {
    let headers =  new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');

    return this.http.put('http://localhost:3000/expenses/update_expense/' + expenseUpdated._id, expenseUpdated,{headers: headers});
  }

  deleteExpense(expenseId) {
    let headers =  new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');

    return this.http.delete('http://localhost:3000/expenses/delete_expense/' + expenseId,{headers: headers});
  }

  addGoal(goal) {
    let headers =  new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');

    return this.http.post('http://localhost:3000/goals/add_goal', goal, {headers: headers});
  }

  getAllGoals() {
    let headers =  new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');

    return this.http.get('http://localhost:3000/goals/', {headers: headers});
  }

  updateGoal(goalUpdated) {
    let headers =  new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');

    return this.http.put('http://localhost:3000/goals/update_goal/' + goalUpdated._id, goalUpdated,{headers: headers});
  }

  deleteGoal(goalId) {
    let headers =  new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');

    return this.http.delete('http://localhost:3000/goals/delete_goal/' + goalId,{headers: headers});
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
