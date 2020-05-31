// TODO: Завести топрейтед и мосткомментед + частичная перерисовка + появление кнопки show more при загрузке новых фильмов + сброс сортировки при смене фильтра
import {getMovies} from '../mock/api';

export class Movies {
  constructor(moviesData) {
    this.moviesDefault = moviesData.movies; // Пока нет апишечки
    this.movies = moviesData.movies;
    this.entireFilmsCount = moviesData.entireFilmsCount;
    this.renderedFilms = [];
    this._subscribes = [];
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
    this.movies = getMovies(params, this.moviesDefault); // ТУТ ПОПРАВИТЬ
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
