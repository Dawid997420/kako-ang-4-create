import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Quote } from '../model/Quote';
import { HttpServiceService } from '../services/http-service.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent {


  url :string = '';
  imageFile : any = File;


  quoteForm = new FormGroup( {

    image:new FormControl(''),
    quote:new FormControl(''),
    author:new FormControl('')

  });

  constructor( private http : HttpServiceService) {
  }



  getQuotes() { 

    this.http.getQuotesWithImages().subscribe( response => {

      console.log(response);
    });

  }

  saveQuote() {

    if ( this.quoteForm.valid) {
    let formData = new FormData();
    formData.append('image',this.imageFile)
    formData.append('quote',this.quoteForm.value.quote || '')
    formData.append('author', this.quoteForm.value.author || '' )

    this.http.sendQuote2(formData).subscribe(response => {
      console.log(response);

      this.quoteForm.reset()

    })


  }

  }


  onSelectFile(event:any) {

      if ( event.target.files) {
      //display image on angular
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (event2:any) =>{
          this.url = event2.target.result;
      // convert image to file to send
      this.imageFile = event.target.files[0];

        }
      }
  }


}