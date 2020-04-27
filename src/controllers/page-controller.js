import {HeaderProfile} from '../components/header-profile';
import {FooterStatistics} from '../components/footer-statistics';
import {Filters} from '../components/filters-stats';
import {Sorting} from '../components/sort';
import {FilmsBoard} from '../components/films-board';
import {Film} from '../components/film';
import {ShowMoreBtn} from '../components/show-more-btn';
import {ExtraFilmsContainer} from '../components/extra-films-list';
import {render, htmlStringToElement} from '../utils/render';

export class PageController {
  constructor(container) {
    this._container = container;
  }

  render(data) {
    const {films, entireMoviesCount} = data;
    const FilmCount = {
      EXTRA: 2,
      SHOWING_BY_BUTTON: 5
    };

    let showingFilmsCount = 5;

    const siteHeaderEl = this._container.querySelector(`.header`);
    const siteMainEl = this._container.querySelector(`.main`);
    const siteFooterEl = this._container.querySelector(`.footer`);

    const headerProfile = new HeaderProfile();
    const footerStatistics = new FooterStatistics(entireMoviesCount);
    const filters = new Filters(films);
    const sorting = new Sorting();
    const filmsBoard = new FilmsBoard();

    render(siteHeaderEl, headerProfile.getElement());
    render(siteFooterEl, footerStatistics.getElement());
    render(siteMainEl, filters.getElement());
    render(siteMainEl, sorting.getElement());
    render(siteMainEl, filmsBoard.getElement());

    const mainFilmsContainerEl = filmsBoard.getElement().querySelector(`.films .films-list__container`);
    const mainFilmsBoard = filmsBoard.getElement().querySelector(`.films .films-list`);

    const renderFilm = (container = mainFilmsContainerEl) => {
      return (film) => {
        const filmCard = new Film(film);

        render(container, filmCard.getElement());
      };
    };

    if (films.length) {
      films.slice(0, showingFilmsCount)
        .forEach(renderFilm());
    } else {
      render(mainFilmsContainerEl, htmlStringToElement(`<h2 class="films-list__title">There are no movies in our database</h2>`));
    }


    if (films.length) {
      const showMoreBtn = new ShowMoreBtn();
      const showMoreBtnEl = showMoreBtn.getElement();

      render(mainFilmsBoard, showMoreBtnEl);

      showMoreBtn.setClickHandler(() => {
        const prevFilmsCount = showingFilmsCount;
        showingFilmsCount += FilmCount.SHOWING_BY_BUTTON;

        films.slice(prevFilmsCount, showingFilmsCount)
          .forEach(renderFilm());

        if (showingFilmsCount >= films.length) {
          showMoreBtn.removeElement();
        }
      });
    }

    const siteMainFilmsSectionEl = filmsBoard.getElement();
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
  }
}
