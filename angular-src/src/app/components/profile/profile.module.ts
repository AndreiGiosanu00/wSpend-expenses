import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {ProfileComponent} from "./profile.component";

export const appRoutes: Routes = [
    { path: '', component: ProfileComponent },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(appRoutes),
    ],
    declarations: [ProfileComponent],
    exports: [ ]
})
export class ProfileModule{ }
