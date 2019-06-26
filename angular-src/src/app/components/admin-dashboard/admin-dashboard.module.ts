import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {AdminDashboardComponent} from "./admin-dashboard.component";

export const appRoutes: Routes = [
    { path: '', component: AdminDashboardComponent },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(appRoutes),
    ],
    declarations: [AdminDashboardComponent],
    exports: [ ]
})
export class AdminDashboardModule{ }
