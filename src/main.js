import {HeaderProfile} from './components/header-profile';
import {FooterStatistics} from './components/footer-statistics';
import {Filters} from './components/filters-stats';
import {FilmsBoard} from './components/films-board';
import {FilmCard} from './components/film-card';
import {ShowMoreBtn} from './components/show-more-btn';
import {ExtraFilmsContainer} from './components/extra-films-list';
import {render, htmlStringToElement} from './utils/render';
// Mocks
import {createRandomLengthArray, mockFilm, getRandomInt} from './mock/film.js';

const FilmCount = {
  EXTRA: 2,
  SHOWING_BY_BUTTON: 5
};

let showingFilmsCount = 5;

const films = createRandomLengthArray(15, 20).map(mockFilm);

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

const renderFilm = (container = mainFilmsContainerEl) => {
  return (film) => {
    const filmCard = new FilmCard(film);

    render(container, filmCard.getElement());
  };
};

if (films.length) {
  films.slice(0, showingFilmsCount)
    .forEach(renderFilm());
} else {
  render(mainFilmsContainerEl, htmlStringToElement(`<h2 class="films-list__title">There are no movies in our database</h2>`));
}


const mainFilmsBoard = document.querySelector(`.films .films-list`);

if (films.length) {
  const showMoreBtn = new ShowMoreBtn();

  render(mainFilmsBoard, showMoreBtn.getElement());
  const showMoreBtnEl = document.querySelector(`.films-list__show-more`);

  showMoreBtnEl.addEventListener(`click`, () => {
    const prevFilmsCount = showingFilmsCount;
    showingFilmsCount += FilmCount.SHOWING_BY_BUTTON;

    films.slice(prevFilmsCount, showingFilmsCount)
      .forEach(renderFilm());

    if (showingFilmsCount >= films.length) {
      showMoreBtnEl.remove();
    }
  });
}


const siteMainFilmsSectionEl = document.querySelector(`.films`);
const extraFilmsSections = [
  {title: `Top rated`, type: `topRated`},
  {title: `Most commented`, type: `mostCommented`}
];
const extraFilmsSectionEl = document.createDocumentFragment();

if (films.length) {
  extraFilmsSections.forEach((section) => {
    const extraFilmSection = new ExtraFilmsContainer(section.title);
    const singleSection = extraFilmSection.getElement();
    const singleSectionContainerEl = singleSection.querySelector(`.films-list__container`);
    let topTwoFilms;

    switch (section.type) {
      case `topRated`:
        const compareByRating = ({rating: x}, {rating: y}) => Number(y) - Number(x);
        topTwoFilms = films.sort(compareByRating).slice(0, 2);
        break;
      case `mostCommented`:
        const compareByCommentsCount = ({comments: x}, {comments: y}) => y.length - x.length;
        topTwoFilms = films.sort(compareByCommentsCount).slice(0, 2);
        break;
    }

    topTwoFilms.forEach(renderFilm(singleSectionContainerEl));

    render(extraFilmsSectionEl, singleSection);
  });

  render(siteMainFilmsSectionEl, extraFilmsSectionEl);
}

