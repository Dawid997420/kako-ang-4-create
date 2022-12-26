import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {


  navbarfixed =false;
  showNav = false ;


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


}
