import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserE } from '../model/UserE';
import { ArticleService } from '../services/article.service';
import { AuthService } from '../services/auth.service';
import { HttpServiceService } from '../services/http-service.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{


  navbarfixed =false;
  showNav = false ;
  role= "SPECTATOR"



  showButtons= true;

  showNavBar: boolean = false ;


  active = "Home";


  userImg= "assets/user.png";

  getUserImg() {
   let userE:UserE = new UserE("","","",new Date(),"","");

    this.httpService.getLogedUserInfo().subscribe( response=>{

      userE = response;

      this.userImg = userE.image ||  "assets/user.png";

    })

  }
    
  setActive(active:string) {
      this.active = active;
  }

  constructor( private articleSerice :ArticleService, private router:Router,
    public authService :AuthService,private httpService :HttpServiceService) {

      
  }
  ngOnInit(): void {
    console.log(window.innerWidth)
      if ( window.innerWidth < 1000) {
        
        this.showNavBar = true
      } else {
        this.showNavBar =false
      }


      
      this.role= localStorage.getItem("role") || "SPECTATOR"

      this.authService.role = localStorage.getItem("role") ||"SPECTATOR"
    console.log(localStorage.getItem("role"))
    this.getUserImg();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {

    if ( window.scrollY > 100) {

        this.navbarfixed = true;

    } else {

      this.navbarfixed = false;
    }


  }

  showNavClick() {
    this.showNav = true;

  }


  selectedHazard(){

    this.articleSerice.setChosenCategory("HAZARD")
    this.articleSerice.chosenCategory = "HAZARD"
   
 //   window.location.reload();
  
  }

  selectedSport() {
    this.articleSerice.setChosenCategory("SPORT")
  }



  selectedWiara() {
    this.articleSerice.setChosenCategory("WIARA")
  }

  selectedPasja() {
    this.articleSerice.setChosenCategory("PASJA")
  }


  selectedAlcohol() {

    this.articleSerice.setChosenCategory("ALKOHOL")
 
   // window.location.reload();
    }
    selectedTechnology() {

      this.articleSerice.setChosenCategory("TECHNOLOGY")
   
     // window.location.reload();
      }
  

    logout() {
      
      localStorage.setItem("token","");
      localStorage.setItem("role","")
     this.authService.role = localStorage.getItem("role") ||"SPECTATOR"
     sessionStorage.setItem("user","")
     this.router.navigateByUrl("")
 
    }


    selectedInne() {
      this.articleSerice.setChosenCategory("INNE");
    }

  selectedFood() {
    this.articleSerice.setChosenCategory("ZABURZENIA_ODZYWIANIA");
  }
    



    selectedSeks() {
      this.articleSerice.setChosenCategory("UZALEZNIENIA_SEKSUALNE")
 
    
    }



    selectedDrugs(){
      this.articleSerice.setChosenCategory("NARKOTYKI")

    }



    showMobile() {
      this.showButtons = true
    }

    responsive:boolean= false;

    showResponsive() {
      console.log( this.responsive)
      this.responsive =!this.responsive
    }



}


