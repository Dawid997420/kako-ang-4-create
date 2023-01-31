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
     
    })
  } 




}
