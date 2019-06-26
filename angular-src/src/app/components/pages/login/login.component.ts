import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {AuthService} from "../../../services/auth.service";
import {HttpClient} from "@angular/common/http";
import {AlertsService} from "../../../services/alerts.service";

declare let $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  activeStep = 1;
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
    $('body').css('overflow', 'hidden');
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

    if (this.activeStep == 2) {
      let code = $('#code').val();
      this.authService.checkSMSCode(code).subscribe((response: any) => {
        if (response.success) {
          this.router.navigateByUrl('/auth/dashboard');
        } else {
          this.alertsService.dangerAlert = {
            active: true,
            text: response.msg
          };
          localStorage.clear();
          this.router.navigateByUrl('/login');
        }
      });
    }

    if (this.activeStep == 1) {
      this.authService.authenticateUser(user).subscribe((response: any) => {
        if (response.success) {
          this.authService.storeUserData(response.token, response.user);
          user['phone'] = response.user.phone;
          this.authService.sendSMS(user).subscribe((res: any) => {
            if (!res.success) {
              this.alertsService.dangerAlert = {
                active: true,
                text: response.msg
              };
            }
          });
        } else {
          this.alertsService.dangerAlert = {
            active: true,
            text: response.msg
          };
          this.router.navigateByUrl('/login');
          this.activeStep = 1;
        }
      });
      this.activeStep ++;
    }



  }

  closeDangerAlert() {
    this.alertsService.dangerAlert.active = false;
  }
}

