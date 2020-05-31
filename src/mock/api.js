import {createRandomLengthArray, mockFilm} from './film.js';
import moment from 'moment';


export const filterMovies = (filter = `all`, movies) => {
  const Filter = {
    watchlist: `isWatchlisted`,
    history: `isWatched`,
    favorite: `isFavorite`
  };
  const result = movies.filter((movie) => {
    return movie[Filter[filter]] === true;
  });

  return filter === `all` ? movies : result;
};

const compareFilmsByDate = ({releaseDate: x}, {releaseDate: y}) => {
  return moment(y) - moment(x); // FIXME: Возможно, лишнее
};

const compareFilmsByRating = ({rating: x}, {rating: y}) => {
  return Number(y) - Number(x);
};

export const sortMovies = (sorting, movies) => {
  let result;

  switch (sorting) {
    case `date`:
      result = movies.sort(compareFilmsByDate);
      break;
    case `rating`:
      result = movies.sort(compareFilmsByRating);
      break;
    case `default`:
      result = movies;
      break;
  }

  return result;
};

export const getMovies = ({filter, sorting} = {}, movies) => {
  let result;

  if (filter) {
    result = filterMovies(filter, movies);
  } else if (sorting) {
    result = sortMovies(sorting, movies);
  }

  return result;
};
