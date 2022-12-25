import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { RoutingModule } from './routing/routing.module';
import { ContactComponent } from './contact/contact.component';
import { NavComponent } from './nav/nav.component';


const routing : Routes = [{

}]

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ContactComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
