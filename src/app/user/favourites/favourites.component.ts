import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {

  constructor(private movieService: MoviesService) { }

  ngOnInit(): void {
    this.movieService.getFavorites().subscribe(res => {
      console.log(res);
    });
  }

}
