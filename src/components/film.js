import {AbstractSmartComponent} from './abstract-smart-component';

export class Film extends AbstractSmartComponent {
  constructor(filmData = {}) {
    super();

    this.filmData = filmData;
    this._element = this.getElement();
  }

  _truncateDescription(description) {
    return description.length > 140
      ? description.substr(0, 139) + `…`
      : description;
  }

  getTemplate() {
    const {title, rating, releaseDate, runtime, genre, poster, description, comments, isFavorite, isWatched, isWatchlisted} = this.filmData;
    const btnActiveClass = `film-card__controls-item--active`;

    return (
      `<article class="film-card">
        <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${rating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${releaseDate.getFullYear()}</span>
          <span class="film-card__duration">${runtime}</span>
          <span class="film-card__genre">${genre.short}</span>
        </p>
        <img src="./images/posters/${poster}" alt="" class="film-card__poster">
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

  setCommentsClickHandler(cb) {
    this.setListener(`.film-card__comments`, `click`, cb);
  }

  setPosterClickHandler(cb) {
    this.setListener(`.film-card__poster`, `click`, cb);
  }

  setFilmTitleClickHandler(cb) {
    this.setListener(`.film-card__title`, `click`, cb);
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

  recoveryListeners() {
    this.listeners.forEach(({selector, event, cb}) => {
      this._element.querySelectorAll(selector).forEach((el) => el.addEventListener(event, cb));
    });
  }
}
