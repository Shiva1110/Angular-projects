import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { ITrendMovieRes, MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  faMagnifyingGlass = faMagnifyingGlass;
  topSearchResults: ITrendMovieRes[] = [];
  searchControl = new FormControl();
  imagePath: string = 'https://image.tmdb.org/t/p';
  isSearching: boolean = false;

  constructor(private movieService: MoviesService) { }

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(debounceTime(500), switchMap((val: string) => {
      this.isSearching = true;
      if(val) return this.movieService.getMovieSearchResults(val);
      else {
        this.topSearchResults = [];
        this.isSearching = false;
        return [];
      }
    })).subscribe((res) => {
      this.topSearchResults = res.results.slice(0, 10).map((movie) => {
        if(movie.overview.length > 250) movie.overview = movie.overview.substring(0, 250) + '...';
        return movie;
      });
      this.isSearching = false;
    });
  }
}
