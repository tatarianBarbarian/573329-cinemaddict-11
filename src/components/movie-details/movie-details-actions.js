import {AbstractSmartComponent} from '../abstract-smart-component';

export class MovieDetailsActions extends AbstractSmartComponent {
  constructor(flags) {
    super();
    this.flags = flags;
  }

  getTemplate() {
    const {isWatchlisted, isWatched, isFavorite} = this.flags;

    return (`
      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isWatchlisted ? `checked` : ``}>
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isWatched ? `checked` : ``}>
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorite ? `checked` : ``}>
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    `);
  }

  setAddToWatchlistBtnClickHandler(cb) {
    this.setListener(`.film-details__control-label--watchlist`, `click`, cb);
  }

  setMarkAsWatchedBtnClickHandler(cb) {
    this.setListener(`.film-details__control-label--watched`, `click`, cb);
  }

  setFavoriteBtnClickHandler(cb) {
    this.setListener(`.film-details__control-label--favorite`, `click`, cb);
  }

  recoveryListeners() {
    this.listeners.forEach(({selector, event, cb}) => {
      this._element.querySelectorAll(selector).forEach((el) => el.addEventListener(event, cb));
    });
  }
}
