import {AbstractSmartComponent} from './abstract-smart-component';
import {formatRuntime, formatReleaseDateShort} from '../utils/format';
import {htmlStringToElement} from '../utils/render';

export class Movie extends AbstractSmartComponent {
  constructor(movieData = {}) {
    super();

    this.movieData = movieData;
    this._element = this.getElement();
  }

  _truncateDescription(description) {
    return description.length > 140
      ? description.substr(0, 139) + `…`
      : description;
  }

  getTemplate() {
    const {title, rating, releaseDate, runtime, genre, poster, description, comments, isFavorite, isWatched, isWatchlisted} = this.movieData;
    const btnActiveClass = `film-card__controls-item--active`;

    return (
      `<article class="film-card">
        <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${rating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${formatReleaseDateShort(releaseDate)}</span>
          <span class="film-card__duration">${formatRuntime(runtime)}</span>
          <span class="film-card__genre">${genre.short}</span>
        </p>
        <img src="./${poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${this._truncateDescription(description)}</p>
        <a class="film-card__comments">${comments.length} comments</a>
        <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isWatchlisted ? btnActiveClass : ``}" type="button">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isWatched ? btnActiveClass : ``}" type="button">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavorite ? btnActiveClass : ``}" type="button">Mark as favorite</button>
        </form>
      </article>`
    );
  }

  _getCardControlsTemplate() {
    const {isFavorite, isWatched, isWatchlisted} = this.movieData;
    const btnActiveClass = `film-card__controls-item--active`;

    return (
      `<form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isWatchlisted ? btnActiveClass : ``}" type="button">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isWatched ? btnActiveClass : ``}" type="button">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavorite ? btnActiveClass : ``}" type="button">Mark as favorite</button>
    </form>`
    );
  }

  setCommentsClickHandler(cb) {
    // this.setListener(`.film-card__comments`, `click`, cb);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, cb);
  }

  setPosterClickHandler(cb) {
    // this.setListener(`.film-card__poster`, `click`, cb);
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, cb);
  }

  setFilmTitleClickHandler(cb) {
    // this.setListener(`.film-card__title`, `click`, cb);
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, cb);
  }

  setAddToWatchlistBtnClickHandler(cb) {
    this.setListener(`.film-card__controls-item--add-to-watchlist`, `click`, cb);
  }

  setMarkAsWatchedBtnClickHandler(cb) {
    this.setListener(`.film-card__controls-item--mark-as-watched`, `click`, cb);
  }

  setFavoriteBtnClickHandler(cb) {
    this.setListener(`.film-card__controls-item--favorite`, `click`, cb);
  }

  rerender() {
    const newElement = htmlStringToElement(this._getCardControlsTemplate());
    const elToRerender = this.getElement().querySelector(`.film-card__controls`);

    elToRerender.parentNode.replaceChild(newElement, elToRerender);

    this.recoveryListeners();
  }

  recoveryListeners() {
    this.listeners.forEach(({selector, event, cb}) => {
      this._element.querySelectorAll(selector).forEach((el) => el.addEventListener(event, cb));
    });
  }
}
