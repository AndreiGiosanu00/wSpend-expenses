import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateRegister(user: {name: string, username: string, email: string, password: string}) {

    if (!user.name || !user.username || !user.email || !user.password) {
      return false;
    }

    return true;

  }

  validateEmail(email: string) {

    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email.toLowerCase());

  }

  validateExpense(expense: any) {
    let alerts = {name: '', category: '', price: '', date: ''};

    if (!expense.name) {
      alerts.name = 'Invalid name';
    }

    if (!expense.price) {
      alerts.price = 'Invalid price';
    }

    if (!expense.category) {
      alerts.category = 'Please select a category';
    }

    if (expense.date === 'Invalid Date') {
      alerts.date = 'Please select a date';
    }

    return alerts;
  }

  validateGoal(goal: any) {

  }

}
