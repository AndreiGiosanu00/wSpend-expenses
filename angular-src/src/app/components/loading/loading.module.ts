import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {LoadingComponent} from "./loading.component";

export const appRoutes: Routes = [
    { path: '', component: LoadingComponent},
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(appRoutes),
    ],
    declarations: [LoadingComponent],
    exports: [ LoadingComponent]
})
export class LoadingModule{ }
