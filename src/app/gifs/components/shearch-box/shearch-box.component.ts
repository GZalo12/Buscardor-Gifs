import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-shearch-box',
  template: `
    <h5>Buscar:</h5>
    <input
      type="text"
      class="form-control"
      placeholder="Buscar gifs..."
      (keyup.enter)="searchTag()"
      #txtTagInput
      >
  `

})
export class ShearchBoxComponent {

  // decorador  retorna el primer elemento con referencia a la etiqueta
  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService){}

  searchTag(){
    const newTag = this.tagInput.nativeElement.value;
    if(newTag.length === 0) return;


    this.gifsService.searchTag(newTag);

    this.tagInput.nativeElement.value = '';

  }


}
