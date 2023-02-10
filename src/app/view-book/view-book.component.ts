import { Component, OnInit } from '@angular/core';
import { Book } from '../model/Book';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.css']
})
export class ViewBookComponent implements OnInit{


  chosenBook! :Book;

  constructor() {

  }
  ngOnInit(): void {
    // new Book("","",new Date(),"","",['']);
    if ( sessionStorage.getItem("viewBook") != null 
    && sessionStorage.getItem("viewBook") != undefined) {
      this.chosenBook = JSON.parse(sessionStorage.getItem("viewBook") || "") 

    }
    
  }



  

}
