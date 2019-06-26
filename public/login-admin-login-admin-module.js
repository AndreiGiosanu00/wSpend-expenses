(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["login-admin-login-admin-module"],{

/***/ "./src/app/components/login-admin/login-admin.component.html":
/*!*******************************************************************!*\
  !*** ./src/app/components/login-admin/login-admin.component.html ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"column\" fxFlexFill fxLayoutAlign=\"center center\" style=\"background-image:url('../../../../assets/login11.jpg');\nheight: 100%;\nbackground-repeat: no-repeat;\nbackground-position: center;\nbackground-size: cover; \">\n  <div fxLayout=\"column\" >\n    <div *ngIf=\"alertsService.dangerAlert.active\" class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\" style=\"margin-top: 15px; margin-bottom: 5px;\">\n      {{alertsService.dangerAlert.text}}\n      <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\" (click)=\"closeDangerAlert()\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n    </div>\n    <div class=\" mat-elevation-z4\">\n      <mat-card style=\"width: 550px;\">\n        <mat-card-title>wSpend - Admin Login\n        </mat-card-title>\n        <mat-card-content>\n          <form fxLayout=\"column\" fxLayoutAlign=\"start stretch\" [formGroup]=\"userForm\" (ngSubmit)=\"login()\">\n            <mat-form-field class=\"full-width\">\n              <input type=\"text\" id=\"username\" class=\"input\" placeholder=\"Please enter your username\"\n                     formControlName=\"username\" required matInput>\n            </mat-form-field>\n            <div *ngIf=\"formErrors.username\" class=\"help is-danger\">\n              {{ formErrors.username }}\n            </div>\n            <mat-form-field class=\"full-width\">\n              <input type=\"password\" id=\"password\" class=\"input\" placeholder=\"Please  enter your password\"\n                     formControlName=\"password\" required matInput>\n            </mat-form-field>\n            <div *ngIf=\"formErrors.password\" class=\"help is-danger\">\n              {{ formErrors.password }}\n            </div>\n            <button mat-raised-button color=\"primary\" type=\"submit\" [disabled]=\"!userForm.valid\" (click)=\"login()\">log in</button>\n          </form>\n        </mat-card-content>\n      </mat-card>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/components/login-admin/login-admin.component.scss":
/*!*******************************************************************!*\
  !*** ./src/app/components/login-admin/login-admin.component.scss ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/login-admin/login-admin.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/components/login-admin/login-admin.component.ts ***!
  \*****************************************************************/
/*! exports provided: LoginAdminComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginAdminComponent", function() { return LoginAdminComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/auth.service */ "./src/app/services/auth.service.ts");
/* harmony import */ var _services_alerts_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/alerts.service */ "./src/app/services/alerts.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var LoginAdminComponent = /** @class */ (function () {
    function LoginAdminComponent(router, fb, authService, http, alertsService) {
        this.router = router;
        this.fb = fb;
        this.authService = authService;
        this.http = http;
        this.alertsService = alertsService;
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
    LoginAdminComponent.prototype.ngOnInit = function () {
        $('body').css('overflow', 'hidden');
        this.buildForm();
    };
    LoginAdminComponent.prototype.buildForm = function () {
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
    LoginAdminComponent.prototype.onValueChanged = function (data) {
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
    LoginAdminComponent.prototype.login = function () {
        var _this = this;
        var user = {
            username: this.userForm.value.username,
            password: this.userForm.value.password
        };
        this.authService.loginAdmin(user).subscribe(function (response) {
            if (response.success) {
                response.user.role = 'admin';
                localStorage.setItem('admin', JSON.stringify({ logged: true }));
                _this.authService.storeUserData(response.token, response.user);
                // this.flashMessages.show('You have successfully login!', {cssClass: 'alert-success', timeout: 3000});
                _this.router.navigateByUrl('/auth/admin');
            }
            else {
                _this.alertsService.dangerAlert = {
                    active: true,
                    text: response.msg
                };
                // this.flashMessages.show(response.msg, {cssClass: 'alert-danger', timeout: 5000});
                _this.router.navigateByUrl('/admin/login');
            }
        });
    };
    LoginAdminComponent.prototype.closeDangerAlert = function () {
        this.alertsService.dangerAlert.active = false;
    };
    LoginAdminComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-login-admin',
            template: __webpack_require__(/*! ./login-admin.component.html */ "./src/app/components/login-admin/login-admin.component.html"),
            styles: [__webpack_require__(/*! ./login-admin.component.scss */ "./src/app/components/login-admin/login-admin.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _services_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"],
            _services_alerts_service__WEBPACK_IMPORTED_MODULE_5__["AlertsService"]])
    ], LoginAdminComponent);
    return LoginAdminComponent;
}());



/***/ }),

/***/ "./src/app/components/login-admin/login-admin.module.ts":
/*!**************************************************************!*\
  !*** ./src/app/components/login-admin/login-admin.module.ts ***!
  \**************************************************************/
/*! exports provided: LoginAdminModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginAdminModule", function() { return LoginAdminModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _login_admin_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./login-admin.component */ "./src/app/components/login-admin/login-admin.component.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../services/auth.service */ "./src/app/services/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var routes = [
    { path: '', component: _login_admin_component__WEBPACK_IMPORTED_MODULE_6__["LoginAdminComponent"] },
];
var LoginAdminModule = /** @class */ (function () {
    function LoginAdminModule() {
    }
    LoginAdminModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatCardModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_3__["FlexLayoutModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatButtonToggleModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatToolbarModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [
                _login_admin_component__WEBPACK_IMPORTED_MODULE_6__["LoginAdminComponent"],
            ],
            exports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"]
            ],
            providers: [
                _services_auth_service__WEBPACK_IMPORTED_MODULE_7__["AuthService"]
            ]
        })
    ], LoginAdminModule);
    return LoginAdminModule;
}());



/***/ })

}]);
//# sourceMappingURL=login-admin-login-admin-module.js.map