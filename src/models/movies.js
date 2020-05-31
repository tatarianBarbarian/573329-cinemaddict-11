// TODO: частичная перерисовка + сброс сортировки при смене фильтра + корректный показ надписи о том, фильмов нет
import {getMovies} from '../mock/api';

export class Movies {
  constructor(moviesData) {
    this.moviesDefault = moviesData.movies; // Пока нет апишечки
    this.movies = moviesData.movies;
    this.entireFilmsCount = moviesData.entireFilmsCount;
    this.renderedFilms = [];
    this._subscribes = [];
    this.topRatedMovies = [];
    this.mostCommentedMovies = [];
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

  filterMovies(filter) {
    this.getMovies({filter});
    this.broadcast(`filterMovies`, this.movies);
  }

  sortMovies(sorting) {
    this.getMovies({sorting});
    this.broadcast(`sortMovies`, this.movies);
  }

  getMovies(params) {
    this.movies = getMovies(params, this.moviesDefault);
    return this.movies;
  }

  setMovies() {

  }

  updateMovie(id, data) {
    const filmToRerender = this.renderedFilms.find((film) => film.filmData.id === id);
    Object.assign(this.movies.find((movie) => movie.id === id), data);

    filmToRerender.filmData = data;
    filmToRerender.rerender();
    this.broadcast(`updateMovie`, this.movies);
  }
}
