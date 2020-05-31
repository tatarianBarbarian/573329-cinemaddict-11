import {Movies} from './models/movies';
import {PageController} from './controllers/page-controller';
import {FilterController} from './controllers/filter-controller';
import {SortingController} from './controllers/sort-controller';
// Mocks
import {createRandomLengthArray, mockFilm, getRandomInt} from './mock/film.js';

const moviesMock = {
  movies: createRandomLengthArray(15, 21).map(mockFilm),
  entireMoviesCount: getRandomInt(100000, 150000)
};
const mountingPoint = document.querySelector(`body`);
const moviesModel = new Movies(moviesMock);
const pageController = new PageController(mountingPoint, moviesModel);

const siteMainEl = mountingPoint.querySelector(`.main`);

const sortingController = new SortingController(siteMainEl, moviesModel);
const filterController = new FilterController(siteMainEl, moviesModel);

filterController.render();
sortingController.render();
pageController.render();
