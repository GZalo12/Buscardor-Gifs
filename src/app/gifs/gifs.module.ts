import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home/home-page.component';
import { ShearchBoxComponent } from './components/shearch-box/shearch-box.component';
import { CardListComponent } from './components/card-list/card-list.component';



@NgModule({
  declarations: [
    HomePageComponent,
    ShearchBoxComponent,
    CardListComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    HomePageComponent
  ]
})
export class GifsModule { }
