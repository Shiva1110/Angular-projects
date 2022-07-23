import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faMagnifyingGlass, faXmark, faBookmark, faStoreSlash } from '@fortawesome/free-solid-svg-icons';
import { combineLatest, debounceTime, forkJoin, merge, Observable, Subject, switchMap } from 'rxjs';
import { ITrendMovieRes, ITrendMovies, MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  faMagnifyingGlass = faMagnifyingGlass;
  faXmark = faXmark;
  faBookmark = faBookmark;
  faStoreSlash = faStoreSlash;
  topSearchResults: ITrendMovieRes[] = [];
  searchControl = new FormControl();
  imagePath: string = 'https://image.tmdb.org/t/p';
  isSearching: boolean = false;

  constructor(private movieService: MoviesService) { }

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(debounceTime(500), switchMap((val: string) => {
      this.isSearching = true;
      if(val) return combineLatest([this.movieService.getMovieSearchResults(val), this.movieService.getFavorites()]);
      else {
        this.topSearchResults = [];
        this.isSearching = false;
        return [];
      }
    })).subscribe(([searchRes, favMovies]) => {
      this.topSearchResults = searchRes.results.slice(0, 10).map((movie) => {
        if(movie.overview.length > 250) movie.overview = movie.overview.substring(0, 250) + '...';
        favMovies.forEach(favMovie => {
          if(movie.id === favMovie.id) movie.isFavorite = true;
        });
        return movie;
      });
      this.isSearching = false;
    });
  }

  clear() {
    this.searchControl.setValue('');
  }

  addToFavorites(movie: ITrendMovieRes) {
    movie.isFavorite = true;
    this.movieService.addFavorite(movie).subscribe(res => {
      console.log(res);
    });
  }

  remFromFavorites(movie: ITrendMovieRes) {
    movie.isFavorite = false;
    this.movieService.removeFavorite(movie.id).subscribe(res => {
      console.log(res);
    });
  }
}
