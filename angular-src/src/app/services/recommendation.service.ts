import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {

  

  constructor() { }

  isExpenseUseful(expense, expenses) {
    let targetFood = JSON.parse(localStorage.getItem('user')).foodTarget;
    let targetEntertainment = JSON.parse(localStorage.getItem('user')).entertainmentTarget;
    let targetUtilities = JSON.parse(localStorage.getItem('user')).utilitiesTarget;
    let targetShopping = JSON.parse(localStorage.getItem('user')).shoppingTarget;
    let expenseCategory = expense.category;
    let total = 0;

    expenses.forEach((item) => {
      if (item.category === expenseCategory) {
        total += (+item.price);
      }
    });

    if (expenseCategory === 'Food') {
      if (total > targetFood) {
        return false;
      }
    }

    if (expenseCategory === 'Entertainment') {
      if (total > targetEntertainment) {
        return false;
      }
    }

    if (expenseCategory === 'Utilities') {
      if (total > targetUtilities) {
        return false;
      }
    }

    if (expenseCategory === 'Shopping') {
      if (total > targetShopping) {
        return false;
      }
    }

    return true;
  }


}
