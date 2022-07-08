import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { ITrendMovieRes, MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-actual-home',
  templateUrl: './actual-home.component.html',
  styleUrls: ['./actual-home.component.scss']
})
export class ActualHomeComponent implements OnInit, AfterViewInit {

  @ViewChildren('topFiveHtml') topFiveHtml!: QueryList<ElementRef>;
  @ViewChildren('topFiveInfo') topFiveInfo!: QueryList<ElementRef>;

  topFive: ITrendMovieRes[] = [];
  imagePath: string = 'https://image.tmdb.org/t/p';
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;
  imageIndex: number = 1;

  constructor(private movieService: MoviesService) { }

  ngOnInit(): void {
    this.movieService.getTrendingMovies('day').subscribe((res) => {
      this.topFive = res.results.slice(0,5);
      console.log(this.topFive)
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
    this.topFiveInfo?.forEach((item, i) => {
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
    this.topFiveInfo?.forEach((item, i) => {
      item.nativeElement.hidden = true;
      if(i+1 === this.imageIndex) item.nativeElement.hidden = false;
    });
    setTimeout(() => this.autoSlideImages(), 5000);
  }

}
