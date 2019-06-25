import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import {ValidateService} from "../../services/validate.service";
import {RecommendationService} from "../../services/recommendation.service";

declare let $: any;

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {

  private expenses: any[] = [];
  private currentPage = 1;
  private pages = 0;
  private localExpense = {name: '', price: '', _id: '', category: '', date: '', username: ''};
  private selectedExpenses: any[] = [];
  private validators = {
    name: '',
    category: '',
    price: '',
    date: ''
  };
  private itemsPerPage = 0;

  private expenseTrigger = 0;
  private unUsefulExpense = {
    active: false,
    text: ''
  };

  constructor(private authService: AuthService,
              private router: Router,
              private datePipe: DatePipe,
              private validateService: ValidateService,
              private recommendationService: RecommendationService) {}

  ngOnInit() {
    // Fix the modal backdrop issue.
    $('#deleteOneExpenseModal').appendTo('body');
    $('#deleteMultipleExpenseModal').appendTo('body');
    $('#addExpenseModal').appendTo('body');
    $('#editExpenseModal').appendTo('body');

    this.authService.getAllExpenses().subscribe((result: any) => {
      this.expenses = result.expenses;

      if (this.expenses.length <= 5) {
        this.pages = 1;
        this.itemsPerPage = this.expenses.length;
      } else {
        this.pages = (this.expenses.length / 5) + 1;
        this.itemsPerPage = 5;
      }

    });

  }

  nextPage() {
    if (this.currentPage + 1 <= this.pages) {
      this.currentPage ++;

      this.itemsPerPage = (this.expenses.length - 5 * (this.currentPage -1)) > 5 ? 5: (this.expenses.length - 5 * (this.currentPage -1));
    }
  }

  previousPage() {
    if (this.currentPage - 1 >= 0) {
      this.currentPage --;

      this.itemsPerPage = 5;
    }
  }

  setLocalExpense(expense?: any) {
    if (expense) {
      this.localExpense = expense;
      $('#editName').val(this.localExpense.name);
      $('#editCategory').val(this.localExpense.category);
      $('#editPrice').val(this.localExpense.price);
      $('#editDate').val(this.datePipe.transform(this.localExpense.date, 'yyyy-MM-dd'));
    } else {
      $('#addName').val('');
      $('#addCategory').val('');
      $('#addPrice').val('');
      $('#addDate').val(this.datePipe.transform('', 'yyyy-MM-dd'));
    }

    this.unUsefulExpense.active = false;
  }

  addExpense() {
    this.expenseTrigger ++;

    this.localExpense.name = $('#addName').val();
    this.localExpense.category = $('#addCategory').val();
    this.localExpense.price = $('#addPrice').val();
    let date = new Date( $('#addDate').val().replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3") );
    this.localExpense.date = date.toString();
    this.localExpense.username = JSON.parse(localStorage.getItem('user')).username;

    this.validators = this.validateService.validateExpense(this.localExpense);

    if (!this.validators.name && !this.validators.category && !this.validators.price && !this.validators.date) {

      if (!this.recommendationService.isExpenseUseful(this.localExpense, this.expenses)) {
        this.unUsefulExpense = {
          active: true,
          text: 'You spend too much money in ' + this.localExpense.category + ' category.<br>Are you sure that you want to spend more?'
        }
      } else {
        this.expenseTrigger = 2;
      }

      if (this.expenseTrigger === 2) {
        this.authService.addExpense(this.localExpense).subscribe((result) => {
          // add alerts
          this.authService.getAllExpenses().subscribe((result: any) => {
            this.expenses = result.expenses;
          });
        });

        $('#addExpenseModal').modal('hide');
        this.expenseTrigger = 0;
      }
    }
  }

  deleteMultiple() {
    console.log(this.selectedExpenses);
    this.selectedExpenses.forEach((expense) => {
      this.authService.deleteExpense(expense._id).subscribe((result) => {
        // afisezi alerta
        this.authService.getAllExpenses().subscribe((result: any) => {
          this.expenses = result.expenses;
        });
      });
      this.currentPage = 1;
    });
  }

  deleteOne() {
    this.authService.deleteExpense(this.localExpense._id).subscribe((result) => {
      // afisezi alerta
      this.authService.getAllExpenses().subscribe((result: any) => {
        this.expenses = result.expenses;
      });
      this.currentPage = 1;
    });
  }

  editExpense() {
    this.localExpense.name = $('#editName').val();
    this.localExpense.category = $('#editCategory').val();
    this.localExpense.price = $('#editPrice').val();
    let date = new Date( $('#editDate').val().replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3") );
    this.localExpense.date = date.toString();

    this.validators = this.validateService.validateExpense(this.localExpense);

    if (!this.validators.name && !this.validators.category && !this.validators.price && !this.validators.date) {
      this.authService.updateExpense(this.localExpense).subscribe((result) => {
        // add alerts
        this.authService.getAllExpenses().subscribe((result: any) => {
          this.expenses = result.expenses;
        });
      });

      $('#editExpenseModal').modal('hide');
    }

  }

  selectAll() {
    if ($('#selectAll').is(':checked')) {

      this.expenses.forEach((expense) => {
        $('#' + 'selectOne' + expense._id).prop('checked', true);
      });
      this.selectedExpenses = this.expenses;

    } else {

      this.expenses.forEach((expense) => {
        $('#' + 'selectOne' + expense._id).prop('checked', false);
      });
      this.selectedExpenses = [];
    }
  }

  selectOne(expense: any) {
    if ($('#' + 'selectOne' + expense._id).is(':checked')) {
      this.selectedExpenses.push(expense);
    } else {
      this.selectedExpenses.splice(this.selectedExpenses.indexOf(expense), 1);
    }
  }
}
