import moment from "moment";
import {AbstractSmartComponent} from './abstract-smart-component';

export class FilmDetails extends AbstractSmartComponent {
  constructor(filmData = {}) {
    super();
    ({
      title: this._title,
      originalTitle: this._originalTitle,
      rating: this._rating,
      director: this._director,
      writers: this._writers,
      actors: this._actors,
      releaseDate: this._releaseDate,
      runtime: this._runtime,
      genre: this._genre,
      poster: this._poster,
      description: this._description,
      comments: this._comments,
      isFavorite: this._isFavorite,
      isWatched: this._isWatched,
      isWatchlisted: this._isWatchlisted,
      ageLimit: this._ageLimit,
      countries: this._countries
    } = filmData);

    this._element = this.getElement();

    const hidePopupHandler = (event) => {
      if (event.key === `Escape` || event.type === `click`) {
        const filmDetailsPopup = this._element;

        if (filmDetailsPopup) {
          this.removeCloseBtnClickHandler(hidePopupHandler);
          document.removeEventListener(`keyup`, hidePopupHandler);
          this.removeElement();
        }
      }
    };

    this.setCloseBtnClickHandler(hidePopupHandler);
    document.addEventListener(`keyup`, hidePopupHandler);
  }

  getTemplate() {
    return (
      `<section class="film-details">
        <form class="film-details__inner" action="" method="get">
          <div class="form-details__top-container">
            <div class="film-details__close">
              <button class="film-details__close-btn" type="button">close</button>
            </div>
            <div class="film-details__info-wrap">
              <div class="film-details__poster">
                <img class="film-details__poster-img" src="./images/posters/${this._poster}" alt="${this._title}">
      
                <p class="film-details__age">${this._ageLimit}+</p>
              </div>
      
              <div class="film-details__info">
                <div class="film-details__info-head">
                  <div class="film-details__title-wrap">
                    <h3 class="film-details__title">${this._title}</h3>
                    <p class="film-details__title-original">Original: ${this._originalTitle}</p>
                  </div>
      
                  <div class="film-details__rating">
                    <p class="film-details__total-rating">${this._rating}</p>
                  </div>
                </div>
      
                <table class="film-details__table">
                  <tr class="film-details__row">
                    <td class="film-details__term">Director</td>
                    <td class="film-details__cell">${this._director}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Writers</td>
                    <td class="film-details__cell">${this._writers.join(`, `)}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Actors</td>
                    <td class="film-details__cell">${this._actors.join(`, `)}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Release Date</td>
                    <td class="film-details__cell">${moment(this._releaseDate).format(`D MMMM YYYY`)}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Runtime</td>
                    <td class="film-details__cell">${this._runtime}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Country</td>
                    <td class="film-details__cell">${this._countries.join(`, `)}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Genres</td>
                    <td class="film-details__cell">
                      ${this._genre.full.map((filmGenre) => `<span class="film-details__genre">${filmGenre}</span>`).join(`\n`)}
                  </tr>
                </table>
      
                <p class="film-details__film-description">${this._description}</p>
              </div>
            </div>
      
            <section class="film-details__controls">
              <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${this._isWatchlisted ? `checked` : ``}>
              <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
      
              <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${this._isWathced ? `checked` : ``}>
              <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
      
              <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${this._isFavorite ? `checked` : ``}>
              <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
            </section>
          </div>
      
          <div class="form-details__bottom-container">
            <section class="film-details__comments-wrap">
              <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">4</span></h3>
      
              <ul class="film-details__comments-list">
                ${this._getCommentsTemplate(this._comments)}
              </ul>
      
              <div class="film-details__new-comment">
                <div for="add-emoji" class="film-details__add-emoji-label"></div>
      
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
      const {emoji, text, author, date} = comment;

      return (
        `<li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">
        </span>
        <div>
          <p class="film-details__comment-text">${text}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${author}</span>
            <span class="film-details__comment-day">${moment(date).fromNow()}</span>
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>`
      );
    };

    return comments.map(createCommentMarkup).join(`\n`);
  }

  setCloseBtnClickHandler(cb) {
    const closeBtn = this._element.querySelector(`.film-details__close-btn`);

    closeBtn.addEventListener(`click`, cb);
  }

  removeCloseBtnClickHandler(cb) {
    const closeBtn = this._element.querySelector(`.film-details__close-btn`);

    closeBtn.removeEventListener(`click`, cb);
  }

  setAddToWatchlistBtnClickHandler(cb) {
    this._element.querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, cb);
  }

  setMarkAsWatchedBtnClickHandler(cb) {
    this._element.querySelector(`.film-details__control-label--watched`).addEventListener(`click`, cb);
  }

  setFavoriteBtnClickHandler(cb) {
    this._element.querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, cb);
  }
}
