import {genFilteredMovies} from '../mock/api';

export class Movies {
  constructor(moviesData) {
    this.movies = moviesData.movies;
    this.entireFilmsCount = moviesData.entireFilmsCount;
    this.renderedFilms = [];
  }

  getMovies(params) {
    return genFilteredMovies(params.filter);
  }

  setMovies() {

  }

  updateMovie(id, data) {
    const filmToRerender = this.renderedFilms.find((film) => film.filmData.id === id);

    filmToRerender.filmData = data;
    filmToRerender.rerender();
  }

  updateFilter(value) {
    this.movies = this.getMovies({filter: value});
  }
}
