import { Component, OnInit } from '@angular/core';
import { UserE } from '../model/UserE';
import { HttpServiceService } from '../services/http-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{


  user : UserE = new UserE('','','',new Date,'','') ;

  constructor( private httpService :HttpServiceService) {}

  
  showInformations= true ;
  showComments= true ;

  ngOnInit(): void {
        this.getPrincipalInfo()
        
  }


  profilImg= "assets/user.png";

  getProfilImg() {

    if ( this.user.image == null ) {

    } else if (this.user.image.length < 1  ) {

    } else{
      this.profilImg= this.user.image;
    }

  }


  showInformationsCommand() {
    
    this.showComments = false;
    this.showInformations =true;
    
  }

  showCommentsCommand(){
 
    this.showInformations = false;
    this.showComments = true
  }

 
  getPrincipalInfo() {

    this.httpService.getLogedUserInfo().subscribe( response => {
      
      this.user = response;
      this.getProfilImg();
    })
  } 


  url = "";

  getImageDestination(image:any) {

   
   this.user.image = image;

   this.httpService.changeUserImg(this.user).subscribe(response => {

    this.user = response;
    this.getProfilImg();

   })


   console.log(event)


  }

  clearImg() {
    this.url = "";
  }

  onSelectImage(event:any) {

    this.clearImg();

    if ( event.target.files) {
      //display image on angular
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (event2:any) =>{
       
      // convert image to file to send
      this.url = event2.target.result;

  

        }
       
 
      }

  }

  editProfil= false ;

  editProfilImg() {

    this.editProfil = !this.editProfil;
  }


  



}
