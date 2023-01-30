import { ProfileComponent } from './../profile/profile.component';
import { WriteComponent } from './../write/write.component';
import { LoginComponent } from './../login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule, Routes } from '@angular/router';
import { IndexComponent } from '../index/index.component';
import { AppRoutingModule } from '../app-routing.module';
import { ContactComponent } from '../contact/contact.component';
import { RegisterComponent } from '../register/register.component';
import { QuotesComponent } from '../quotes/quotes.component';
import { ArticlesComponent } from '../articles/articles.component';
import { UsersComponent } from '../users/users.component';
import { AuthGuard } from '../guards/auth.guard';
import { ImageUploadComponent } from '../image-upload/image-upload.component';
import { ViewArtComponent } from '../view-art/view-art.component';
import { ChosenCatComponent } from '../chosen-cat/chosen-cat.component';
import { ArticlesOptionsComponent } from '../articles-options/articles-options.component';
import { EditSingleArticleComponent } from '../edit-single-article/edit-single-article.component';
import { NotFoundComponent } from '../not-found/not-found.component';



const routes : Routes =  [
  { path:"", component:IndexComponent},
  { path:"contact", component:ContactComponent},
  { path: "login", component:LoginComponent},
  { path: "write", component:WriteComponent},
  { path: "profile", component:ProfileComponent ,canActivate:[AuthGuard]},
  { path: "register" , component:RegisterComponent },
  { path: "quotes" , component:QuotesComponent },
  { path: "articles" , component:ArticlesComponent},
  { path: "users" , component:UsersComponent},
  { path: "image", component: ImageUploadComponent},

  { path: "view/:id", component:ViewArtComponent},
  { path: "chosenCat", component:ChosenCatComponent},
  { path: "articlesOption", component:ArticlesOptionsComponent},
  { path: "editSingleArticle", component:EditSingleArticleComponent},
  { path:"**", component: NotFoundComponent}
  
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
