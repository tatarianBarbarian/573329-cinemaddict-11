import {createHeaderProfileMarkup} from './components/header-profile';
import {createFiltersAndStatsMarkup} from './components/filters-stats';
import {createFilmsBoardMarkup} from './components/films-board';
import {createFilmCardMarkup} from './components/film-card';
import {createShowMoreBtnMarkup} from './components/show-more-btn';
import {createExtraFilmsListMarkup} from './components/extra-films-list';
import {createFilmDetailsPopupMarkup} from './components/film-details.js';
import {createFooterStatisticsMarkup} from './components/footer-statistics.js';
// Mocks
import {createRandomLengthArray, mockFilm, getRandomInt} from './mock/film.js';

const FilmCount = {
  MAIN: 20,
  EXTRA: 2,
};

let showingFilmsCount = 5;
const SHOWING_FILMS_BY_BUTTON = 5;

let mockedFilms = createRandomLengthArray(15, 20).map(mockFilm);

const render = (container, template, position = `beforeend`) => {
  container.insertAdjacentHTML(position, template);
};

const siteHeaderEl = document.querySelector(`.header`);
const siteMainEl = document.querySelector(`.main`);
const siteFooterEl = document.querySelector(`.footer`);

render(siteHeaderEl, createHeaderProfileMarkup());
render(siteFooterEl, createFooterStatisticsMarkup(getRandomInt(100000, 150000)));
render(siteMainEl, createFiltersAndStatsMarkup(mockedFilms));
render(siteMainEl, createFilmsBoardMarkup());

const mainFilmsContainerEl = document.querySelector(`.films .films-list__container`);

mockedFilms.slice(0, showingFilmsCount)
  .forEach((film) => render(mainFilmsContainerEl, createFilmCardMarkup(film)));

render(siteMainEl, createFilmDetailsPopupMarkup(mockedFilms[0]));

document.addEventListener(`click`, (event) => {
  if (event.target.classList.contains(`film-details__close-btn`)) {
    event.target.closest(`.film-details`).remove();
  }
});

document.addEventListener(`keyup`, (event) => {
  if (event.key === `Escape`) {
    const filmDetailsPopup = document.querySelector(`.film-details`);

    if (filmDetailsPopup) {
      filmDetailsPopup.remove();
    }
  }
});

const mainFilmsBoard = document.querySelector(`.films .films-list`);

render(mainFilmsBoard, createShowMoreBtnMarkup());
const showMoreBtnEl = document.querySelector(`.films-list__show-more`);

showMoreBtnEl.addEventListener(`click`, () => {
  const prevFilmsCount = showingFilmsCount;
  showingFilmsCount += SHOWING_FILMS_BY_BUTTON;

  mockedFilms.slice(prevFilmsCount, showingFilmsCount)
    .forEach((film) => render(mainFilmsContainerEl, createFilmCardMarkup(film)));

  if (showingFilmsCount >= mockedFilms.length) {
    showMoreBtnEl.remove();
  }
});

const siteMainFilmsSectionEl = document.querySelector(`.films`);
const extraFilmsSections = [`Top rated`, `Most commented`];
const extraFilmsSectionEl = document.createDocumentFragment();

extraFilmsSections.forEach((section) => {
  const singleSection = document
    .createRange()
    .createContextualFragment(createExtraFilmsListMarkup(section));
  const singleSectionContainerEl = singleSection.querySelector(`.films-list__container`);

  for (let i = 0; i < FilmCount.EXTRA; i++) {
    render(singleSectionContainerEl, createFilmCardMarkup(mockFilm()));
  }

  extraFilmsSectionEl.appendChild(singleSection);
});

siteMainFilmsSectionEl.appendChild(extraFilmsSectionEl);
