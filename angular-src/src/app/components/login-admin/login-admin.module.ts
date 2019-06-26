import { NgModule } from '@angular/core';
import {
    MatCardModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatInputModule,
    MatToolbarModule
} from '@angular/material';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import {LoginAdminComponent} from "./login-admin.component";
import {AuthService} from "../../services/auth.service";

const routes: Routes = [
    {path: '', component: LoginAdminComponent},
];
@NgModule({
    imports: [
        MatCardModule,
        CommonModule,
        FlexLayoutModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatInputModule,
        MatToolbarModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        LoginAdminComponent,
    ],
    exports: [
        RouterModule
    ],
    providers: [
        AuthService
    ]
})
export class LoginAdminModule {
}
