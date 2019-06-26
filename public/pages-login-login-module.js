(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-login-login-module"],{

/***/ "./src/app/components/pages/login/login.component.html":
/*!*************************************************************!*\
  !*** ./src/app/components/pages/login/login.component.html ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"column\" fxFlexFill fxLayoutAlign=\"center center\" style=\"background-image:url('../../../../assets/login11.jpg');\nheight: 100%;\nbackground-repeat: no-repeat;\nbackground-position: center;\nbackground-size: cover; \">\n    <div fxLayout=\"column\" >\n        <div *ngIf=\"alertsService.dangerAlert.active\" class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\" style=\"margin-top: 15px; margin-bottom: 5px;\">\n            {{alertsService.dangerAlert.text}}\n            <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\" (click)=\"closeDangerAlert()\">\n                <span aria-hidden=\"true\">&times;</span>\n            </button>\n        </div>\n        <div *ngIf=\"activeStep == 1\" class=\" mat-elevation-z4\">\n            <mat-card style=\"width: 550px;\">\n                <mat-card-title>wSpend - Login\n                    <a class=\"redirect\" [routerLink]=\"['/register']\" style=\"margin-left: 200px;\">Register an account</a>\n                </mat-card-title>\n                <mat-card-content>\n                    <form fxLayout=\"column\" fxLayoutAlign=\"start stretch\" [formGroup]=\"userForm\" (ngSubmit)=\"login()\">\n                        <mat-form-field class=\"full-width\">\n                          <input type=\"text\" id=\"username\" class=\"input\" placeholder=\"Please enter your username\"\n                                 formControlName=\"username\" required matInput>\n                        </mat-form-field>\n                        <div *ngIf=\"formErrors.username\" class=\"help is-danger\">\n                            {{ formErrors.username }}\n                        </div>\n                        <mat-form-field class=\"full-width\">\n                            <input type=\"password\" id=\"password\" class=\"input\" placeholder=\"Please  enter your password\"\n                            formControlName=\"password\" required matInput>\n                        </mat-form-field>\n                        <div *ngIf=\"formErrors.password\" class=\"help is-danger\">\n                            {{ formErrors.password }}\n                        </div>\n                        <button mat-raised-button color=\"primary\" type=\"submit\" [disabled]=\"!userForm.valid\" (click)=\"login()\">log in</button>\n                    </form>\n                </mat-card-content>\n            </mat-card>\n        </div>\n\n        <div *ngIf=\"activeStep == 2\" class=\" mat-elevation-z4\">\n            <mat-card style=\"width: 550px;\">\n                <mat-card-title>wSpend - Login (Code verification)\n                </mat-card-title>\n                <mat-card-content>\n                    <form fxLayout=\"column\" fxLayoutAlign=\"start stretch\" [formGroup]=\"userForm\" (ngSubmit)=\"login()\">\n                        <mat-form-field class=\"full-width\">\n                            <input type=\"text\" id=\"code\" class=\"input\" placeholder=\"Please enter the code received by SMS\"\n                                   required matInput>\n                        </mat-form-field>\n                        <button mat-raised-button color=\"primary\" type=\"submit\" [disabled]=\"!userForm.valid\" (click)=\"login()\">log in</button>\n                    </form>\n                </mat-card-content>\n            </mat-card>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/app/components/pages/login/login.component.scss":
/*!*************************************************************!*\
  !*** ./src/app/components/pages/login/login.component.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".sigin-conainer {\n  min-height: 100%;\n  background-size: cover;\n  padding: 100px; }\n\n.sigin-main {\n  position: relative;\n  margin: 0 auto;\n  width: 500px; }\n\n.full-width {\n  width: 100%; }\n\n.redirect {\n  font-size: 14px;\n  margin-left: 10px;\n  color: #00AAAA; }\n"

/***/ }),

