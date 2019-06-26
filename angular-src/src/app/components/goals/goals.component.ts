import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ValidateService} from "../../services/validate.service";
import {DatePipe} from "@angular/common";
import {LoadingService} from "../../services/loading.service";
import {AlertsService} from "../../services/alerts.service";

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
              private loadingService: LoadingService,
              private alertsService: AlertsService) { }

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
      $('#manageInvest').val('');
      $('#editName').val(this.localGoal.name);
      $('#editCategory').val(this.localGoal.category);
      $('#editPrice').val(this.localGoal.price);

      if (this.localGoal.expiresAt == 'Never') {
        $('#editExpiresAt').val(this.datePipe.transform('', 'yyyy-MM-dd'));
      } else {
        $('#editExpiresAt').val(this.datePipe.transform(this.localGoal.expiresAt, 'yyyy-MM-dd'));
      }

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

    if (!this.validators.name && !this.validators.category && !this.validators.price) {
      this.loadingService.show();
      this.authService.addGoal(this.localGoal).subscribe((result: any) => {
        if (result.success) {
          this.alertsService.infoAlert = {
            active: true,
            text: 'Goal successfully added.'
          };
        } else {
          this.alertsService.dangerAlert = {
            active: true,
            text: 'Error. Failed to add new goal.'
          };
        }
        this.authService.getAllGoals().subscribe((result: any) => {
          this.goals = result.goals;
          this.loadingService.hide();
        });
      });
      $('#addGoalModal').modal('hide');
    }

  }

  deleteGoal() {
    this.loadingService.show();
    this.authService.deleteGoal(this.localGoal._id).subscribe((result: any) => {
      if (result.success) {
        this.alertsService.infoAlert = {
          active: true,
          text: 'Goal successfully deleted.'
        };
      } else {
        this.alertsService.dangerAlert = {
          active: true,
          text: 'Error. Failed to delete goal.'
        };
      }
      this.authService.getAllGoals().subscribe((result: any) => {
        this.goals = result.goals;
        this.loadingService.hide();
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

    if (!this.validators.name && !this.validators.category && !this.validators.price) {
      this.loadingService.show();
      this.authService.updateGoal(this.localGoal).subscribe((result: any) => {
        if (result.success) {
          this.alertsService.infoAlert = {
            active: true,
            text: 'Goal ' + this.localGoal.name + ' successfully edited.'
          };
        } else {
          this.alertsService.dangerAlert = {
            active: true,
            text: 'Error. Failed to edit goal.'
          };
        }
        this.authService.getAllGoals().subscribe((result: any) => {
          this.goals = result.goals;
          this.goals.forEach((goal) => {
            this.verifyStatus(goal);
            this.loadingService.hide();
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
      this.loadingService.show();
      this.authService.updateGoal(this.localGoal).subscribe((result: any) => {
        if (result.success) {
          this.alertsService.infoAlert = {
            active: true,
            text: 'You have invested ' + $('#manageInvest').val() + ' credits in goal ' + this.localGoal.name
          };
        } else {
          this.alertsService.dangerAlert = {
            active: true,
            text: 'Error. Failed to invest in goal.'
          };
        }
        this.authService.getAllGoals().subscribe((result: any) => {
          this.goals = result.goals;
          this.loadingService.hide();
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
