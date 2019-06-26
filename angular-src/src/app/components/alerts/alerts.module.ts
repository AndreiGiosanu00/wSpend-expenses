import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {AlertsComponent} from "./alerts.component";
import {AlertsService} from "../../services/alerts.service";

export const appRoutes: Routes = [
    { path: '', component: AlertsComponent },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(appRoutes),
    ],
    declarations: [AlertsComponent],
    exports: [
        AlertsComponent
    ],
    providers: [AlertsService]
})
export class AlertsModule{ }
