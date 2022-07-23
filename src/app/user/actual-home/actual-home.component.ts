import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { faAngleLeft, faAngleRight, faBookmark, faStoreSlash } from '@fortawesome/free-solid-svg-icons';
import { forkJoin } from 'rxjs';
import { MOVIE_GENRES } from 'src/app/services/cnstants';
import { ITrendMovieRes, MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-actual-home',
  templateUrl: './actual-home.component.html',
  styleUrls: ['./actual-home.component.scss']
})
export class ActualHomeComponent implements OnInit, AfterViewInit {

  @ViewChildren('topFiveHtml') topFiveHtml!: QueryList<ElementRef>;

  topFive: ITrendMovieRes[] = [];
  imagePath: string = 'https://image.tmdb.org/t/p';
  topMoviesDailyAll: ITrendMovieRes[] = [];
  topMoviesDaily: ITrendMovieRes[] = [];
  topMoviesWeekly: ITrendMovieRes[] = [];
  topMoviesWeeklyAll: ITrendMovieRes[] = [];
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;
  faBookmark = faBookmark;
  faStoreSlash = faStoreSlash;
  imageIndex: number = 1;
  dailyStartIndex: number = 0;
  dailyEndIndex: number = 4;
  weeklyStartIndex: number = 0;
  weeklyEndIndex: number = 4;

  constructor(private movieService: MoviesService) { }

  ngOnInit(): void {
    forkJoin({
      trendingMoviesDay: this.movieService.getTrendingMovies('day'),
      trendingMoviesWeek: this.movieService.getTrendingMovies('week'),
      userFavorites: this.movieService.getFavorites()
    }).subscribe(res => {
      this.topMoviesDailyAll = res.trendingMoviesDay.results.map(movie => {
        res.userFavorites.forEach(favMovie => {
          if(movie.id === favMovie.id) movie.isFavorite = true;
        });
        return movie;
      });
      this.topMoviesDaily = this.topMoviesDailyAll.slice(this.dailyStartIndex, this.dailyEndIndex);
      this.topFive = this.topMoviesDailyAll.slice(0,5);
      this.topFive = this.topFive.map((movie) => {
        let genres: string[] = [];
        movie.genre_ids.forEach((id) => MOVIE_GENRES.forEach((genre) => {
          if(genre.id === id) genres.push(genre.name);
        }));
        movie.genres = genres;
        return movie;
      });

      console.log(this.topFive)

      this.topMoviesWeeklyAll = res.trendingMoviesWeek.results.map(movie => {
        res.userFavorites.forEach(favMovie => {
          movie.id === favMovie.id ? movie.isFavorite = true : movie.isFavorite = false;
        });
        return movie;
      });
      this.topMoviesWeekly = this.topMoviesWeeklyAll.slice(this.dailyStartIndex, this.dailyEndIndex);
    });
  }

  ngAfterViewInit() {
    this.autoSlideImages();
  }

  slideImages(val: number) {
    this.imageIndex += val;
    if(this.imageIndex < 1) {
      this.imageIndex = this.topFiveHtml?.length;
    }
    if(this.imageIndex > this.topFiveHtml?.length) {
      this.imageIndex = 1;
    }
    this.topFiveHtml?.forEach((item, i) => {
      item.nativeElement.hidden = true;
      if(i+1 === this.imageIndex) item.nativeElement.hidden = false;
    });
  }

  autoSlideImages() {
    this.imageIndex++;
    if(this.imageIndex < 1) {
      this.imageIndex = this.topFiveHtml?.length;
    }
    if(this.imageIndex > this.topFiveHtml?.length) {
      this.imageIndex = 1;
    }
    this.topFiveHtml?.forEach((item, i) => {
      item.nativeElement.hidden = true;
      if(i+1 === this.imageIndex) item.nativeElement.hidden = false;
    });
    setTimeout(() => this.autoSlideImages(), 5000);
  }

  dailySlideRight(time: string) {
    if(time === 'day') {
      this.dailyStartIndex = this.dailyEndIndex;
      this.dailyEndIndex = this.dailyEndIndex + 4;
      if(this.dailyStartIndex === this.topMoviesDailyAll.length) {
        this.movieService.getTrendingMovies('day', this.dailyStartIndex/2).subscribe((res) => {
          this.topMoviesDailyAll.push(...res.results);
          this.topMoviesDaily = this.topMoviesDailyAll.slice(this.dailyStartIndex, this.dailyEndIndex);
        });
      } else {
        this.topMoviesDaily = this.topMoviesDailyAll.slice(this.dailyStartIndex, this.dailyEndIndex);
      }
    } else {
      this.weeklyStartIndex = this.weeklyEndIndex;
      this.weeklyEndIndex = this.weeklyEndIndex + 4;
      if(this.weeklyStartIndex === this.topMoviesWeeklyAll.length) {
        this.movieService.getTrendingMovies('week', this.weeklyStartIndex/2).subscribe((res) => {
          this.topMoviesWeeklyAll.push(...res.results);
          this.topMoviesWeekly = this.topMoviesWeeklyAll.slice(this.weeklyStartIndex, this.weeklyEndIndex);
        });
      } else {
        this.topMoviesWeekly = this.topMoviesWeeklyAll.slice(this.weeklyStartIndex, this.weeklyEndIndex);
      }
    }
  }

  dailySlideLeft(time: string) {
    if(time === 'day') {
      if(this.dailyStartIndex > 0) {
        this.dailyEndIndex = this.dailyStartIndex;
        this.dailyStartIndex = this.dailyStartIndex - 4;
        this.topMoviesDaily = this.topMoviesDailyAll.slice(this.dailyStartIndex, this.dailyEndIndex);
      }
    } else {
      if(this.weeklyStartIndex > 0) {
        this.weeklyEndIndex = this.weeklyStartIndex;
        this.weeklyStartIndex = this.weeklyStartIndex - 4;
        this.topMoviesWeekly = this.topMoviesWeeklyAll.slice(this.weeklyStartIndex, this.weeklyEndIndex);
      }
    }
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
