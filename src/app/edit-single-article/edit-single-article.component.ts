import { NgIf } from '@angular/common';
import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Article } from '../model/Article';
import { Paragraph } from '../model/paragraph';
import { ParagraphDto } from '../model/ParagraphDto';
import { ArticleService } from '../services/article.service';
import { HttpServiceService } from '../services/http-service.service';

@Component({
  selector: 'app-edit-single-article',
  templateUrl: './edit-single-article.component.html',
  styleUrls: ['./edit-single-article.component.css']
})
export class EditSingleArticleComponent implements OnInit{




  


  chosenArticleToEdit! :Article;

  constructor(public articleService:ArticleService,private httpService:HttpServiceService) {
    
  }

  @ViewChildren('opcja', {read: ElementRef}) childComp!:QueryList<ElementRef>




  chosenImgToEdit :string = '';

  classParagraph= "bold"

  editChosenImg(index:number,paragraph:ParagraphDto) {

    if (  this.choseParagraphOption ) {
      
      this.availableStrzaly =false;

      this.chosenParagraphToEdit=  new ParagraphDto("","");
      console.log("xdd")

      this.chosenImgToEdit = paragraph.id ||"";
      console.log(this.chosenImgToEdit)
      this.url = paragraph.text
    }

  }

  cancelEditImg() {
    this.availableStrzaly = true
    this.chosenImgToEdit = "";
  }

  editChosenImage(event:string,paragraph: ParagraphDto) {

      this.availableStrzaly=false;

      paragraph.text= event;
      this.chosenImgToEdit = "";


  }

  anulujDodawanie(index:number){
     
    this.chosenArticleToEdit.paragraphs.splice(index,1)
    this.availableStrzaly = true
    this.choseParagraphOption = true;
  }

  anulujUpload( event:string ) {

    this.chosenImgToEdit = event
    this.availableStrzaly= true;

  }


  changeClassTextArea(klasa:string) {
    this.classParagraph = klasa;
  }


  chosenStyle = "font"

  chosenParagraphToEdit! : ParagraphDto  ;

  chosenTopicToEdit = false ;

  editTopic(){
    this.availableStrzaly = false;
    this.chosenTopicToEdit = true;
    this.choseParagraphOption = false;
  }

  anulujChosenTopic() {
    this.chosenTopicToEdit = false
    this.availableStrzaly = true;
    this.choseParagraphOption = true;
  }

  saveChosenTopic() {

    sessionStorage.setItem("chosenArticleToEdit",JSON.stringify(this.chosenArticleToEdit))
    this.anulujChosenTopic() 
  }


  editParagraph(paragraph:ParagraphDto) {

    if ( this.choseParagraphOption ) {

      this.chosenImgToEdit = "";
      this.availableStrzaly = false;
      this.chosenParagraphToEdit = paragraph;
    }


  }


  categoryToAdd ="";

  addCategorie(){

    this.addingCategorie=!this.addingCategorie;

 

   
  }

  deleteCategorie(index:number) {

    this.chosenArticleToEdit.categories.splice(index,1)
    
    sessionStorage.setItem("chosenArticleToEdit",JSON.stringify(this.chosenArticleToEdit))

  }

  addTrueCategorie(){
    
    this.chosenArticleToEdit.categories.push(this.categoryToAdd)
    this.categoryToAdd="";

    sessionStorage.setItem("chosenArticleToEdit",JSON.stringify(this.chosenArticleToEdit))
  }

  addingCategorie = false;

  editCategories() {


 

  }

  deleteImg(event:string,index:number) {

        this.chosenArticleToEdit.paragraphs.splice(index,1)
        sessionStorage.setItem("chosenArticleToEdit",JSON.stringify(this.chosenArticleToEdit))
        this.availableStrzaly =true;
  }

  availableStrzaly = true  ;


  addTrueParagraph(index :number, area:HTMLTextAreaElement) {


    this.chosenArticleToEdit.paragraphs[index].type=this.classParagraph;
    this.chosenArticleToEdit.paragraphs[index].text=area.value
    
    this.httpService.saveArticle(this.chosenArticleToEdit).subscribe(response => {

      this.chosenArticleToEdit = response;

      this.availableStrzaly = true;

      sessionStorage.setItem("chosenArticleToEdit",JSON.stringify(response));
    });

  }

  url= '';

