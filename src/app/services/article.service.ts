import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Article } from '../model/Article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor( private router : Router) { }


  findArtById( id :string ,articles:Article[]) {

    
   let articleToFind ;  

    for ( let i = 0  ; articles.length ; i++ ) {

      if ( articles[i].id == id ) {

        articleToFind = articles[i];

      }
    }
  }



}
