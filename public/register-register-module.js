(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["register-register-module"],{

/***/ "./src/app/components/register/register.component.html":
/*!*************************************************************!*\
  !*** ./src/app/components/register/register.component.html ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"column\" fxFlexFill fxLayoutAlign=\"center center\" style=\"background-image:url('../../../../assets/login11.jpg');\nheight: 100%;\nbackground-repeat: no-repeat;\nbackground-position: center;\nbackground-size: cover; \">\n  <div fxLayout=\"column\" >\n\n    <div class=\" mat-elevation-z4\">\n      <mat-card style=\"width: 550px;\">\n        <mat-card-title>wSpend - Register\n        </mat-card-title>\n        <mat-card-content>\n          <ng-container *ngIf=\"activeStep == 1\">\n            <form fxLayout=\"column\" fxLayoutAlign=\"start stretch\" [formGroup]=\"userForm\">\n              <mat-form-field class=\"full-width\">\n                <input type=\"text\" id=\"name\" class=\"input\" placeholder=\"Please enter your name\"\n                       formControlName=\"name\" required matInput>\n              </mat-form-field>\n              <div *ngIf=\"formErrors.name\" class=\"help is-danger\">\n                {{ formErrors.name }}\n              </div>\n              <mat-form-field class=\"full-width\">\n                <input type=\"text\" id=\"username\" class=\"input\" placeholder=\"Please enter your username\"\n                       formControlName=\"username\" required matInput>\n              </mat-form-field>\n              <div *ngIf=\"formErrors.username\" class=\"help is-danger\">\n                {{ formErrors.username }}\n              </div>\n              <mat-form-field class=\"full-width\">\n                <input type=\"email\" id=\"email\" class=\"input\" placeholder=\"Please enter your email\"\n                       formControlName=\"email\" required matInput>\n              </mat-form-field>\n              <div *ngIf=\"formErrors.email\" class=\"help is-danger\">\n                {{ formErrors.email }}\n              </div>\n              <mat-form-field class=\"full-width\">\n                <input type=\"password\" id=\"password\" class=\"input\" placeholder=\"please  enter your password\"\n                       formControlName=\"password\" required matInput>\n              </mat-form-field>\n              <div *ngIf=\"formErrors.password\" class=\"help is-danger\">\n                {{ formErrors.password }}\n              </div>\n              <mat-form-field class=\"full-width\">\n                <input type=\"text\" id=\"phone\" class=\"input\" placeholder=\"Please enter your phone number\"\n                       formControlName=\"phone\" required matInput>\n              </mat-form-field>\n              <div *ngIf=\"formErrors.phone\" class=\"help is-danger\">\n                {{ formErrors.phone }}\n              </div>\n              <button mat-raised-button color=\"primary\" type=\"submit\" [disabled]=\"!userForm.valid\" (click)=\"register()\">register</button>\n            </form>\n          </ng-container>\n\n          <ng-container *ngIf=\"activeStep == 2\">\n            <form fxLayout=\"column\" fxLayoutAlign=\"start stretch\" [formGroup]=\"codeForm\">\n            <mat-form-field class=\"full-width\">\n              <input type=\"text\" id=\"code\" class=\"input\" placeholder=\"Please enter the code received via SMS\"\n                     formControlName=\"code\" required matInput>\n            </mat-form-field>\n            <div *ngIf=\"formErrors.code\" class=\"help is-danger\">\n              {{ formErrors.code }}\n            </div>\n              <button mat-raised-button color=\"primary\" type=\"submit\" [disabled]=\"!codeForm.valid\" (click)=\"register()\">register</button>\n            </form>\n          </ng-container>\n        </mat-card-content>\n      </mat-card>\n    </div>\n  </div>\n</div>\n\n"

/***/ }),

/***/ "./src/app/components/register/register.component.scss":
/*!*************************************************************!*\
  !*** ./src/app/components/register/register.component.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/register/register.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/components/register/register.component.ts ***!
  \***********************************************************/
