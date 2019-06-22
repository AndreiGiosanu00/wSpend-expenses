import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {ExpensesComponent} from "./expenses.component";
import {MatDialogModule} from "@angular/material";

export const appRoutes: Routes = [
    { path: '', component: ExpensesComponent },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(appRoutes),
        MatDialogModule,
    ],
    declarations: [ExpensesComponent],
    exports: [ ]
})
export class ExpensesModule{ }
