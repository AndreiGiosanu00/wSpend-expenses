import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {DatePipe} from "@angular/common";

declare let $: any;

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {

  private expenses: any[];
  private localExpense = {name: '', price: '', _id: '', category: '', date: '', username: ''};
  private selectedExpenses: any[] = [];

  constructor(private authService: AuthService,
              private router: Router,
              private datePipe: DatePipe) {}

  ngOnInit() {
    // Fix the modal backdrop issue.
    $('#deleteOneExpenseModal').appendTo('body');
    $('#deleteMultipleExpenseModal').appendTo('body');
    $('#addExpenseModal').appendTo('body');
    $('#editEmployeeModal').appendTo('body');

    this.authService.getAllExpenses().subscribe((result: any) => {
      this.expenses = result.expenses;
    });
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
    }
  }

  addExpense() {
    this.localExpense.name = $('#addName').val();
    this.localExpense.category = $('#addCategory').val();
    this.localExpense.price = $('#addPrice').val();
    let date = new Date( $('#addDate').val().replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3") );
    this.localExpense.date = date.toString();
    this.localExpense.username = JSON.parse(localStorage.getItem('user')).username;

    this.authService.addExpense(this.localExpense).subscribe((result) => {
      // add alerts
      this.authService.getAllExpenses().subscribe((result: any) => {
        this.expenses = result.expenses;
      });
    });
  }

  deleteMultiple() {

  }

  deleteOne() {
    this.authService.deleteExpense(this.localExpense._id).subscribe((result) => {
      // afisezi alerta
      this.authService.getAllExpenses().subscribe((result: any) => {
        this.expenses = result.expenses;
      });
    });
  }

  editExpense() {
    this.localExpense.name = $('#editName').val();
    this.localExpense.category = $('#editCategory').val();
    this.localExpense.price = $('#editPrice').val();
    let date = new Date( $('#editDate').val().replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3") );
    this.localExpense.date = date.toString();

    this.authService.updateExpense(this.localExpense).subscribe((result) => {
      // add alerts
      this.authService.getAllExpenses().subscribe((result: any) => {
        this.expenses = result.expenses;
      });
    });
  }

  selectAll() {
    if ($('#selectAll').is(':checked')) {
      $('#selectOne').prop('checked', true);
      this.selectedExpenses = this.expenses;
    } else {
      $('#selectOne').prop('checked', false);
      this.selectedExpenses = [];
    }
  }

  selectOne(expense: any) {
    if ($('#selectOne').is(':checked')) {
      this.selectedExpenses.push(expense);
    } else {
      this.selectedExpenses.splice(this.selectedExpenses.indexOf(expense), 1);
    }
  }
}
