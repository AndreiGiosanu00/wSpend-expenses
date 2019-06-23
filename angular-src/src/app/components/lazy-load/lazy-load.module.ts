import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import {AuthGuard} from "../../guards/auth.guard";

const routes: Routes = [
    {path: 'auth', loadChildren: '../auth/auth.module#AuthModule', canActivate: [AuthGuard]},
    {path: 'register', loadChildren: '../register/register.module#RegisterModule'},
    {path: 'login', loadChildren: '../pages/login/login.module#LoginModule'},

    {path: '**', redirectTo: 'login'},
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class LazyLoadModule { }
