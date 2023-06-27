import { Component } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { Gifs } from '../../interfaces/gifs.interface';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',

})
export class HomePageComponent {

  constructor( private gifsService: GifsService){}

  // retornamos la lista que contiene nuesro array de gifs
  get gifs(): Gifs[] {
    return this.gifsService.gifList;
  }
}
