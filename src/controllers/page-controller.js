import {HeaderProfile} from '../components/header-profile';
import {FooterStatistics} from '../components/footer-statistics';
import {Filters} from '../components/filters-stats';
import {Sorting} from '../components/sort';
import {FilmsBoard} from '../components/films-board';
import {Film} from '../components/film';
import {ShowMoreBtn} from '../components/show-more-btn';
import {ExtraFilmsContainer} from '../components/extra-films-list';
import {render, htmlStringToElement} from '../utils/render';
import moment from 'moment';

export class PageController {
  constructor(container) {
    this._container = container;
    this._sortedFilms = null;
    this._films = null;
    this._renderedFilms = [];
  }

  render(data) {
    const entireMoviesCount = data.entireMoviesCount;
    this._films = data.films;

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
    const filters = new Filters(this._films);
    const sorting = new Sorting();
    const filmsBoard = new FilmsBoard();

    render(siteHeaderEl, headerProfile.getElement());
    render(siteFooterEl, footerStatistics.getElement());
    render(siteMainEl, filters.getElement());
    render(siteMainEl, sorting.getElement());
    render(siteMainEl, filmsBoard.getElement());

    const mainFilmsContainerEl = filmsBoard.getElement().querySelector(`.films .films-list__container`);
    const mainFilmsBoard = filmsBoard.getElement().querySelector(`.films .films-list`);

    const compareFilmsByRating = ({rating: x}, {rating: y}) => Number(y) - Number(x);
    const compareFilmsByDate = ({releaseDate: x}, {releaseDate: y}) => moment(y) - moment(x);

    const renderFilm = (container = mainFilmsContainerEl) => {
      return (film) => {
        const filmCard = new Film(film);

        this._renderedFilms.push(filmCard);
        render(container, filmCard.getElement());
      };
    };

    const renderFilmsMain = (order = `default`) => {
      this._renderedFilms.forEach((film) => film.removeElement());
      this._renderedFilms = [];

      switch (order) {
        case `default`:
          this._sortedFilms = [...this._films];
          break;
        case `rating`:
          this._sortedFilms = [...this._films].sort(compareFilmsByRating);
          break;
        case `date`:
          this._sortedFilms = [...this._films].sort(compareFilmsByDate);
          break;
      }

      this._sortedFilms.slice(0, showingFilmsCount)
        .forEach(renderFilm());
    };

    sorting.subscribe(renderFilmsMain);

    if (this._films.length) {
      renderFilmsMain();
    } else {
      render(mainFilmsContainerEl, htmlStringToElement(`<h2 class="films-list__title">There are no movies in our database</h2>`));
    }

    if (this._films.length) {
      const showMoreBtn = new ShowMoreBtn();
      const showMoreBtnEl = showMoreBtn.getElement();

      render(mainFilmsBoard, showMoreBtnEl);

      showMoreBtn.setClickHandler(() => {
        const prevFilmsCount = showingFilmsCount;
        showingFilmsCount += FilmCount.SHOWING_BY_BUTTON;

        this._sortedFilms.slice(prevFilmsCount, showingFilmsCount)
          .forEach(renderFilm());

        if (showingFilmsCount >= this._films.length) {
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

    if (this._films.length) {
      extraFilmsSections.forEach((section) => {
        const extraFilmSection = new ExtraFilmsContainer(section.title);
        const singleSection = extraFilmSection.getElement();
        const singleSectionContainerEl = singleSection.querySelector(`.films-list__container`);
        let topTwoFilms;

        switch (section.type) {
          case `topRated`:
            topTwoFilms = this._films.sort(compareFilmsByRating).slice(0, 2);
            break;
          case `mostCommented`:
            const compareFilmsByCommentsCount = ({comments: x}, {comments: y}) => y.length - x.length;
            topTwoFilms = this._films.sort(compareFilmsByCommentsCount).slice(0, 2);
            break;
        }

        topTwoFilms.forEach(renderFilm(singleSectionContainerEl));

        render(extraFilmsSectionEl, singleSection);
      });

      render(siteMainFilmsSectionEl, extraFilmsSectionEl);
    }
  }
}