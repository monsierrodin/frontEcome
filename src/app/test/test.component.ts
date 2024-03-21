import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  text:string="salut"
  animatedText = '';

  constructor() { }

  ngOnInit(): void {
  }

  openFileInput() {
    // Déclencher l'ouverture de l'élément input[type="file"]
    this.fileInput.nativeElement.click();
  }
  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Vous pouvez faire quelque chose avec le fichier ici, par exemple l'envoyer à un serveur.
      console.log('Fichier sélectionné :', file);
    }
  }
  animateText() {
    const textLength = this.text.length;
    let currentIndex = 0;
    let reverse = false;

     setInterval(() => {
      if (currentIndex === textLength) {
        reverse = true;
      } else if (currentIndex === 0) {
        reverse = false;
      }

      this.animatedText = this.text.substring(0, currentIndex);

      if (!reverse) {
        currentIndex++;
      } else {
        currentIndex--;
      }
    }, 250);
  }

}
