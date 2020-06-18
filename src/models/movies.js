import {compareFilmsByDate, compareFilmsByRating} from '../utils/compare';
import {ApiAdapter} from './api';

export class Movies {
  constructor(movies) {
    this._moviesDefault = movies;
    this.movies = [...this._moviesDefault];
    this.renderedMovies = [];
    this._subscribes = [];
    this.topRatedMovies = [];
    this.mostCommentedMovies = [];
    this._actualSorting = `default`;
    this.api = new ApiAdapter();
  }

  get _displayingMovies() {
    return this.renderedMovies.concat(this.topRatedMovies, this.mostCommentedMovies);
  }

  set actualSorting(value) {
    this._actualSorting = value;
    this.broadcast(`sortMovies`, this.movies);
  }

  get actualSorting() {
    return this._actualSorting;
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
    const possibleFilters = {
      all: `all`,
      watchlist: `isWatchlisted`,
      history: `isWatched`,
      favorite: `isFavorite`
    };

    if (filter === `all`) {
      this.movies = [...this._moviesDefault];
    } else {
      this.movies = this._moviesDefault.filter((movie) => movie[possibleFilters[filter]]); // FIXME
    }

    this.actualSorting = `default`;
    this.broadcast(`filterMovies`, this.movies);
  }

  sortMovies(sorting) {
    const sortings = {
      date: compareFilmsByDate,
      rating: compareFilmsByRating
    };

    if (sorting === `default`) {
      this.movies = this.movies;
    } else {
      this.movies = this.movies.sort(sortings[sorting]);
    }

    this.broadcast(`sortMovies`, this.movies);
  }

  getMovies() {

  }

  setMovies() {

  }

  updateMovie(id, data) {
    const moviesToRerender = this._displayingMovies.filter((movie) => movie.movieData.id === id);

    const movieToUpdate = this._moviesDefault.find((movie) => movie.id === id);
    const updatedMovie = Object.assign({}, movieToUpdate, data);

    this.api.updateMovie(movieToUpdate.id, updatedMovie)
      .then(() => { // TODO: Process exceptions
        Object.assign(movieToUpdate, updatedMovie);
        this.movies = [...this._moviesDefault];

        moviesToRerender.forEach((movie) => {
          movie.movieData = data;
          movie.rerender();
        });

        this.broadcast(`updateMovie`, this.movies);
      })
      .catch(() => {
        moviesToRerender.forEach((movie) => {
          movie.movieData = data;
          movie.rerender();
        });
      });
  }
}
