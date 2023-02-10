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


import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { ViewArtComponent } from './view-art/view-art.component';
import { WriteCommentComponent } from './write-comment/write-comment.component';
import { ChosenCatComponent } from './chosen-cat/chosen-cat.component';
import { ArticlesOptionsComponent } from './articles-options/articles-options.component';
import { EditArticlesComponent } from './edit-articles/edit-articles.component';
import { EditSingleArticleComponent } from './edit-single-article/edit-single-article.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CommentsComponent } from './comments/comments.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UsersEditComponent } from './users-edit/users-edit.component';
import { AutorComponent } from './autor/autor.component'
import { YouTubePlayerModule} from '@angular/youtube-player';
import { BooksComponent } from './books/books.component';
import { AddBookComponent } from './add-book/add-book.component';
import { ViewBookComponent } from './view-book/view-book.component'


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

    ImageUploadComponent,
    ViewArtComponent,
    WriteCommentComponent,
    ChosenCatComponent,
    ArticlesOptionsComponent,
    EditArticlesComponent,
    EditSingleArticleComponent,
    NotFoundComponent,
    CommentsComponent,
    UsersEditComponent,
    AutorComponent,
    BooksComponent,
    AddBookComponent,
    ViewBookComponent
   
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    FontAwesomeModule,
    YouTubePlayerModule
  



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
