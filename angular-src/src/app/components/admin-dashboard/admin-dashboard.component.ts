import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {LoadingService} from "../../services/loading.service";
import {AlertsService} from "../../services/alerts.service";

declare let $: any;

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  users = [];

  localUser = {
    name: '',
    username: '',
    role: '',
    status: '',
    _id: ''
  };

  constructor(private authService: AuthService,
              private loadingService: LoadingService,
              private alertsService: AlertsService) { }

  ngOnInit() {

    $('#addUserModal').appendTo('body');
    $('#deleteUserModal').appendTo('body');
    $('#editUserModal').appendTo('body');

    this.loadingService.show();
    this.authService.getAllUsers().subscribe((result: any) => {
      this.users = result.users;
      this.loadingService.hide();
    });
  }

  updateLocalUser(user?) {

    if (user) {
      $('#editName').val(user.name);
      $('#editUsername').val(user.username);
      $('#editStatus').val(user.status);
      $('#editRole').val(user.role);
      this.localUser._id = user._id;
      this.localUser.name = user.name;
    } else {
        $('#addName').val('');
      $('#addUsername').val('');
      $('#addEmail').val('');
      $('#addPhone').val('');
      $('#addPassword').val('');
      $('#addStatus').val('');
      $('#addRole').val('');
    }

  }

  addUser() {
      let newUser = {
        name: $('#addName').val(),
        username: $('#addUsername').val(),
        email: $('#addEmail').val(),
        phone: $('#addPhone').val(),
        password: $('#addPassword').val(),
        status: $('#addStatus').val(),
        role: $('#addRole').val(),
      };

      this.loadingService.show();
      this.authService.addUser(newUser).subscribe((result: any) => {
        if (result.success) {
          this.alertsService.infoAlert = {
            active: true,
            text: 'User successfully added.'
          };
        } else {
          this.alertsService.dangerAlert = {
            active: true,
            text: 'Error. Failed to add user.'
          };
        }
        this.authService.getAllUsers().subscribe((res: any) => {
          this.users = res.users;
          this.loadingService.hide();
        });
        $('#addUserModal').modal('hide');
      });
  }

  editUser() {
    let editedUser = {
      name: $('#editName').val(),
      username: $('#editUsername').val(),
      status: $('#editStatus').val(),
      role: $('#editRole').val(),
      _id: this.localUser._id
    };

    this.loadingService.show();
    this.authService.changeRole(editedUser).subscribe((res: any) => {
      if (res.success) {
        this.alertsService.infoAlert = {
          active: true,
          text: 'User ' + editedUser.name + ' have been successfully edited.'
        };
      } else {
        this.alertsService.dangerAlert = {
          active: true,
          text: 'Error. Failed to edit user.'
        };
      }
      this.authService.getAllUsers().subscribe((result: any) => {
        this.users = result.users;
        this.loadingService.hide();
      });
      $('#editUserModal').modal('hide');
    })
  }

  deleteUser() {
    this.loadingService.show();
    this.authService.deleteUser(this.localUser._id).subscribe((result: any) => {
      if (result.success) {
        this.alertsService.infoAlert = {
          active: true,
          text: 'User ' + this.localUser.name + ' successfully deleted.'
        };
      } else {
        this.alertsService.dangerAlert = {
          active: true,
          text: 'Error. Failed to delete user.'
        };
      }
      this.authService.getAllUsers().subscribe((result: any) => {
        this.users = result.users;
        this.loadingService.hide();
      });
    });
  }

}
