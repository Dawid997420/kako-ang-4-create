import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { RoutingModule } from './routing/routing.module';
import { ContactComponent } from './contact/contact.component';
import { NavComponent } from './nav/nav.component';
import { ArticlesComponent } from './articles/articles.component';
import { LoginComponent } from './login/login.component';
import { WriteComponent } from './write/write.component';
import { ProfileComponent } from './profile/profile.component';
import { HttpClientModule, HttpClientXsrfModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { CytatyComponent } from './cytaty/cytaty.component';
import { QuotesComponent } from './quotes/quotes.component';
import { UsersComponent } from './users/users.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ImageUploadComponent } from './image-upload/image-upload.component';




@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ContactComponent,
    NavComponent,
    ArticlesComponent,
    LoginComponent,
    WriteComponent,
    ProfileComponent,
    RegisterComponent,
    CytatyComponent,
    QuotesComponent,
    UsersComponent,
    ImageUploadComponent
   
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  



  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
