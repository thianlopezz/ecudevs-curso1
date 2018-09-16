import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appUpper]'
})
export class UpperDirective {

  // ESTA DIRECTIVA CONTROLA QUE AL ESCRIBIR EN EL INPUT
  // AUTOATICAMENTE ESCRIBA EN MAYUSCULAS

  // VER numero.directiv.ts

  constructor(private el: ElementRef) {
  }

  // ESCUCHAMOS EL EVENTO keyup
  @HostListener('keyup', ['$event'])
  onKeyDown(event: KeyboardEvent) {

    // EN CADA ENTRADA AL EVENTO VAMOS A HACER EL UPPERCASE RESPECTIVO
    this.el.nativeElement.value = this.el.nativeElement.value.toUpperCase();
  }
}
