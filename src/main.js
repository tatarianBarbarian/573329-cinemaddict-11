import {PageController} from './controllers/page-controller';
// Mocks
import {createRandomLengthArray, mockFilm, getRandomInt} from './mock/film.js';

const mockedData = {
  films: createRandomLengthArray(15, 20).map(mockFilm),
  entireMoviesCount: getRandomInt(100000, 150000)
};
const mountingPoint = document.querySelector(`body`);
const pageController = new PageController(mountingPoint);
pageController.render(mockedData);
