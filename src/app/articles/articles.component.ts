import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Article } from '../model/Article';
import { Paragraph } from '../model/paragraph';
import { ParagraphDto } from '../model/ParagraphDto';
import { UserE } from '../model/UserE';
import { AuthService } from '../services/auth.service';
import { HttpServiceService } from '../services/http-service.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit{
  

  ///// 3 klasy paragraph 
  ///// red
  ///// blue
  ///// normal


  
  style: string = '' ;


  setStyle(area : HTMLTextAreaElement) {
      area.style.height = (area.scrollHeight ) + 'px';
  }

  paragraphClass :string = "font-plain";

  paragraphsList: Paragraph[] = [];


  plainI=true;
  boldI= false;
  subtitleI = false;
  
  mouseClass = ''
  mouseClass2 = ''


  categories: string[] = [];

  selected :string = ""


  constructor( private httpService :HttpServiceService , private authService :AuthService) {}
  



  selectedTitle :string = "";

  anulujTitle() {
    this.selectedTitle = '99214i3580151705209347305123748021501927402579124106512794-1257321051275';
  }

  titleToSave = "";
  saveTitle(){
    console.log(this.titleToSave)
    this.title = this.titleToSave
    this.saveTitleToStorage();
  }

  setTitleToChange(title :string) { 

    this.titleToSave = title;

      this.selectedTitle = title;

  }


  textAreaSize(textArea:HTMLTextAreaElement ){ 
    
    console.log("do it")
    
    textArea.style.height = "5px";
    textArea.style.height = (textArea.scrollHeight)+"px";
  }

 


  saveParagraph(paragraph:Paragraph) {
    paragraph.text = this.paragraphToSave;
    this.chosenParagraph= "";
    this.saveParagraphsList();
  }

  paragraphToSave: string = "";

  chosenParagraph : string = "";

  cancelParagraph() {
    this.chosenParagraph = ""
  }

  changeParagraph(paragraph : Paragraph) {

    this.paragraphToSave = paragraph.text;

      for ( let i = 0 ; i < this.paragraphsList.length; i++) {

    
        if ( paragraph.text == this.paragraphsList[i].text) {

           // this.paragraphsList[i].text = "edit";
            this.chosenParagraph = paragraph.text
         
        }
        

      }
  }

 

  getImageDestination(event:string){
    this.paragraphsList.push(new Paragraph(event,"image","normal")) 

    this.saveParagraphsList()

  }

  saveArticle() {


    if ( this.categories.length < 1) {
      console.log("Dodaj chociaż 1 kategorie")
    
      return "essa"
    } 


    if ( sessionStorage.getItem("user") == null || sessionStorage.getItem("user") == undefined) {
   
   
      this.httpService.getLogedUserInfo().subscribe( response => {
        let  user :UserE = new UserE("","","",new Date(),"","");
        let role = "";
        user = response;
        role = user.role;
        //console.log(user)
        sessionStorage.setItem("user",JSON.stringify(user))
       
        localStorage.setItem("role",user.role)
        
        
       // console.log(this.role)
       
       let user1 : UserE = JSON.parse(sessionStorage.getItem("user")|| "") ;

       let articleToSave  = new Article("", new Date());
   
       articleToSave.created = new Date();
       articleToSave.topic = this.title ;
       articleToSave.categories = this.categories;
       
       articleToSave.userId = user1.id || "";
   
   
       let paragraphListDto : ParagraphDto[] = []
   
      
       let textToAdd = ''
       let paragraphDto : ParagraphDto;
   
       
   
       for ( let i = 0 ; i < this.paragraphsList.length; i++ ) {
   
        
   
         paragraphDto = new ParagraphDto(this.paragraphsList[i].text,this.paragraphsList[i].type)
         
         
         if ( paragraphDto.type == "font-plain") {
           paragraphDto.type = "plain";
         } else if ( paragraphDto.type == "font-bold"){
           paragraphDto.type = "bold";
         } else if (   paragraphDto.type == "image") {
           paragraphDto.type = "image";
         }  else if (  paragraphDto.type == "font-subtitle") {
           paragraphDto.type = "subtitle";
         } 
        
         paragraphListDto.push(paragraphDto);
   
       }
   
   
       articleToSave.paragraphs = paragraphListDto ;
   
      this.httpService.saveArticle(articleToSave).subscribe( response => {
         console.log(response)
       }) 
   
   
      
       this.clearAll();


       





     
      })
      return "essa"
    } else {

    
   let user1 : UserE = JSON.parse(sessionStorage.getItem("user")|| "") ;

    let articleToSave  = new Article("",new Date());

    articleToSave.created = new Date();
    articleToSave.topic = this.title ;
    articleToSave.categories = this.categories;
    
    articleToSave.userId = user1.id || "";


    let paragraphListDto : ParagraphDto[] = []

   
    let textToAdd = ''
    let paragraphDto : ParagraphDto;

    

    for ( let i = 0 ; i < this.paragraphsList.length; i++ ) {

     

      paragraphDto = new ParagraphDto(this.paragraphsList[i].text,this.paragraphsList[i].type)
      
      
      if ( paragraphDto.type == "font-plain") {
        paragraphDto.type = "plain";
      } else if ( paragraphDto.type == "font-bold"){
        paragraphDto.type = "bold";
      } else if (   paragraphDto.type == "image") {
        paragraphDto.type = "image";
      }  else if (  paragraphDto.type == "font-subtitle") {
        paragraphDto.type = "subtitle";
      } 
     
      paragraphListDto.push(paragraphDto);

    }


    articleToSave.paragraphs = paragraphListDto ;

   this.httpService.saveArticle(articleToSave).subscribe( response => {
      console.log(response)
    }) 


   
    this.clearAll();

    return "essa"
    }

  }


  saveImageToStorage() {

    sessionStorage.setItem("url",this.url);

  }

  getImageFromStorage() {
   
   this.url = sessionStorage.getItem("url") || "";
  }


  addCat(cat : any) {
  
    let dodaj = true

    for ( let i = 0 ; i < this.categories.length  ; i++) {

      if ( cat == this.categories[i] ) {
        
        dodaj = false;
      }

    }

    if ( dodaj) {
      
      this.categories.push(cat);
      this.saveCategories()
    }
   
  }

  clearAll(){
    
    
  
    this.paragraphsList = [];
    this.text = "";
    
    this.title = "";
    this.url = "";
    this.categories = [];


    console.log(this.text)
   
    this.saveTextToStorage();
    this.saveTitleToStorage();
    this.saveParagraphsList();
    this.saveCategories();
    this.saveImageToStorage();
  
    this.ngOnInit()

    
  }

  clearText() {
    this.text = "";
    sessionStorage.setItem("text","")
  }


  url: string = '';
  imageFile = new Image();


  @ViewChild("realImg")
  realImg! : ElementRef;

  realImgWidth : number = 0;
  realImgHeight: number = 0;



  klasy :string[] = ["{'background-color':'green'}"];

  

  addImage() {
    
    this.realImgWidth = this.realImg.nativeElement.width;
    this.realImgHeight = this.realImg.nativeElement.height;

    if ( this.realImgWidth >= 869) {

     this.paragraphsList.push(new Paragraph(this.url,"image","normal")) 
     

      this.saveParagraphsList()

    }

   
    
  }

  clearImage() {

    this.url = "";
    sessionStorage.setItem("url","")

  }


  isItFirstParagraph(   numer :number) : boolean {

    let firstParagraph = false ;
   let  paragraph : Paragraph = this.paragraphsList[numer];

    if ( paragraph.type === "image") {
    //  console.log("OBRAZ")
      return false ;
    } else {

   


    for ( let i = 0 ; i < numer ; i ++) {

      if (this.paragraphsList[i].type = "text") {
        return false ;
        
      }



    } 
    return true;
  }

   


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
      this.imageFile = event.target.files[0];

      
      




          this.saveImageToStorage();

        }

 
      }

  }

  removeParagraph(index : number) {

    this.paragraphsList.splice(index, 1);
    this.saveParagraphsList();
    console.log(index)
  }



  removeTitle() {

    this.title = ""
  }

  removeCategory() {
      
      this.categories = [];
      sessionStorage.setItem("categories" , "")
    }

    mouseEnterRemoveCat() {
      this.mouseClass2 = "mouseOnRemove";
    }

    mouseLeaveRemoveCat() {
      this.mouseClass2 = "";
    }

    mouseEnterChangeCat() {
      this.mouseClass2 = "mouseOnChange"
    }

    mouseLeaveChangeCat() {
this.mouseClass2 = ""
    }


  mouseEnterRemove() {
    
 
   this.mouseClass = "mouseOnRemove";
 
  }

  mouseLeaveRemove() {
    this.mouseClass = "";
  }

  mouseEnterChange(){

    this.mouseClass = "mouseOnChange"
  }

  mouseLeaveChange() {
    this.mouseClass = "";
  }


  

  addParagraph() {

    let type : string = "";
    
    if ( this.plainI) {
      
      type = "font-plain";
    } else if ( this.boldI ) {
      
      type = "font-bold";
    } else if ( this.subtitleI ) {

      type = "font-subtitle";
    }
    

    if ( this.text.length > 1) {
      let paragraphToAdd : Paragraph = new Paragraph(this.text,type,"normal");

      this.paragraphsList.push(paragraphToAdd)
   
    }

   this.text = ""

   this.saveParagraphsList() ;

  }

  saveCategories() {
    sessionStorage.setItem("categories",JSON.stringify(this.categories));
  }

  getCategories() {
    if ( sessionStorage.getItem("categories") != null )
{
    if (      sessionStorage.getItem("categories")!.length > 1 )
      this.categories =  JSON.parse(sessionStorage.getItem("categories") || '')
    }

  }

  saveParagraphsList() {

    sessionStorage.setItem("paragraphsList",JSON.stringify(this.paragraphsList));
  
  }

  getParagraphList() {

    let paragraphsList = sessionStorage.getItem("paragraphsList");
    if ( paragraphsList != null) {
      this.paragraphsList = JSON.parse(paragraphsList || '');
    }

  }

  fontSessionStorage() {

    if ( sessionStorage.getItem("font") != null) {
          if ( sessionStorage.getItem("font")!.length > 0) {
            this.plainI= false
            //this.plain()
          }

          if ( sessionStorage.getItem("font") == "font-plain"  ) {
          this.plainI=true;
          this.plain()
          } else if ( sessionStorage.getItem("font") == "font-bold" ) {
            this.boldI = true
            this.bold();
          } else if ( sessionStorage.getItem("font") == "font-subtitle" ) {
            this.subtitleI= true
            this.subtitle();
        
          }
  }
  }


  

  mouseEnterChangeParagraph( numer : number) {

    this.paragraphsList[numer].klasa = "blue"
   // event.currentTarget.
  }
  mouseLeaveChangeParagraph( numer: number) {

    this.paragraphsList[numer].klasa = "normal"
    // event.currentTarget.
   }
 
   mouseEnterRemoveParagraph( numer : number) {

    this.paragraphsList[numer].klasa = "red"
   // event.currentTarget.
  }
  mouseLeaveRemoveParagraph( numer: number) {

    this.paragraphsList[numer].klasa = "normal"
    // event.currentTarget.
   }
  


  textAndTitleSessionStorage() {

   



    if ( sessionStorage.getItem("title") != null)  {
      this.title = sessionStorage.getItem("title") || '';
    }
    if ( sessionStorage.getItem("text") != null)  {
      this.text = sessionStorage.getItem("text") || '';
    }


  }


  ngOnInit(): void {


    

    this.getParagraphList();
    this.saveParagraphsList() ;
   this.fontSessionStorage();
    this.textAndTitleSessionStorage();
    this.getCategories();
    this.getImageFromStorage();
    
  }

  plain() {
    if ( this.boldI || this.subtitleI) {
      this.boldI = false;
      this.subtitleI = false
    }


    if ( this.plainI) {
      this.paragraphClass = "font-plain";
      sessionStorage.setItem("font","font-plain")
    } else {
      this.paragraphClass = "font-plain";
    }
    
  }

  subtitle() {
    if ( this.boldI || this.plainI) {
      this.boldI = false;
      this.plainI = false
    }

    if( this.subtitleI) {
      this.paragraphClass ="font-subtitle";
      sessionStorage.setItem("font","font-subtitle")
    } else {
      this.paragraphClass = "font-plain";
    }
   
  }

  bold(){
    if ( this.subtitleI || this.plainI ) {
      this.subtitleI  = false;
      this.plainI = false
    }

    if (this.boldI ) {
      this.paragraphClass = "font-bold";
      sessionStorage.setItem("font","font-bold")
    } else {
      this.paragraphClass = "font-plain";
    }

  }

  saveTitleToStorage() {
  
    sessionStorage.setItem("title",this.title);
    
  }
  saveTextToStorage() {
    sessionStorage.setItem("text",this.text);
    
  }
  linkYT = "";

  addYouTubeVideo() {

    if ( this.linkYT.length > 23) {


     
      
    

     this.linkYT.split("https://www.youtube.com/watch?v=");

     let link :string =   this.linkYT.split("https://www.youtube.com/watch?v=")[1];
    


     let startCut = 0 ;

     for ( let i = 0 ; i < this.linkYT.length ; i++ ) {

      if ( this.linkYT.charAt(i)=='&') {
        startCut = i;
        
        break;
      }
     
    }

    let realId = link.slice(startCut,this.linkYT.length)
    console.log(realId)

  
    this.paragraphsList.push(new Paragraph(realId,"yt",""))


    this.linkYT = "";
    this.saveParagraphsList();
  } else {

  }
  }


  title:string  = ''; 

  text:string = '';

  date: Date = new Date();







}
