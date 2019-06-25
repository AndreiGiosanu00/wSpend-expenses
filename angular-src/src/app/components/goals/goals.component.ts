import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ValidateService} from "../../services/validate.service";

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
    status: '',
    expiresAt: ''
  };
  private sumToInvest = 0;

  constructor(private authService: AuthService,
              private validateService: ValidateService) { }

  ngOnInit() {
    $('#addGoalModal').appendTo('body');
    $('#manageModal').appendTo('body');

    this.authService.getAllGoals().subscribe((result: any) => {
      this.goals = result.goals;
    });
  }

}
