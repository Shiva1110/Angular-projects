import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesService } from './movies.service';



@NgModule({
  declarations: [],
  providers: [
    MoviesService
  ],
  imports: [
    CommonModule
  ]
})
export class ServicesModule { }