/***/ "./src/app/components/pages/login/login.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/components/pages/login/login.component.ts ***!
  \***********************************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _services_alerts_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/alerts.service */ "./src/app/services/alerts.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var LoginComponent = /** @class */ (function () {
    function LoginComponent(router, fb, authService, http, alertsService) {
        this.router = router;
        this.fb = fb;
        this.authService = authService;
        this.http = http;
        this.alertsService = alertsService;
        this.activeStep = 1;
        this.formErrors = {
            'username': '',
            'password': ''
        };
        this.validationMessages = {
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
    }
    LoginComponent.prototype.ngOnInit = function () {
        $('body').css('overflow', 'hidden');
        this.buildForm();
    };
    LoginComponent.prototype.buildForm = function () {
        var _this = this;
        this.userForm = this.fb.group({
            'username': ['', [
                    _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required,
                ]
            ],
            'password': ['', [
                    _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
                    _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(6),
                    _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(25)
                ]
            ],
        });
        this.userForm.valueChanges.subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged();
    };
    LoginComponent.prototype.onValueChanged = function (data) {
        if (!this.userForm) {
            return;
        }
        var form = this.userForm;
        for (var field in this.formErrors) {
            if (Object.prototype.hasOwnProperty.call(this.formErrors, field)) {
                this.formErrors[field] = '';
                var control = form.get(field);
                if (control && control.dirty && !control.valid) {
                    var messages = this.validationMessages[field];
                    for (var key in control.errors) {
                        if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
                            this.formErrors[field] += messages[key] + ' ';
                        }
                    }
                }
            }
        }
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        var user = {
            username: this.userForm.value.username,
            password: this.userForm.value.password
        };
        if (this.activeStep == 2) {
            var code = $('#code').val();
            this.authService.checkSMSCode(code).subscribe(function (response) {
                if (response.success) {
                    _this.router.navigateByUrl('/auth/dashboard');
                }
                else {
                    _this.alertsService.dangerAlert = {
                        active: true,
                        text: response.msg
                    };
                    localStorage.clear();
                    _this.router.navigateByUrl('/login');
                }
            });
        }
        if (this.activeStep == 1) {
            this.authService.authenticateUser(user).subscribe(function (response) {
                if (response.success) {
                    _this.authService.storeUserData(response.token, response.user);
                    user['phone'] = response.user.phone;
                    _this.authService.sendSMS(user).subscribe(function (res) {
                        if (!res.success) {
                            _this.alertsService.dangerAlert = {
                                active: true,
                                text: response.msg
                            };
                        }
                    });
                }
                else {
                    _this.alertsService.dangerAlert = {
                        active: true,
                        text: response.msg
                    };
                    _this.router.navigateByUrl('/login');
                    _this.activeStep = 1;
                }
            });
            this.activeStep++;
        }
    };
    LoginComponent.prototype.closeDangerAlert = function () {
        this.alertsService.dangerAlert.active = false;
    };
    LoginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/components/pages/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.scss */ "./src/app/components/pages/login/login.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _services_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"],
            _services_alerts_service__WEBPACK_IMPORTED_MODULE_5__["AlertsService"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/components/pages/login/login.module.ts":
/*!********************************************************!*\
  !*** ./src/app/components/pages/login/login.module.ts ***!
  \********************************************************/
/*! exports provided: LoginModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginModule", function() { return LoginModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _login_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login.component */ "./src/app/components/pages/login/login.component.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var routes = [
    { path: '', component: _login_component__WEBPACK_IMPORTED_MODULE_1__["LoginComponent"] },
];
var LoginModule = /** @class */ (function () {
    function LoginModule() {
    }
    LoginModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatCardModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_4__["FlexLayoutModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatButtonToggleModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatToolbarModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ReactiveFormsModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterModule"].forChild(routes),
            ],
            declarations: [
                _login_component__WEBPACK_IMPORTED_MODULE_1__["LoginComponent"],
            ],
            exports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterModule"]
            ],
            providers: []
        })
    ], LoginModule);
    return LoginModule;
}());



/***/ })

}]);
//# sourceMappingURL=pages-login-login-module.js.map