import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ValidateService} from "../../services/validate.service";
import {DatePipe} from "@angular/common";
import {LoadingService} from "../../services/loading.service";

declare let $: any;

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss']
})
export class GoalsComponent implements OnInit {

  private validators = {
    name: '',
    category: '',
    price: '',
    expiresAt: '',
  };

  private moneyValidator = '';

  private goals = [];
  private localGoal = {
    name: '',
    category: '',
    expiresAt: '',
    price: '',
    username: '',
    moneyInvested: 0,
    _id: '',
    lastInvestedDate: '',
    status: ''
  };

  constructor(private authService: AuthService,
              private validateService: ValidateService,
              private datePipe: DatePipe,
              private loadingService: LoadingService) { }

  ngOnInit() {
    $('#addGoalModal').appendTo('body');
    $('#manageModal').appendTo('body');
    $('#editGoalModal').appendTo('body');
    $('#deleteGoalModal').appendTo('body');

    this.loadingService.show();
    this.authService.getAllGoals().subscribe((result: any) => {
      this.goals = result.goals;
      this.loadingService.hide();

      this.goals.forEach((goal) => {
        this.verifyStatus(goal);
      });
    });
  }

  verifyStatus(goal) {
    let lastDate = new Date( goal.lastInvestedDate.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
    let createdOn = new Date( goal.createdOn.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
    let expiresAt = new Date( goal.expiresAt.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
    let currentDate = new Date();

    if (this.daysBetween(createdOn, expiresAt) <= 0) {
      let newGoal = goal;
      newGoal.status = 'Expired';
      this.loadingService.show();
      this.authService.updateGoal(newGoal).subscribe((result) => {
        this.authService.getAllGoals().subscribe((result: any) => {
          this.goals = result.goals;
          this.loadingService.hide();
        });
      });
    } else {
      if (this.daysBetween(lastDate, currentDate) > 28) {
        let newGoal = goal;
        newGoal.status = 'Inactive';
        this.loadingService.show();
        this.authService.updateGoal(newGoal).subscribe((result) => {
          this.authService.getAllGoals().subscribe((result: any) => {
            this.goals = result.goals;
            this.loadingService.hide();
          });
        });
      } else {
        if (goal.status !== 'Active') {
          let newGoal = goal;
          newGoal.status = 'Active';
          this.loadingService.show();
          this.authService.updateGoal(newGoal).subscribe((result) => {
            this.authService.getAllGoals().subscribe((result: any) => {
              this.goals = result.goals;
              this.loadingService.hide();
            });
          });
        }
      }
    }
  }

  setupModal(goal?: any) {
    if (goal) {
      this.localGoal = goal;
      console.log(this.localGoal.moneyInvested);
      $('#manageInvest').val('');
      $('#editName').val(this.localGoal.name);
      $('#editCategory').val(this.localGoal.category);
      $('#editPrice').val(this.localGoal.price);
      $('#editExpiresAt').val(this.datePipe.transform(this.localGoal.expiresAt, 'yyyy-MM-dd'));
    } else {
      $('#addName').val('');
      $('#addCategory').val('');
      $('#addPrice').val('');
      $('#addExpiresAt').val(this.datePipe.transform('', 'yyyy-MM-dd'));
    }
  }
  
  addGoal() {
    this.localGoal.name = $('#addName').val();
    this.localGoal.category = $('#addCategory').val();
    this.localGoal.price = $('#addPrice').val();
    let date = new Date( $('#addExpiresAt').val().replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3") );
    this.localGoal.expiresAt = date.toString();
    this.localGoal.username = JSON.parse(localStorage.getItem('user')).username;

    this.validators = this.validateService.validateGoal(this.localGoal);

    if (!this.validators.name && !this.validators.category && !this.validators.price && !this.validators.expiresAt) {
      this.authService.addGoal(this.localGoal).subscribe((result) => {
        // add alerts
        this.authService.getAllGoals().subscribe((result: any) => {
          this.goals = result.goals;
        });
      });
      $('#addGoalModal').modal('hide');
    }

  }

  deleteGoal() {
    this.authService.deleteGoal(this.localGoal._id).subscribe((result) => {
      // afisezi alerta
      this.authService.getAllGoals().subscribe((result: any) => {
        this.goals = result.goals;
      });
    });
  }

  editGoal() {
    this.localGoal.name = $('#editName').val();
    this.localGoal.category = $('#editCategory').val();
    this.localGoal.price = $('#editPrice').val();
    let date = new Date( $('#editExpiresAt').val().replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3") );
    if (date.toString() !== 'Invalid Date') {
      this.localGoal.expiresAt = date.toString();
    }
    this.localGoal.username = JSON.parse(localStorage.getItem('user')).username;

    this.validators = this.validateService.validateGoal(this.localGoal);

    if (!this.validators.name && !this.validators.category && !this.validators.price && !this.validators.expiresAt) {
      this.authService.updateGoal(this.localGoal).subscribe((result) => {
        // add alerts
        this.authService.getAllGoals().subscribe((result: any) => {
          this.goals = result.goals;
          this.goals.forEach((goal) => {
            this.verifyStatus(goal);
          });
        });
      });
      $('#editGoalModal').modal('hide');
    }
  }

  invest() {
    this.moneyValidator = this.validateService.validateMoney($('#manageInvest').val());

    if (this.moneyValidator === '') {
      this.localGoal.moneyInvested += (+$('#manageInvest').val());
      let date = new Date();
      this.localGoal.lastInvestedDate = date.toString();
      this.localGoal.status = 'Active';
      this.authService.updateGoal(this.localGoal).subscribe((result) => {
        // add alerts
        this.authService.getAllGoals().subscribe((result: any) => {
          this.goals = result.goals;
        });
      });
      $('#manageModal').modal('hide');
    }
  }

  treatAsUTC(date): any {
    let result = new Date(date);
    result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
    return result;
  }

  daysBetween(startDate: any, endDate: any) {
    let millisecondsPerDay = 24 * 60 * 60 * 1000;
    return (this.treatAsUTC(endDate) - this.treatAsUTC(startDate)) / millisecondsPerDay;
  }

}
