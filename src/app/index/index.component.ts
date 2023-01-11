import { HttpServiceService } from './../services/http-service.service';
import { Component, OnInit } from '@angular/core';
import { Article } from '../model/Article';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {


  articles: Article[] = [];


  constructor(private httpService:HttpServiceService) {

  }


  ngOnInit(): void {
    
  
    this.getAllArticles();
  }


  getFirstImgArtice( article : Article) {

    let image = "";

    for ( let i = 0 ; i < article.paragraphs.length ; i++) {

      if ( article.paragraphs[i].type == "image") {
        image = article.paragraphs[i].text ;
        break;
      }
      
    }

    return image;

  }


  getAllArticles() {

    this.httpService.getArticles().subscribe( (response) => {

      this.articles = response;
      console.log(response);
    })

  }

  getUsersTest() {

    this.httpService.getUsers().subscribe((response) => {

      console.log(response)
    })
  }


}
