import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'kako-ang-4';

  kot1 = ""
  kot = "kotek";

  klik() {

    console.log("qwer");

  }



  klik2()
  {

   this.kot = this.kot1;

  }


}
