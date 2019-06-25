import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ValidateService} from "../../services/validate.service";
import {DatePipe} from "@angular/common";

declare let $: any;

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss']
})
export class GoalsComponent implements OnInit {

  private validators = {

  };

  private goals = [];
  private localGoal = {
    name: '',
    category: '',
    expiresAt: '',
    price: '',
    username: '',
    moneyInvested: 0,
    _id: ''
  };
  private sumToInvest = 0;

  constructor(private authService: AuthService,
              private validateService: ValidateService,
              private datePipe: DatePipe) { }

  ngOnInit() {
    $('#addGoalModal').appendTo('body');
    $('#manageModal').appendTo('body');
    $('#editGoalModal').appendTo('body');
    $('#deleteGoalModal').appendTo('body');

    this.authService.getAllGoals().subscribe((result: any) => {
      this.goals = result.goals;
    });
  }

  setupModal(goal?: any) {
    if (goal) {
      this.localGoal = goal;
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

    this.authService.addGoal(this.localGoal).subscribe((result) => {
      // add alerts
      this.authService.getAllGoals().subscribe((result: any) => {
        this.goals = result.goals;
      });
    });
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

    this.authService.updateGoal(this.localGoal).subscribe((result) => {
      // add alerts
      this.authService.getAllGoals().subscribe((result: any) => {
        this.goals = result.goals;
      });
    });
  }

  invest() {
    this.localGoal.moneyInvested += (+$('#manageInvest').val());
    this.authService.updateGoal(this.localGoal).subscribe((result) => {
      // add alerts
      this.authService.getAllGoals().subscribe((result: any) => {
        this.goals = result.goals;
      });
    });
  }

}
