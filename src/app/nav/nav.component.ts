import { Component, HostListener } from '@angular/core';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {


  navbarfixed =false;
  showNav = false ;


  constructor( private articleSerice :ArticleService) {

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

  selectedAlcohol() {

    this.articleSerice.setChosenCategory("ALKOHOL")
 
   // window.location.reload();
    }


    
  selectedPorno() {

    this.articleSerice.setChosenCategory("PORNOGRAFIA")
 
    
    }

    selectedSeks() {
      this.articleSerice.setChosenCategory("SEKSOHOLIZM")
 
    
    }

    selectedCyberSeks(){
        this.articleSerice.setChosenCategory("SEKSOHOLIZM")
 
    }


    selectedDrugs(){
      this.articleSerice.setChosenCategory("NARKOTYKI")

    }

}


