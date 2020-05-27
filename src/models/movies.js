export class Movies {
  constructor(moviesData) {
    this.movies = moviesData.movies;
    this.entireFilmsCount = moviesData.entireFilmsCount;
    this.renderedFilms = null;
  }

  getFilms() {

  }

  setFilms() {

  }

  updateMovie(id, data) {
    const filmToRerender = this.renderedFilms.find((film) => film.filmData.id === id);

    filmToRerender.filmData = data;
    filmToRerender.rerender();
  }
}
