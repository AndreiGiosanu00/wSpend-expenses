import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { DashboardCrmComponent } from '../dashboard-crm/dashboard-crm.component';
import {ExpensesComponent} from "../expenses/expenses.component";
import {GoalsComponent} from "../goals/goals.component";
import {AuthGuard} from "../../guards/auth.guard";

export const appRoutes: Routes = [{
    path: '', component: AuthComponent, children: [
        { path: 'dashboard', component: DashboardCrmComponent, canActivate: [AuthGuard]},
        { path: 'expenses', component: ExpensesComponent, canActivate: [AuthGuard] },
        { path: 'goals', component: GoalsComponent, canActivate: [AuthGuard] },
    ]
}];
