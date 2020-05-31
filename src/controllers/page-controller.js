import {HeaderProfile} from '../components/header-profile';
import {FooterStatistics} from '../components/footer-statistics';
import {FilmsBoard} from '../components/films-board';
import {MovieController} from './movie-controller';
import {ShowMoreBtnController} from './show-more-btn-controller';
import {ExtraFilmsContainer} from '../components/extra-films-list';
import {render, htmlStringToElement} from '../utils/render';
import {compareFilmsByRating, compareFilmsByCommentsCount} from '../utils/compare';

export class PageController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._sortedFilms = null;
    this.FilmCount = {
      EXTRA: 2,
      SHOWING_BY_BUTTON: 5,
      FOR_BUTTON_SHOWING: 5
    };
    this.showingFilmsCount = 5;

    this._moviesModel.subscribe({
      topic: `filterMovies`,
      cb: this._onFilterChange.bind(this)
    });

    this._moviesModel.subscribe({
      topic: `sortMovies`,
      cb: this._onSortChange.bind(this)
    });

    this._showMoreBtnController = null;
  }

  _onDataChange(id, movieData) {
    this._moviesModel.updateMovie(id, movieData);
  }

  _onViewChange() {
    this._moviesModel.renderedFilms.forEach((film) => film.setDefaultView());
  }

  _onFilterChange() {
    this.renderFilmsMain();
  }

  _onSortChange() {
    this.renderFilmsMain();
  }

  _onShowMoreBtnClick(filmsToRender) {
    filmsToRender.forEach(this.renderFilm());
  }

  renderFilm(container = this.mainFilmsContainerEl) {
    return (film) => {
      const filmCard = new MovieController(container, this._onDataChange.bind(this), this._onViewChange.bind(this));

      this._moviesModel.renderedFilms.push(filmCard);
      filmCard.render(film);
    };
  }

  renderFilmsMain() {
    if (this._moviesModel.movies.length) {
      this._moviesModel.renderedFilms.forEach((film) => film.removeFilm());
      this._showMoreBtnController.remove();

      this._moviesModel.renderedFilms = [];
      this.showingFilmsCount = 5;

      this._moviesModel.movies.slice(0, 5).forEach(this.renderFilm());

      this._showMoreBtnController.render();

    } else {
      render(this.mainFilmsContainerEl, htmlStringToElement(`<h2 class="films-list__title">There are no movies in our database</h2>`));
    }
  }

  renderFilmsAdditional() {
    const siteMainFilmsSectionEl = this.filmsBoard.getElement();
    const extraFilmsSections = [
      {title: `Top rated`, type: `topRated`},
      {title: `Most commented`, type: `mostCommented`}
    ];
    const extraFilmsSectionEl = document.createDocumentFragment();

    if (this._moviesModel.movies.length) {
      extraFilmsSections.forEach((section) => {
        const extraFilmSection = new ExtraFilmsContainer(section.title);
        const singleSection = extraFilmSection.getElement();
        const singleSectionContainerEl = singleSection.querySelector(`.films-list__container`);
        let topTwoFilms;

        switch (section.type) {
          case `topRated`:
            topTwoFilms = this._moviesModel.movies.sort(compareFilmsByRating).slice(0, 2);
            break;
          case `mostCommented`:
            topTwoFilms = this._moviesModel.movies.sort(compareFilmsByCommentsCount).slice(0, 2);
            break;
        }

        topTwoFilms.forEach(this.renderFilm(singleSectionContainerEl));

        render(extraFilmsSectionEl, singleSection);
      });

      render(siteMainFilmsSectionEl, extraFilmsSectionEl);
    }
  }

  render() {
    this._siteHeaderEl = this._container.querySelector(`.header`);
    this._siteMainEl = this._container.querySelector(`.main`);
    this._siteFooterEl = this._container.querySelector(`.footer`);

    const headerProfile = new HeaderProfile();
    const footerStatistics = new FooterStatistics();
    this.filmsBoard = new FilmsBoard();

    render(this._siteHeaderEl, headerProfile.getElement());
    render(this._siteFooterEl, footerStatistics.getElement());
    render(this._siteMainEl, this.filmsBoard.getElement());

    this.mainFilmsContainerEl = this.filmsBoard.getElement().querySelector(`.films .films-list__container`);
    this.mainFilmsBoard = this.filmsBoard.getElement().querySelector(`.films .films-list`);

    this._showMoreBtnController = new ShowMoreBtnController(this.mainFilmsBoard, this._moviesModel, this._onShowMoreBtnClick.bind(this));

    this.renderFilmsMain();
    this.renderFilmsAdditional();
  }
}
