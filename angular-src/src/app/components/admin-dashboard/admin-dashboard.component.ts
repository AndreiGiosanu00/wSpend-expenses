import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {LoadingService} from "../../services/loading.service";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  users = [];

  constructor(private authService: AuthService,
              private loadingService: LoadingService) { }

  ngOnInit() {
    this.authService.getAllUsers().subscribe((result: any) => {
      this.users = result.users;
    });
  }

}
