import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {HttpClient} from "@angular/common/http";
import {ValidateService} from "../../services/validate.service";

declare let $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  activeStep = 1;
  userForm: FormGroup;
  codeForm: FormGroup;
  formErrors = {
    'name': '',
    'username': '',
    'email': '',
    'password': '',
    'phone': '',
    'code': ''
  };
  validationMessages = {
    'name': {
      'required': 'Please enter your name',
    },
    'username': {
      'required': 'Please enter your username',
    },
    'email': {
      'required': 'Please enter your email',
      'email': 'Please enter a valid email'
    },
    'password': {
      'required': 'Please enter your password',
      'pattern': 'The password must contain numbers and letters',
      'minlength': 'Please enter more than 4 characters',
      'maxlength': 'Please enter less than 25 characters',
    },
    'phone': {
      'required': 'Please enter your phone number',
      'pattern': 'Please enter a valid phone number',
      'minlength': 'Please enter a valid phone number',
      'maxlength': 'Please enter a valid phone number',
    },
    'code': {
      'required': 'Please enter the code received via SMS',
    },
  };

  constructor(private router: Router,
              private fb: FormBuilder,
              private authService: AuthService,
              private http: HttpClient,
              private validateService: ValidateService) { }

  ngOnInit() {
    $('body').css('overflow', 'hidden');
    this.buildForm();
  }

  buildForm() {
    this.userForm = this.fb.group({
      'name': ['', [
        Validators.required,
      ]
      ],
      'username': ['', [
        Validators.required,
      ]
      ],
      'email': ['', [
        Validators.required,
        Validators.email
      ]
      ],
      'password': ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25)
      ]
      ],
      'phone': ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('^\\d+$')
      ]
      ],
    });

    this.codeForm = this.fb.group({
      'code': ['', [
        Validators.required,
      ]
      ]});

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

    const formCode = this.codeForm;
    const field = this.formErrors.code;
      if (Object.prototype.hasOwnProperty.call(this.formErrors, field)) {
        this.formErrors[field] = '';
        const control = formCode.get(field);
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

  register() {

    const user = {
      name: this.userForm.value.name,
      username: this.userForm.value.username,
      email: this.userForm.value.email,
      password: this.userForm.value.password,
      phone: this.userForm.value.phone
    };

    // Validations

    if (!this.validateService.validateRegister(user)) {
      // this.flashMessages.show('Please fill in all fields.', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    if (!this.validateService.validateEmail(user.email)) {
      // this.flashMessages.show('Please use a valid email.', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Register a new user
    this.authService.registerUser(user).subscribe((response: any) => {
        if (response.success) {
          // this.flashMessages.show('You have registered successfully and you can login now', {cssClass: 'alert-success', timeout: 3000});
          this.router.navigateByUrl('/login');
        } else {
          // this.flashMessages.show('Something went wrong. We will investigate ASAP.', {cssClass: 'alert-danger', timeout: 3000});
        }
      });
  }

}
