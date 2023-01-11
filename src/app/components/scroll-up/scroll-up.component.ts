import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scroll-up',
  templateUrl: './scroll-up.component.html',
  styleUrls: ['./scroll-up.component.css']
})
export class ScrollUpComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.addEventListener("scroll",this.buttonVisibilityHandler)
   };

   buttonVisibilityHandler(){
     const scrollToTopButton = document.getElementById("scrollBtn") as HTMLButtonElement
     let y = window.scrollY;
     // If the scroll value is greater than the window height, let's add a class to the scroll-to-top button to show it!
     if (y > 250) {
       scrollToTopButton.style.visibility = "visible"
     } else {
       scrollToTopButton.style.visibility = "hidden"
     }
   }
   scrollUp(){
     window.scroll(0,0)
   }

}