/*! exports provided: RegisterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterComponent", function() { return RegisterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _services_validate_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/validate.service */ "./src/app/services/validate.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(router, fb, authService, http, validateService) {
        this.router = router;
        this.fb = fb;
        this.authService = authService;
        this.http = http;
        this.validateService = validateService;
        this.activeStep = 1;
        this.formErrors = {
            'name': '',
            'username': '',
            'email': '',
            'password': '',
            'phone': '',
            'code': ''
        };
        this.validationMessages = {
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
    }
    RegisterComponent.prototype.ngOnInit = function () {
        $('body').css('overflow', 'hidden');
        this.buildForm();
    };
    RegisterComponent.prototype.buildForm = function () {
        var _this = this;
        this.userForm = this.fb.group({
            'name': ['', [
                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required,
                ]
            ],
            'username': ['', [
                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required,
                ]
            ],
            'email': ['', [
                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required,
                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].email
                ]
            ],
            'password': ['', [
                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(6),
                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(25)
                ]
            ],
            'phone': ['', [
                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required,
                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(10),
                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(10),
                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern('^\\d+$')
                ]
            ],
        });
        this.codeForm = this.fb.group({
            'code': ['', [
                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required,
                ]
            ]
        });
        this.userForm.valueChanges.subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged();
    };
    RegisterComponent.prototype.onValueChanged = function (data) {
        if (!this.userForm) {
            return;
        }
        var form = this.userForm;
        for (var field_1 in this.formErrors) {
            if (Object.prototype.hasOwnProperty.call(this.formErrors, field_1)) {
                this.formErrors[field_1] = '';
                var control = form.get(field_1);
                if (control && control.dirty && !control.valid) {
                    var messages = this.validationMessages[field_1];
                    for (var key in control.errors) {
                        if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
                            this.formErrors[field_1] += messages[key] + ' ';
                        }
                    }
                }
            }
        }
        var formCode = this.codeForm;
        var field = this.formErrors.code;
        if (Object.prototype.hasOwnProperty.call(this.formErrors, field)) {
            this.formErrors[field] = '';
            var control = formCode.get(field);
            if (control && control.dirty && !control.valid) {
                var messages = this.validationMessages[field];
                for (var key in control.errors) {
                    if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
                        this.formErrors[field] += messages[key] + ' ';
                    }
                }
            }
        }
    };
    RegisterComponent.prototype.register = function () {
        var _this = this;
        var user = {
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
        this.authService.registerUser(user).subscribe(function (response) {
            if (response.success) {
                // this.flashMessages.show('You have registered successfully and you can login now', {cssClass: 'alert-success', timeout: 3000});
                _this.router.navigateByUrl('/login');
            }
            else {
                // this.flashMessages.show('Something went wrong. We will investigate ASAP.', {cssClass: 'alert-danger', timeout: 3000});
            }
        });
    };
    RegisterComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-register',
            template: __webpack_require__(/*! ./register.component.html */ "./src/app/components/register/register.component.html"),
            styles: [__webpack_require__(/*! ./register.component.scss */ "./src/app/components/register/register.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _services_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"],
            _services_validate_service__WEBPACK_IMPORTED_MODULE_5__["ValidateService"]])
    ], RegisterComponent);
    return RegisterComponent;
}());



/***/ }),

/***/ "./src/app/components/register/register.module.ts":
/*!********************************************************!*\
  !*** ./src/app/components/register/register.module.ts ***!
  \********************************************************/
/*! exports provided: RegisterModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterModule", function() { return RegisterModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _register_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./register.component */ "./src/app/components/register/register.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var routes = [
    { path: '', component: _register_component__WEBPACK_IMPORTED_MODULE_2__["RegisterComponent"] },
];
var RegisterModule = /** @class */ (function () {
    function RegisterModule() {
    }
    RegisterModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatCardModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_5__["FlexLayoutModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatButtonToggleModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatToolbarModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ReactiveFormsModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes)
            ],
            declarations: [
                _register_component__WEBPACK_IMPORTED_MODULE_2__["RegisterComponent"],
            ],
            exports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"]
            ],
            providers: []
        })
    ], RegisterModule);
    return RegisterModule;
}());



/***/ })

}]);
//# sourceMappingURL=register-register-module.js.map