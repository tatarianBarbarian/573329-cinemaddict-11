import {HeaderProfile} from './components/header-profile';
import {FooterStatistics} from './components/footer-statistics.js';
import {Filters} from './components/filters-stats';
import {FilmsBoard} from './components/films-board';
import {FilmCard} from './components/film-card';
import {ShowMoreBtn} from './components/show-more-btn';
import {ExtraFilmsContainer} from './components/extra-films-list';
// Mocks
import {createRandomLengthArray, mockFilm, getRandomInt} from './mock/film.js';

const FilmCount = {
  EXTRA: 2,
  SHOWING_BY_BUTTON: 5
};

let showingFilmsCount = 5;

const films = createRandomLengthArray(15, 20).map(mockFilm);

const render = (container, element) => {
  container.appendChild(element);
};

const siteHeaderEl = document.querySelector(`.header`);
const siteMainEl = document.querySelector(`.main`);
const siteFooterEl = document.querySelector(`.footer`);

const headerProfile = new HeaderProfile();
const footerStatistics = new FooterStatistics(getRandomInt(100000, 150000));
const filters = new Filters(films);
const filmsBoard = new FilmsBoard();

render(siteHeaderEl, headerProfile.getElement());
render(siteFooterEl, footerStatistics.getElement());
render(siteMainEl, filters.getElement());
render(siteMainEl, filmsBoard.getElement());

const mainFilmsContainerEl = document.querySelector(`.films .films-list__container`);

const renderFilm = (film) => {
  const filmCard = new FilmCard(film);

  render(mainFilmsContainerEl, filmCard.getElement());
};

films.slice(0, showingFilmsCount)
  .forEach(renderFilm);

const mainFilmsBoard = document.querySelector(`.films .films-list`);

const showMoreBtn = new ShowMoreBtn();

render(mainFilmsBoard, showMoreBtn.getElement());
const showMoreBtnEl = document.querySelector(`.films-list__show-more`);

showMoreBtnEl.addEventListener(`click`, () => {
  const prevFilmsCount = showingFilmsCount;
  showingFilmsCount += FilmCount.SHOWING_BY_BUTTON;

  films.slice(prevFilmsCount, showingFilmsCount)
    .forEach(renderFilm);

  if (showingFilmsCount >= films.length) {
    showMoreBtnEl.remove();
  }
});

const siteMainFilmsSectionEl = document.querySelector(`.films`);
const extraFilmsSections = [`Top rated`, `Most commented`];
const extraFilmsSectionEl = document.createDocumentFragment();

extraFilmsSections.forEach((section) => {
  const extraFilmSection = new ExtraFilmsContainer(section);
  const singleSection = extraFilmSection.getElement();
  const singleSectionContainerEl = singleSection.querySelector(`.films-list__container`);

  for (let i = 0; i < FilmCount.EXTRA; i++) {
    const filmCard = new FilmCard(mockFilm());
    render(singleSectionContainerEl, filmCard.getElement());
  }

  render(extraFilmsSectionEl, singleSection);
});

render(siteMainFilmsSectionEl, extraFilmsSectionEl);