  addNewParagraphImage(i : number ) {
    this.buttonsExistsParagraphId = "";
    this.availableStrzaly = false;
    let paragraph = new ParagraphDto("","choseImage");
    this.chosenArticleToEdit.paragraphs.splice(i,0,paragraph)
      this.chosenArticleToEdit.paragraphs.splice
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
    //  this.imageFile = event.target.files[0];

      
    //   this.saveImageToStorage();

        }

 
      }

  }

  clearImage() {
    this.url = "";
  }

  zapiszArtykul() {
    this.httpService.saveArticle(this.chosenArticleToEdit).subscribe( response=>{

      console.log(response)       
  });
  }


  getImageDestination(index:number, event:string){
    
    this.chosenArticleToEdit.paragraphs[index].text=event;
    this.chosenArticleToEdit.paragraphs[index].type="image"
   // this.paragraphsList.push(new Paragraph(event,"image","normal")) 

   this.httpService.saveArticle(this.chosenArticleToEdit).subscribe(response => {

    this.chosenArticleToEdit = response;

    this.availableStrzaly = true;
    
    this.choseParagraphOption = true;
    
    sessionStorage.setItem("chosenArticleToEdit",JSON.stringify(response));
  });


  }


  cancelAddingParagraph(index:number) {

    this.availableStrzaly = true
    console.log(index)
    this.chosenArticleToEdit.paragraphs.splice(index,1)
    this.pojawStrzale()

  }

  anulujChosen() {
    this.availableStrzaly = true;
    this.chosenParagraphToEdit =new ParagraphDto("","");
  }

  saveChosen(paragraph : ParagraphDto,index :number) {
    if (this.chosenParagraphToEdit.text == "") {
      this.chosenArticleToEdit.paragraphs.splice(index,1)
      console.log("deleted")
    }


    

    paragraph.text = this.chosenParagraphToEdit.text;
    this.chosenParagraphToEdit = new ParagraphDto("","");
  
  //  this.chosenArticleToEdit.paragraphs[index-1] = this.chosenParagraphToEdit;

    this.httpService.saveArticle(this.chosenArticleToEdit).subscribe(response => {

      this.chosenArticleToEdit = response;
      sessionStorage.setItem("chosenArticleToEdit",JSON.stringify(response))
    });

     //  this.chosenArticleToEdit = JSON.parse(sessionStorage.getItem("chosenArticleToEdit") || "" );
    paragraph.type =  paragraph.type

  }

  getHeightTopic(topicToEdit : string) {

    let height = topicToEdit.length /5;
    Math.sqrt(height)


    let wynik = topicToEdit.length ;
    let pixels = 0 ;
    let ileRazyDodac = 0

    ileRazyDodac = wynik /5 ;
  
 

      for ( let i = 0 ; i < ileRazyDodac ; i++) {
        pixels = pixels + 3.4;
      }

    

    return pixels + "px";

  }


  getHeight(paragraph :ParagraphDto) {

    let height = paragraph.text.length /5;
    Math.sqrt(height)


    let wynik = paragraph.text.length ;
    let pixels = 0 ;
    let ileRazyDodac = 0

    ileRazyDodac = wynik /5 ;
  
    if ( paragraph.type == "plain" ) {

    
        for ( let i = 0 ; i < ileRazyDodac ; i++) {
          pixels = pixels + 2.1;
        }

    } else if ( paragraph.type == "bold" ) {

      for ( let i = 0 ; i < ileRazyDodac ; i++) {
        pixels = pixels + 3.4;
      }

    }

    return pixels + "px";

  }


  setStyle(area : HTMLTextAreaElement) {
 
    area.style.height = (area.scrollHeight)+"px";
    return ( area.scrollHeight ) + 'px';
  }
  

  strzalaZnika = "";
  
  pojawStrzale() {
    this.strzalaZnika = "";
  }

  zniknijStrzale(index:number) {
    
 
        this.strzalaZnika = this.chosenArticleToEdit.paragraphs[index].id || "";
        


  }


  addNewParagraph(index : number) {

    this.availableStrzaly = false;
    this.zniknijStrzale(index);

   this.buttonsExistsParagraphId = "";

    let paragraph = new ParagraphDto("","textArea");
    this.chosenArticleToEdit.paragraphs.splice(index,0,paragraph)
    

  }


  strzalka:string = "assets/strzalaTrans.png";

  choseParagraphOption= true;

  buttonsExistsParagraphId:string="";

  addParahraphBefore(strzala:HTMLImageElement,paragraph:ParagraphDto) {

  
    

    
    strzala.src="assets/strzalaTransBlack.png";

    
    setTimeout(()=>{                           // <<<---using ()=> syntax
      strzala.src= this.strzalka

  }, 90);
  

  if (  this.buttonsExistsParagraphId != paragraph.id) {
      
    console.log(paragraph.id)
    this.buttonsExistsParagraphId = paragraph.id || "" ;
    this.choseParagraphOption = false;
  } else {
   // console.log("22222")
   this.choseParagraphOption = true;
    this.buttonsExistsParagraphId = "" ;
  }


   

}

  ngOnInit(): void {

    if ( this.articleService.chosenArticleToEdit !=( null || undefined)) {
        sessionStorage.setItem("chosenArticleToEdit",JSON.stringify(this.articleService.chosenArticleToEdit))
    }
    if (sessionStorage.getItem("chosenArticleToEdit")  != null) {
      this.chosenArticleToEdit = JSON.parse(sessionStorage.getItem("chosenArticleToEdit") || "" );
    }
 
  }



  strzalaEndActive = false ;

  addNewParagraphEnd() {
    this.chosenArticleToEdit.paragraphs.push(new ParagraphDto("","textArea"))
    this.strzalaEndActive = false ;

  }

  addNewParagraphImageEnd() {

    this.chosenArticleToEdit.paragraphs.push(new ParagraphDto("","choseImage"));
    this.strzalaEndActive = false ;
  }


  addNewParagraphAtEnd() {
      this.strzalaEndActive = !this.strzalaEndActive;
  }


  


}
 