import {render} from '../../utils/render';
import {formatRuntime, formatReleaseDateFull} from '../../utils/format';
import {AbstractSmartComponent} from '../abstract-smart-component';
import {ApiAdapter} from '../../models/api';
import {MovieDetailsActions} from './movie-details-actions';
import {MovieDetailsComments} from './movie-details-comments';

export class MovieDetails extends AbstractSmartComponent {
  constructor(movieData = {}, commentsModel) {
    super();
    this._movieData = movieData;
    this._commentsModel = commentsModel;
    this.api = new ApiAdapter();
    this._actions = new MovieDetailsActions({
      isWatched: this.movieData.isWatched,
      isWatchlisted: this.movieData.isWatchlisted,
      isFavorite: this.movieData.isFavorite
    });
    this._commentsBlock = new MovieDetailsComments();
  }

  set movieData(value) {
    this._movieData = value;
  }

  get movieData() {
    return this._movieData;
  }

  set chosenEmoji(value) {
    this._commentsBlock.chosenEmoji = value;
  }

  get chosenEmoji() {
    return this._commentsBlock.chosenEmoji;
  }

  get commentText() {
    return this._commentsBlock.commentText;
  }

  set comments(value) {
    this._commentsBlock.comments = value;
  }

  rerender() {
    this._actions.flags = {
      isWatched: this.movieData.isWatched,
      isWatchlisted: this.movieData.isWatchlisted,
      isFavorite: this.movieData.isFavorite
    };
    this._actions.rerender();
    // this._commentForm.rerender();
  }

  _afterElementCreate() {
    const controlsContainer = this._element.querySelector(`.form-details__top-container`);
    render(controlsContainer, this._actions.getElement());

    const commentsContainer = this._element.querySelector(`.form-details__bottom-container`);
    render(commentsContainer, this._commentsBlock.getElement());
  }

  _beforeRemove() {
    this._commentsBlock.removeElement();
  }

  getTemplate() {
    const {
      title,
      originalTitle,
      rating,
      director,
      writers,
      actors,
      releaseDate,
      runtime,
      genre,
      poster,
      description,
      ageLimit,
      countries
    } = this.movieData;

    return (
      `<section class="film-details">
        <form class="film-details__inner" action="" method="get">
          <div class="form-details__top-container">
            <div class="film-details__close">
              <button class="film-details__close-btn" type="button">close</button>
            </div>
            <div class="film-details__info-wrap">
              <div class="film-details__poster">
                <img class="film-details__poster-img" src="./${poster}" alt="${title}">
      
                <p class="film-details__age">${ageLimit}+</p>
              </div>
      
              <div class="film-details__info">
                <div class="film-details__info-head">
                  <div class="film-details__title-wrap">
                    <h3 class="film-details__title">${title}</h3>
                    <p class="film-details__title-original">Original: ${originalTitle}</p>
                  </div>
      
                  <div class="film-details__rating">
                    <p class="film-details__total-rating">${rating}</p>
                  </div>
                </div>
      
                <table class="film-details__table">
                  <tr class="film-details__row">
                    <td class="film-details__term">Director</td>
                    <td class="film-details__cell">${director}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Writers</td>
                    <td class="film-details__cell">${writers.join(`, `)}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Actors</td>
                    <td class="film-details__cell">${actors.join(`, `)}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Release Date</td>
                    <td class="film-details__cell">${formatReleaseDateFull(releaseDate)}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Runtime</td>
                    <td class="film-details__cell">${formatRuntime(runtime)}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Country</td>
                    <td class="film-details__cell">${countries}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Genres</td>
                    <td class="film-details__cell">
                      ${genre.full.map((movieGenre) => `<span class="film-details__genre">${movieGenre}</span>`).join(`\n`)}
                  </tr>
                </table>
      
                <p class="film-details__film-description">${description}</p>
              </div>
            </div>
          </div>
          <div class="form-details__bottom-container"></div>
        </form>
      </section>`
    );
  }

  setCloseBtnClickHandler(cb) {
    this.setListener(`.film-details__close-btn`, `click`, cb);
  }

  removeCloseBtnClickHandler(cb) {
    if (this._element) {
      const closeBtn = this._element.querySelector(`.film-details__close-btn`);

      closeBtn.removeEventListener(`click`, cb);
    }
  }

  setAddToWatchlistBtnClickHandler(cb) {
    this._actions.setAddToWatchlistBtnClickHandler(cb);
  }

  setMarkAsWatchedBtnClickHandler(cb) {
    this._actions.setMarkAsWatchedBtnClickHandler(cb);
  }

  setFavoriteBtnClickHandler(cb) {
    this._actions.setFavoriteBtnClickHandler(cb);
  }

  setCommentEmojiClickHandler(cb) {
    this._commentsBlock.setCommentEmojiClickHandler(cb);
  }

  setCrlEnterKeysHandler(cb) {
    this._commentsBlock.setCtrlEnterKeysHandler(cb);
  }

  setDeleteCommentBtnClickHandler(cb) {
    this._commentsBlock.setDeleteCommentBtnClickHandler(cb);
  }

  recoveryListeners() {
    this.listeners.forEach(({selector, event, cb}) => {
      this._element.querySelectorAll(selector).forEach((el) => el.addEventListener(event, cb));
    });
  }
}
