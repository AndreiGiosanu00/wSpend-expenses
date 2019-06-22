import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LazyLoadModule } from './components/lazy-load/lazy-load.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './components/core/core.module';
import {AuthService} from "./services/auth.service";
import {ValidateService} from "./services/validate.service";
import {AuthGuard} from "./guards/auth.guard";


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    LazyLoadModule,
    CoreModule,
    BrowserAnimationsModule
  ],
  providers: [
      AuthService,
      ValidateService,
      AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
