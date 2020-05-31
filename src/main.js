import {Movies} from './models/movies';
import {PageController} from './controllers/page-controller';
import {FilterController} from './controllers/filter-controller';
import {SortingController} from './controllers/sort-controller';
import {ApiAdapter} from './models/api';

const api = new ApiAdapter();

const mountingPoint = document.querySelector(`body`);

api.getMovies().then((movies) => {
  const moviesModel = new Movies(movies);
  const pageController = new PageController(mountingPoint, moviesModel);

  const siteMainEl = mountingPoint.querySelector(`.main`);

  const sortingController = new SortingController(siteMainEl, moviesModel);
  const filterController = new FilterController(siteMainEl, moviesModel);

  filterController.render();
  sortingController.render();
  pageController.render();
});
