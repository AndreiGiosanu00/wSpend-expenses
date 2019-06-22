import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-dashboard-crm',
    templateUrl: './dashboard-crm.component.html',
    styleUrls: ['./dashboard-crm.component.scss']
})

export class DashboardCrmComponent implements OnInit {

    public dashCard = [
        { colorDark: '#66BB6A', colorLight: '#81C784', number: 1460, title: 'UTILITIES', icon: 'home' },
        { colorDark: '#F8796E', colorLight: '#F8826E', number: 523, title: 'FOOD', icon: 'fastfood' },
        { colorDark: '#26A69A', colorLight: '#4DB6AC', number: 480, title: 'SHOPPING', icon: 'local_grocery_store' },
        { colorDark: '#3E4E68', colorLight: '#3E4E70', number: 280, title: 'ENTERTAINMENT', icon: 'thumb_up' },
    ];

    constructor() { }

    ngOnInit() {
    }

}
