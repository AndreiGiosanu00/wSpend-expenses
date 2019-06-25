import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {

  private targetFood = 1000;
  private targetEntertaiment = 650;
  private targetUtilities = 1200;
  private targetShopping = 800;

  constructor() { }

  isExpenseUseful(expense, expenses) {
    let expenseCategory = expense.category;
    let total = 0;

    expenses.forEach((item) => {
      if (item.category === expenseCategory) {
        total += (+item.price);
      }
    });

    if (expenseCategory === 'Food') {
      if (total > this.targetFood) {
        return false;
      }
    }

    if (expenseCategory === 'Entertainment') {
      if (total > this.targetEntertaiment) {
        return false;
      }
    }

    if (expenseCategory === 'Utilities') {
      if (total > this.targetUtilities) {
        return false;
      }
    }

    if (expenseCategory === 'Shopping') {
      if (total > this.targetShopping) {
        return false;
      }
    }

    return true;
  }


}
