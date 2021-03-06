import {HeaderProfile} from '../components/header-profile';
import {FooterStatistics} from '../components/footer-statistics';
import {MoviesBoard} from '../components/movies-board';
import {MovieController} from './movie-controller';
import {ShowMoreBtnController} from './show-more-btn-controller';
import {ExtraFilmsContainer} from '../components/extra-movies-list';
import {BeatoffMain} from '../components/beatoff-main';
import {render} from '../utils/render';
import {compareFilmsByRating, compareFilmsByCommentsCount} from '../utils/compare';

export class PageController {
  constructor(container, moviesModel, commentsModel) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._commentsModel = commentsModel;
    this.beatoffMain = null;

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
    this._moviesModel.renderedMovies.forEach((film) => film.setDefaultView());
  }

  _onFilterChange() {
    this.renderFilmsMain();
  }

  _onSortChange() {
    this.renderFilmsMain();
  }

  _onShowMoreBtnClick(filmsToRender) {
    filmsToRender.forEach(this.renderFilm({container: this.mainFilmsContainerEl}));
  }

  _onCommentsChange() {

  }

  renderFilm({container, filmType}) {
    return (film) => {
      const filmCard = new MovieController(container, this._commentsModel, this._onDataChange.bind(this), this._onViewChange.bind(this), this._onCommentsChange.bind(this));

      switch (filmType) {
        case `topRated`:
          this._moviesModel.topRatedMovies.push(filmCard);
          break;
        case `mostCommented`:
          this._moviesModel.mostCommentedMovies.push(filmCard);
          break;
        default:
          this._moviesModel.renderedMovies.push(filmCard);
      }

      filmCard.render(film);
    };
  }

  renderFilmsMain() {
    const MAIN_BLOCK_FILM_COUNT = 5;

    this._moviesModel.renderedMovies.forEach((film) => film.removeFilm());
    this._showMoreBtnController.remove();
    this._moviesModel.renderedMovies = [];
    this.mainFilmsContainerEl.innerHTML = ``;

    if (this._moviesModel.movies.length) {
      this._moviesModel.movies
        .slice(0, MAIN_BLOCK_FILM_COUNT)
        .forEach(this.renderFilm({container: this.mainFilmsContainerEl}));

      this._showMoreBtnController.render();

    } else {
      this.beatoffMain = new BeatoffMain();
      render(this.mainFilmsContainerEl, this.beatoffMain.getElement());
    }
  }

  renderFilmsAdditional() {
    const EXTRA_BLOCK_FILM_COUNT = 2;
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
            topTwoFilms = this._moviesModel.movies.sort(compareFilmsByRating).slice(0, EXTRA_BLOCK_FILM_COUNT);
            break;
          case `mostCommented`:
            topTwoFilms = this._moviesModel.movies.sort(compareFilmsByCommentsCount).slice(0, EXTRA_BLOCK_FILM_COUNT);
            break;
        }

        topTwoFilms.forEach(this.renderFilm({container: singleSectionContainerEl, filmType: section.type}));

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
    this.filmsBoard = new MoviesBoard();

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
