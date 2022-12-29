import { HttpServiceService } from './../services/http-service.service';
import { Component } from '@angular/core';
import { Article } from '../model/Article';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {


  articles: Article[] = []

  constructor(private httpService:HttpServiceService) {

  }


  getAllArticles() {

    this.httpService.getArticles().subscribe( (response) => {

      this.articles = response;
      console.log(response);
    })

  }



}
