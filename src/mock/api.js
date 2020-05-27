import {createRandomLengthArray, mockFilm} from './film.js';

export const genFilteredMovies = (filter = `all`) => {
  let movies;

  if (filter === `all`) {
    movies = createRandomLengthArray(15, 20).map(mockFilm);
  } else {
    movies = createRandomLengthArray(15, 20).map(mockFilm).map((film) => Object.assign({}, film, {[filter]: true}));
  }

  return movies;
};

