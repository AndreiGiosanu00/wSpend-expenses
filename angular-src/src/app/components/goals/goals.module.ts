import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {GoalsComponent} from "./goals.component";

export const appRoutes: Routes = [
    { path: '', component: GoalsComponent },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(appRoutes),
    ],
    declarations: [GoalsComponent],
    exports: [ ]
})
export class GoalsModule{ }
