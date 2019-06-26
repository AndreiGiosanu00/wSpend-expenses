import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {LoadingService} from "../../services/loading.service";
import {AlertsService} from "../../services/alerts.service";

declare let $: any;

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    private user: any;
    private alert = false;

    constructor(private authService: AuthService,
                private loadingService: LoadingService,
                private alertsService: AlertsService) { }

    ngOnInit() {
        this.user = JSON.parse(localStorage.getItem('user'));
    }

    updateUser() {
        let newUser = {
            name: $('#name').val(),
            username: $('#username').val(),
            email: $('#email').val(),
            phone: $('#phone').val(),
            _id: this.user.id
        };
        this.alert = false;
        this.loadingService.show();
        this.authService.updateUser(newUser).subscribe((result: any) => {
            if (result.success) {
                this.alertsService.infoAlert = {
                    active: true,
                    text: 'You have successfully updated your data.'
                };
            } else {
                this.alertsService.dangerAlert = {
                    active: true,
                    text: 'Error. Failed to update data.'
                };
            }
            localStorage.setItem('user', JSON.stringify(
                {
                    name: newUser.name,
                    id: newUser._id,
                    email: newUser.email,
                    phone: newUser.phone,
                    username: newUser.username,
                    foodTarget: this.user.foodTarget,
                    utilitiesTarget: this.user.utilitiesTarget,
                    shoppingTarget: this.user.shoppingTarget,
                    enterainmentTarget: this.user.entertainmentTarget,
                    firstLogin: this.user.firstLogin,
                    role: this.user.role
                }));
            this.ngOnInit();
            this.loadingService.hide();
        });
    }

    updateTargets() {
        let newUser = {
            _id: this.user.id,
            foodTarget: $('#food').val(),
            utilitiesTarget: $('#utilities').val(),
            shoppingTarget: $('#shopping').val(),
            entertainmentTarget: $('#entertainment').val(),
        };

        this.loadingService.show();
        this.authService.changeTargets(newUser).subscribe((result: any) => {
            if (result.success) {
                this.alertsService.infoAlert = {
                    active: true,
                    text: 'You have successfully updated your expense targets.'
                };
            } else {
                this.alertsService.dangerAlert = {
                    active: true,
                    text: 'Error. Failed to update expense targets.'
                };
            }
            localStorage.setItem('user', JSON.stringify(
                {
                    name: this.user.name,
                    id: this.user._id,
                    email: this.user.email,
                    phone: this.user.phone,
                    username: this.user.username,
                    foodTarget: newUser.foodTarget,
                    utilitiesTarget: newUser.utilitiesTarget,
                    shoppingTarget: newUser.shoppingTarget,
                    entertainmentTarget: newUser.entertainmentTarget,
                    firstLogin: this.user.firstLogin,
                    role: this.user.role
                }));
            this.ngOnInit();
            this.loadingService.hide();
        });
    }

}
