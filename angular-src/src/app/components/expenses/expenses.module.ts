import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {ExpensesComponent} from "./expenses.component";
import {MatDialogModule} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

export const appRoutes: Routes = [
    { path: '', component: ExpensesComponent },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(appRoutes),
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [ExpensesComponent],
    providers: [DatePipe],
    exports: [ ]
})
export class ExpensesModule{ }
