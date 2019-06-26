import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {AuthService} from "../../../services/auth.service";
import {HttpClient} from "@angular/common/http";
import {AlertsService} from "../../../services/alerts.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userForm: FormGroup;
  formErrors = {
    'username': '',
    'password': ''
  };
  validationMessages = {
    'username': {
      'required': 'Please enter your username',
    },
    'password': {
      'required': 'Please enter your password',
      'pattern': 'The password must contain numbers and letters',
      'minlength': 'Please enter more than 4 characters',
      'maxlength': 'Please enter less than 25 characters',
    }
  };

  constructor(private router: Router,
              private fb: FormBuilder,
              private authService: AuthService,
              private http: HttpClient,
              private alertsService: AlertsService) {
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.userForm = this.fb.group({
      'username': ['', [
        Validators.required,
      ]
      ],
      'password': ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25)
      ]
      ],
    });

    this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.userForm) {
      return;
    }
    const form = this.userForm;
    for (const field in this.formErrors) {
      if (Object.prototype.hasOwnProperty.call(this.formErrors, field)) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  login() {
    const user = {
      username: this.userForm.value.username,
      password: this.userForm.value.password
    };

    this.authService.authenticateUser(user).subscribe((response: any) => {
      if (response.success) {
        this.authService.storeUserData(response.token, response.user);
        // this.flashMessages.show('You have successfully login!', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigateByUrl('/auth/dashboard');
      } else {
        this.alertsService.dangerAlert = {
          active: true,
          text: response.msg
        };
        // this.flashMessages.show(response.msg, {cssClass: 'alert-danger', timeout: 5000});
        this.router.navigateByUrl('/login');
      }
    });

  }

  closeDangerAlert() {
    this.alertsService.dangerAlert.active = false;
  }
}

