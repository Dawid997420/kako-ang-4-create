import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../model/Book';
import { HttpServiceService } from '../services/http-service.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent {



  books:Book[]= [];

  constructor(private router :Router, private httpService :HttpServiceService) {

    this.getAllBooks();
    
  }



  getAllBooks() {

   this.httpService.getAllBooks().subscribe(response => {
      this.books = response ;
      console.log(this.books);
    })

  }

  selectBook(book :Book) {

    sessionStorage.setItem("viewBook",JSON.stringify(book))
    this.router.navigateByUrl("viewBook")
    
  }

  selected = "WSZYSTKIE";



  categoryMatches( book:Book) {


    if ( this.selected == "WSZYSTKIE" ) {
      return true ;
    } 

    for ( let i =0 ;i < book.categories.length ; i++) {

      if ( book.categories[i]== this.selected) {
        return true;
        break;
      }

    }


    return false ;
  
  }

}
