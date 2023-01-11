import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Quote } from '../model/Quote';
import { HttpServiceService } from '../services/http-service.service';


@Component({
  selector: 'app-cytaty',
  templateUrl: './cytaty.component.html',
  styleUrls: ['./cytaty.component.css'],
  animations: [
    trigger('popOverState',[

      state('show', style({
          
        opacity: 1
      
        })),
      state('hide', style({
        
        opacity: 0
      
      })),

      transition('show => hide', animate('500ms ease-out')),
      transition('hide => show', animate('500ms ease-in'))

    ])
  ]
})
export class CytatyComponent implements OnInit{


// animate showing quote 
// methods - items

  show = true ;
  get stateName() {
    return this.show ?  'show' :'hide'
  }

//  czas = interval(500);

  doAnimation() {
    

  }

  toggle() {

    this.show = !this.show

  }


  quotesList: Quote[] = [];

  quoteNow : Quote = new Quote("","","");

  obs = interval(8000);
  

  constructor(private http : HttpServiceService) {
  
  }
  



  showNewQuote() {
  
    let index = 0;
    let lenght = this.quotesList.length;


    this.obs.subscribe( response => {


      this.quoteNow = this.quotesList[index];
      index++;

      
    //  this.show = !this.show
      //this.show = !this.show
      
      if ( index == this.quotesList.length) {
        index = 0 ;
      }

    })
  }

  ngOnInit(): void {
  
    this.getQuotesList();
    this.showNewQuote();

  }

  getQuotesList() {

    this.http.getQuotesWithImages().subscribe( response => {

      if ( response.length > 0) {

        this.quotesList = response;
        this.quoteNow = this.quotesList[0];
      }
   

    })
  
  }

  

}
