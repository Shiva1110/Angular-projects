import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ITrendActors {
  page: number,
  results: ITrendActorsRes[],
  total_pages: number,
  total_results: number
}

export interface ITrendActorsRes {
  adult: boolean,
  gender: number,
  id: number,
  known_for: IKnownFor[],
  known_for_department: string,
  name: string,
  popularity: number,
  profile_path: string
}

export interface IKnownFor {
  adult: boolean,
  backdrop_path: string,
  genre_ids: number[],
  id: number,
  media_type: string,
  original_language: string,
  original_title: string,
  overview: string,
  poster_path: string,
  release_date: string,
  title: string,
  video: boolean,
  vote_average: number,
  vote_count: number
}

export interface ITrendMovies {
  page: number;
  results: ITrendMovieRes[];
  total_pages: number;
  total_results: number;
}

export interface ITrendMovieRes {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  name?: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date?: string;
  vote_average: number;
  vote_count: number;
  title?: string;
  original_title?: string;
  release_date?: string;
  video?: boolean;
  genres?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  getTrendingMovies(time: string, page?: number): Observable<ITrendMovies> {
    if(page)
    return this.http.get<ITrendMovies>(`https://api.themoviedb.org/3/trending/movie/${time}?api_key=bbaeb64e592f1b183c66c701b48e5cd3&page=${page}`);
    return this.http.get<ITrendMovies>(`https://api.themoviedb.org/3/trending/movie/${time}?api_key=bbaeb64e592f1b183c66c701b48e5cd3`);
  }

  getTrendingPeople(page?: number): Observable<ITrendActors> {
    if(page)
    return this.http.get<ITrendActors>(`https://api.themoviedb.org/3/person/popular?api_key=bbaeb64e592f1b183c66c701b48e5cd3&page=${page}`);
    return this.http.get<ITrendActors>(`https://api.themoviedb.org/3/person/popular?api_key=bbaeb64e592f1b183c66c701b48e5cd3`);
  }

  getMovieSearchResults(query: string): Observable<ITrendMovies> {
    return this.http.get<ITrendMovies>(`https://api.themoviedb.org/3/search/movie?api_key=bbaeb64e592f1b183c66c701b48e5cd3&query=${query}`);
  }
}
