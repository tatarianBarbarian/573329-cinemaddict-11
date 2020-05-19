import moment from "moment";
import {AbstractSmartComponent} from './abstract-smart-component';

export class FilmDetails extends AbstractSmartComponent {
  constructor(filmData = {}) {
    super();
    this.filmData = filmData;
    this._element = this.getElement();
    this.chosenEmoji = ``;
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
      comments,
      isFavorite,
      isWatched,
      isWatchlisted,
      ageLimit,
      countries
    } = this.filmData;

    return (
      `<section class="film-details">
        <form class="film-details__inner" action="" method="get">
          <div class="form-details__top-container">
            <div class="film-details__close">
              <button class="film-details__close-btn" type="button">close</button>
            </div>
            <div class="film-details__info-wrap">
              <div class="film-details__poster">
                <img class="film-details__poster-img" src="./images/posters/${poster}" alt="${title}">
      
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
                    <td class="film-details__cell">${moment(releaseDate).format(`D MMMM YYYY`)}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Runtime</td>
                    <td class="film-details__cell">${runtime}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Country</td>
                    <td class="film-details__cell">${countries.join(`, `)}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Genres</td>
                    <td class="film-details__cell">
                      ${genre.full.map((filmGenre) => `<span class="film-details__genre">${filmGenre}</span>`).join(`\n`)}
                  </tr>
                </table>
      
                <p class="film-details__film-description">${description}</p>
              </div>
            </div>
      
            <section class="film-details__controls">
              <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isWatchlisted ? `checked` : ``}>
              <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
      
              <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isWatched ? `checked` : ``}>
              <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
      
              <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorite ? `checked` : ``}>
              <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
            </section>
          </div>
      
          <div class="form-details__bottom-container">
            <section class="film-details__comments-wrap">
              <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">4</span></h3>
      
              <ul class="film-details__comments-list">
                ${this._getCommentsTemplate(comments)}
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

  _getChosenEmoji(emoji) {
    const allowedEmojis = [`smile`, `sleeping`, `puke`, `angry`];
    const emojiTemplate = `<img src="images/emoji/${emoji}.png" width="55" height="55" alt="emoji-smile">`;

    return allowedEmojis.includes(emoji) ? emojiTemplate : ``;
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
    this.setListener(`.film-details__control-label--watchlist`, `click`, cb);
  }

  setMarkAsWatchedBtnClickHandler(cb) {
    this.setListener(`.film-details__control-label--watched`, `click`, cb);
  }

  setFavoriteBtnClickHandler(cb) {
    this.setListener(`.film-details__control-label--favorite`, `click`, cb);
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
