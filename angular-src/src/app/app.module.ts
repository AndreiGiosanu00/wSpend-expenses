import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LazyLoadModule } from './components/lazy-load/lazy-load.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './components/core/core.module';
import {AuthService} from "./services/auth.service";
import {ValidateService} from "./services/validate.service";
import {AuthGuard} from "./guards/auth.guard";
import {RecommendationService} from "./services/recommendation.service";
import {LoadingModule} from "./components/loading/loading.module";
import {AdminGuard} from "./guards/admin.guard";


@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        LazyLoadModule,
        CoreModule,
        BrowserAnimationsModule,
        LoadingModule
    ],
    providers: [
        AuthService,
        ValidateService,
        RecommendationService,
        AuthGuard,
        AdminGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
