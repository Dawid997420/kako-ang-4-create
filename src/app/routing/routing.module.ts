import { WriteComponent } from './../write/write.component';
import { LoginComponent } from './../login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule, Routes } from '@angular/router';
import { IndexComponent } from '../index/index.component';
import { AppRoutingModule } from '../app-routing.module';
import { ContactComponent } from '../contact/contact.component';



const routes : Routes =  [
  { path:"", component:IndexComponent},
  { path:"contact", component:ContactComponent},
  { path: "login", component:LoginComponent},
  { path: "write", component:WriteComponent}
] ;

@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forRoot(routes),
    AppRoutingModule
  ],
  exports: [ RouterModule]
})
export class RoutingModule { }
