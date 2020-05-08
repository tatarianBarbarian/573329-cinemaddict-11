import {AbstractComponent} from './abstract-component';
import {FilmDetails} from './film-details';
import {render} from '../utils/render';

export class Film extends AbstractComponent {
  constructor(filmData = {}) {
    super();
    ({
      title: this._title,
      rating: this._rating,
      releaseDate: this._releaseDate,
      runtime: this._runtime,
      genre: this._genre,
      poster: this._poster,
      description: this._description,
      comments: this._comments,
      isFavorite: this._isFavorite,
      isWathced: this._isWatched,
      isWatchlisted: this._isWatchlisted
    } = filmData);
    this._element = this.getElement();
    this._filmData = filmData;

    const showDetailsPopup = () => {
      const siteMainEl = this._element.closest(`.main`);
      const detailsPopup = new FilmDetails(this._filmData);
      render(siteMainEl, detailsPopup.getElement());
    };

    this.setCommentsClickHandler(showDetailsPopup);
    this.setFilmTitleClickHandler(showDetailsPopup);
    this.setPosterClickHandler(showDetailsPopup);
  }

  _truncateDescription(description) {
    return description.length > 140
      ? description.substr(0, 139) + `…`
      : description;
  }

  getTemplate() {
    const btnActiveClass = `film-card__controls-item--active`;

    return (
      `<article class="film-card">
        <h3 class="film-card__title">${this._title}</h3>
        <p class="film-card__rating">${this._rating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${this._releaseDate.getFullYear()}</span>
          <span class="film-card__duration">${this._runtime}</span>
          <span class="film-card__genre">${this._genre.short}</span>
        </p>
        <img src="./images/posters/${this._poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${this._truncateDescription(this._description)}</p>
        <a class="film-card__comments">${this._comments.length} comments</a>
        <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${this._isWatchlisted ? btnActiveClass : ``}">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${this._isWatched ? btnActiveClass : ``}">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite ${this._isFavorite ? btnActiveClass : ``}">Mark as favorite</button>
        </form>
      </article>`
    );
  }

  setCommentsClickHandler(cb) {
    this._element.querySelector(`.film-card__comments`).addEventListener(`click`, cb);
  }

  setPosterClickHandler(cb) {
    this._element.querySelector(`.film-card__poster`).addEventListener(`click`, cb);
  }

  setFilmTitleClickHandler(cb) {
    this._element.querySelector(`.film-card__title`).addEventListener(`click`, cb);
  }

  setAddToWatchlistBtnClickHandler(cb) {
    this._element.querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, cb);
  }

  setMarkAsWatchedBtnClickHandler(cb) {
    this._element.querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, cb);
  }

  setFavoriteBtnClickHandler(cb) {
    this._element.querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, cb);
  }
}
