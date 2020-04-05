import {createHeaderProfileMarkup} from './components/header-profile';
import {createFiltersAndStatsMarkup} from './components/filters-stats';
import {createFilmsBoardMarkup} from './components/films-board';
import {createFilmCardMarkup} from './components/film-card';
import {createShowMoreBtnMarkup} from './components/show-more-btn';
import {createExtraFilmsListMarkup} from './components/extra-films-list';

const FilmCount = {
  MAIN: 5,
  EXTRA: 2
};

const render = (container, template, position = `beforeend`) => {
  container.insertAdjacentHTML(position, template);
};

const siteHeaderEl = document.querySelector(`.header`);
render(siteHeaderEl, createHeaderProfileMarkup());

const siteMainEl = document.querySelector(`.main`);
render(siteMainEl, createFiltersAndStatsMarkup());
render(siteMainEl, createFilmsBoardMarkup());

const mainFilmsContainerEl = document.querySelector(`.films .films-list__container`);

for (let i = 0; i < FilmCount.MAIN; i++) {
  render(mainFilmsContainerEl, createFilmCardMarkup());
}

const mainFilmsBoard = document.querySelector(`.films .films-list`);

render(mainFilmsBoard, createShowMoreBtnMarkup());

const siteMainFilmsSectionEl = document.querySelector(`.films`);
const extraFilmsSections = [`Top rated`, `Most commented`];
const extraFilmsSectionEl = document.createDocumentFragment();

extraFilmsSections.forEach((section) => {
  const singleSection = document
    .createRange()
    .createContextualFragment(createExtraFilmsListMarkup(section));
  const singleSectionContainerEl = singleSection.querySelector(`.films-list__container`);

  for (let i = 0; i < FilmCount.EXTRA; i++) {
    render(singleSectionContainerEl, createFilmCardMarkup());
  }

  extraFilmsSectionEl.appendChild(singleSection);
});

siteMainFilmsSectionEl.appendChild(extraFilmsSectionEl);
