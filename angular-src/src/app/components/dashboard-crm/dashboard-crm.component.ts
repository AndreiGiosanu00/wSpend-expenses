import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {AlertsService} from "../../services/alerts.service";

@Component({
    selector: 'app-dashboard-crm',
    templateUrl: './dashboard-crm.component.html',
    styleUrls: ['./dashboard-crm.component.scss']
})

export class DashboardCrmComponent implements OnInit {

    public dashCard = [];
    private data = {
        food: 0,
        utilities: 0,
        entertainment: 0,
        shopping: 0
    };

    private firstFourActiveGoals : {
        name: string,
        moneyInvested: string,
        price: string
    }[] = [];

    constructor(private authService: AuthService,
                private alertsService: AlertsService) { }

    ngOnInit() {
        this.authService.getAllExpenses().subscribe((result: any) => {
            let expenses = result.expenses;
            let currentDate = new Date();
            expenses.forEach((expense) => {
                let expenseDate = new Date(expense.date);
                if (currentDate.getMonth() == expenseDate.getMonth()) {
                    if (expense.category == 'Food') {
                        this.data.food += (+expense.price);
                    }
                    if (expense.category == 'Utilities') {
                        this.data.utilities += (+expense.price);
                    }
                    if (expense.category == 'Shopping') {
                        this.data.shopping += (+expense.price);
                    }
                    if (expense.category == 'Entertainment') {
                        this.data.entertainment += (+expense.price);
                    }
                }
            });
            this.setupDashCard();
        });

        this.authService.getAllGoals().subscribe((result: any) => {
            let goals = result.goals;
            goals.forEach((goal) => {
               if (this.firstFourActiveGoals.length < 4) {
                    if (goal.status == 'Active') {
                        this.firstFourActiveGoals.push({
                           name: goal.name,
                           moneyInvested: goal.moneyInvested.toString(),
                           price: goal.price.toString()
                        });
                    }
               }
            });

            if (this.firstFourActiveGoals.length < 4) {
                this.alertsService.warningAlert = {
                    text: 'You don\'t have four goals to display the full interface. To add them go to wishlist page and click "Add a new goal".',
                    active: true,
                }
            }
        });

    }

    setupDashCard() {
        this.dashCard = [
            { colorDark: '#66BB6A', colorLight: '#81C784', number: this.data.utilities, title: 'UTILITIES', icon: 'home' },
            { colorDark: '#F8796E', colorLight: '#F8826E', number: this.data.food, title: 'FOOD', icon: 'fastfood' },
            { colorDark: '#26A69A', colorLight: '#4DB6AC', number: this.data.shopping, title: 'SHOPPING', icon: 'local_grocery_store' },
            { colorDark: '#3E4E68', colorLight: '#3E4E70', number: this.data.entertainment, title: 'ENTERTAINMENT', icon: 'thumb_up' },
        ];
    }

}
