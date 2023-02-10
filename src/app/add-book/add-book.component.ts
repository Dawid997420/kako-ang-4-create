import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Book } from '../model/Book';
import { HttpServiceService } from '../services/http-service.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit{



    constructor (private httpService:HttpServiceService) {}
  
  title = "";

  autor = ""

  date= "";

  opis = "";

  ngOnInit(): void {
    this.setOkladkaFromSession();
    this.getTitleFromStorage();
    this.getAutorFromStorage();
    this.getDateFromSessionStorage();
    this.getOpisFromSessionStorage();
    this.getCategorysFromSessionStorage();
    
  }


  clearAll() {
    this.categories = [];
    this.autor = "";
    this.opis = "";
    this.title = ""
    this.date = ""
    this.okladka = ""
    this.saveCategoryToStorage();
    this.saveAutorToStorage();
    this.saveDateToStorage();
    this.saveOpisToStorage();
    this.saveTitleToStorage();
    this.saveOkladkaToSession();


  }
  
  url = "";

  okladka = "";

  categories : string[] = [];
  
  category = "";


  deleteAllCat() {
    this.categories = []
  }

  addCategorie() {
    this.categories.push(this.category)
    this.category= "";
    this.saveCategoryToStorage();

  }

  getCategorysFromSessionStorage(){
    console.log(this.categories)
    this.categories =  JSON.parse(sessionStorage.getItem("categories") || "") || [];
  }

  saveCategoryToStorage(){

    
 

    sessionStorage.setItem("categories" ,JSON.stringify(this.categories) )

   }


  getOpisFromSessionStorage(){
    this.opis = sessionStorage.getItem("opis") || "";
  }
  saveOpisToStorage(){
    
  
    sessionStorage.setItem("opis",this.opis ); 

   }

  getDateFromSessionStorage(){
    this.date = sessionStorage.getItem("date") || "";
  }
  saveDateToStorage(){
    
  
    sessionStorage.setItem("date",this.date ); 

   }

  saveAutorToStorage() {
    sessionStorage.setItem("autor",this.autor)
  }
  getAutorFromStorage(){
    this.autor = sessionStorage.getItem("autor") || ""
  }

  saveTitleToStorage() {
    sessionStorage.setItem("title",this.title)
  }

  getTitleFromStorage(){
    this.title = sessionStorage.getItem("title") || ""
  }

  saveOkladkaToSession() {
    sessionStorage.setItem("okladka",this.okladka)
  }

  setOkladkaFromSession() {
    this.okladka= sessionStorage.getItem("okladka") || ""
  }


  getImageDestination(event :any) {

    this.okladka = event;
    sessionStorage.setItem("okladka",this.okladka);
    this.saveOkladkaToSession();
    console.log(event);
  }


  onSelectImage(event : any) {
    this.clearImage();

    
    if ( event.target.files) {
      //display image on angular
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (event2:any) =>{
          this.url = event2.target.result;
      // convert image to file to send
        }
      }
    }


    clearImage() {
      this.url = "";
    }

    


    addBook() {

          if ( this.date.length > 2 && this.title.length > 2
         && this.autor.length > 2 && this.okladka.length > 2
         && this.opis.length > 2) {

       
          let bookToSave = new Book(this.title,this.autor,new Date(this.date),this.okladka,this.opis,
          this.categories)

          this.httpService.addBook(bookToSave).subscribe(response => {
            console.log(response)
            this.clearAll()
          })

         } else {


         }
 
    }

}
