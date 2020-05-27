import {Movies} from './models/movies';
import {PageController} from './controllers/page-controller';
import {FilterController} from './controllers/filter-controller';
// Mocks
import {createRandomLengthArray, mockFilm, getRandomInt} from './mock/film.js';

const moviesMock = {
  movies: createRandomLengthArray(15, 20).map(mockFilm),
  entireMoviesCount: getRandomInt(100000, 150000)
};
const mountingPoint = document.querySelector(`body`);
const moviesModel = new Movies(moviesMock);
const pageController = new PageController(mountingPoint, moviesModel);

const siteMainEl = mountingPoint.querySelector(`.main`);

const filterController = new FilterController(siteMainEl, moviesModel);

filterController.render();
pageController.render();
