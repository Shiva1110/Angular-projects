import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ITrendActors, ITrendActorsRes, ITrendMovieRes, MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  topActors: ITrendActorsRes[] = [];
  Actors: ITrendActorsRes[] = [];
  topFavorites = new Observable<ITrendMovieRes[]>();
  imagePath: string = 'https://image.tmdb.org/t/p';

  constructor(private movieService: MoviesService, private router: Router) { }

  ngOnInit(): void {
    this.movieService.getTrendingPeople().subscribe((res) => {
      this.topActors = res.results.slice(0, 9);
      this.Actors = res.results;
    });

    this.topFavorites = this.movieService.getFavorites();

    this.movieService.updateFav$.subscribe(res => {
      this.topFavorites = this.movieService.getFavorites()
    })

    this.router.navigate(['user/home']);
  }

}
