import { Component, OnInit } from '@angular/core';
import { ParagraphDto } from '../model/ParagraphDto';

@Component({
  selector: 'app-articles-options',
  templateUrl: './articles-options.component.html',
  styleUrls: ['./articles-options.component.css']
})
export class ArticlesOptionsComponent implements OnInit {
  
  
  writeOption = true;
  editOption= false;




  
 

  ngOnInit(): void {

    this.getValuesFromSession();
 

  //  throw new Error('Method not implemented.');
  }

  getValuesFromSession() {
    
    if (sessionStorage.getItem("writeOption") != null) {

    
    this.writeOption =  JSON.parse(sessionStorage.getItem("writeOption") || "") ;
    }
  }

  choseEdit() {
    this.writeOption = false ;
    sessionStorage.setItem("writeOption",JSON.stringify(this.writeOption));
    console.log(sessionStorage.getItem("writeOption"));
  }

  choseWrite() {
    this.writeOption = true;
    sessionStorage.setItem("writeOption",JSON.stringify(this.writeOption));
    console.log(sessionStorage.getItem("writeOption"));
  }
  

}
