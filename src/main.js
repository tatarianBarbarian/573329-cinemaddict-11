import {Movies} from './models/movies';
import {PageController} from './controllers/page-controller';
// Mocks
import {createRandomLengthArray, mockFilm, getRandomInt} from './mock/film.js';

const moviesMock = {
  movies: createRandomLengthArray(15, 20).map(mockFilm),
  entireMoviesCount: getRandomInt(100000, 150000)
};
const mountingPoint = document.querySelector(`body`);
const moviesModel = new Movies(moviesMock);
const pageController = new PageController(mountingPoint, moviesModel);
pageController.render();
