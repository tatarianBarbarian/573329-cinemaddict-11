import {AbstractSmartComponent} from './abstract-smart-component';
import {formatRuntime, formatReleaseDateFull, humanizeCommentDate} from '../utils/format';
import {render} from '../utils/render';
import {ApiAdapter} from '../models/api';

class MovieDetailsControls extends AbstractSmartComponent {
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

export class MovieDetails extends AbstractSmartComponent {
  constructor(movieData = {}) {
    super();
    this.movieData = movieData;
    this._element = this.getElement();
    this.chosenEmoji = ``;
    this.api = new ApiAdapter();
    this._controls = new MovieDetailsControls({
      isWatched: this.movieData.isWatched,
      isWatchlisted: this.movieData.isWatchlisted,
      isFavorite: this.movieData.isFavorite
    });
  }

  renderComponent(container) {
    const controlsContainer = this.getElement().querySelector(`.form-details__top-container`);

    render(container, this.getElement());
    render(controlsContainer, this._controls.getElement());
  }

  rerender() {
    this._controls.flags = {
      isWatched: this.movieData.isWatched,
      isWatchlisted: this.movieData.isWatchlisted,
      isFavorite: this.movieData.isFavorite
    };
    this._controls.rerender();
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
      
          <div class="form-details__bottom-container">
            <section class="film-details__comments-wrap">
              <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">4</span></h3>
      
              <ul class="film-details__comments-list">
                Loading comments...
                
              </ul>
      
              <div class="film-details__new-comment">
                <div for="add-emoji" class="film-details__add-emoji-label">
                  ${this._getChosenEmoji(this.chosenEmoji)}
                </div>
      
                <label class="film-details__comment-label">
                  <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
                </label>
      
                <div class="film-details__emoji-list">
                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                  <label class="film-details__emoji-label" for="emoji-smile">
                    <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                  </label>
      
                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                  <label class="film-details__emoji-label" for="emoji-sleeping">
                    <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                  </label>
      
                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                  <label class="film-details__emoji-label" for="emoji-puke">
                    <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                  </label>
      
                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                  <label class="film-details__emoji-label" for="emoji-angry">
                    <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                  </label>
                </div>
              </div>
            </section>
          </div>
        </form>
      </section>`
    );
  }

  _getCommentsTemplate(comments = []) {
    const createCommentMarkup = (comment) => {
      const {emotion, comment: text, author, date} = comment;

      return (
        `<li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
        </span>
        <div>
          <p class="film-details__comment-text">${text}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${author}</span>
            <span class="film-details__comment-day">${humanizeCommentDate(date)}</span>
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>`
      );
    };

    return comments.map(createCommentMarkup).join(`\n`);
  }

  _getChosenEmoji(emoji) {
    const allowedEmojis = [`smile`, `sleeping`, `puke`, `angry`];
    const emojiTemplate = `<img src="images/emoji/${emoji}.png" width="55" height="55" alt="emoji-smile">`;

    return allowedEmojis.includes(emoji) ? emojiTemplate : ``;
  }

  loadComments() {
    this.api.getComments(this.movieData.id)
      .then((resp) => { // TODO: Exceptions
        const commentsContainer = this.getElement().querySelector(`.film-details__comments-list`);
        commentsContainer.innerHTML = this._getCommentsTemplate(resp);
      });
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
    // this.setListener(`.film-details__control-label--watchlist`, `click`, cb);
    this._controls.setAddToWatchlistBtnClickHandler(cb);
  }

  setMarkAsWatchedBtnClickHandler(cb) {
    // this.setListener(`.film-details__control-label--watched`, `click`, cb);
    this._controls.setMarkAsWatchedBtnClickHandler(cb);
  }

  setFavoriteBtnClickHandler(cb) {
    // this.setListener(`.film-details__control-label--favorite`, `click`, cb);
    this._controls.setFavoriteBtnClickHandler(cb);
  }

  setCommentEmojiClickHandler(cb) {
    this.setListener(`.film-details__emoji-item`, `click`, cb);
  }

  recoveryListeners() {
    this.listeners.forEach(({selector, event, cb}) => {
      this._element.querySelectorAll(selector).forEach((el) => el.addEventListener(event, cb));
    });
  }
}
