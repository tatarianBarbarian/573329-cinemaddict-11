// TODO: сброс сортировки при смене фильтра + корректные фильтры
import {getMovies as getMockMovies} from '../mock/api';
import {ApiAdapter} from './api';

export class Movies {
  constructor(movies) {
    this.moviesDefault = movies; // Пока нет апишечки
    this.movies = movies;
    this.renderedMovies = [];
    this._subscribes = [];
    this.topRatedMovies = [];
    this.mostCommentedMovies = [];
    this.api = new ApiAdapter();
  }

  subscribe(cb) {
    this._subscribes.push(cb);
  }

  broadcast(topic, data) {
    this._subscribes.forEach((sub) => {
      if (sub.topic === topic) {
        sub.cb(data);
      }
    });
  }

  get _displayingMovies() {
    return this.renderedMovies.concat(this.topRatedMovies, this.mostCommentedMovies);
  }

  filterMovies(filter) {
    this.getMovies({filter});
    this.broadcast(`filterMovies`, this.movies);
  }

  sortMovies(sorting) {
    this.getMovies({sorting});
    this.broadcast(`sortMovies`, this.movies);
  }

  getMovies(params) {
    this.movies = getMockMovies(params, this.moviesDefault);
    return this.movies;
  }

  setMovies() {

  }

  updateMovie(id, data) {
    const moviesToRerender = this._displayingMovies.filter((movie) => movie.movieData.id === id);

    const movieToUpdate = this.movies.find((movie) => movie.id === id);
    const updatedMovie = Object.assign(movieToUpdate, data);

    this.api.updateMovie(movieToUpdate.id, updatedMovie)
      .then(() => { // TODO: Process exceptions
        moviesToRerender.forEach((movie) => {
          movie.movieData = data;
          movie.rerender();
        });

        this.broadcast(`updateMovie`, this.movies);
      });
  }
}
