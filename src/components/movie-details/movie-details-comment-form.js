import {htmlStringToElement} from '../../utils/render';
import {AbstractSmartComponent} from '../abstract-smart-component';

export class MovieDetailsCommentForm extends AbstractSmartComponent {
  constructor() {
    super();

    this._chosenEmoji = null;
    this._commentText = ``;
  }

  getTemplate() {
    return (`
      <div class="film-details__new-comment">
        <div for="add-emoji" class="film-details__add-emoji-label">
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
    `);
  }

  get commentText() {
    return this.getElement().querySelector(`.film-details__comment-input`).value;
  }

  set commentText(newText) {
    this._commentText = newText;
    this.getElement().querySelector(`.film-details__comment-input`).value = newText;
  }

  get chosenEmoji() {
    return this._chosenEmoji;
  }

  set chosenEmoji(newEmoji) {
    if (newEmoji !== this._chosenEmoji) {
      this._chosenEmoji = newEmoji;

      const emojiContainer = this.getElement().querySelector(`.film-details__add-emoji-label`);
      const emojiToRender = htmlStringToElement(this._getChosenEmoji(newEmoji));

      if (!emojiContainer.childElementCount && emojiToRender) {
        emojiContainer.appendChild(emojiToRender);
      } else if (newEmoji === null && emojiContainer.childElementCount) {
        emojiContainer.removeChild(emojiContainer.firstElementChild);
      } else if (emojiContainer.childElementCount) {
        emojiContainer.replaceChild(emojiToRender, emojiContainer.firstElementChild);
      }
    }
  }

  resetForm() {
    this.chosenEmoji = null;
    this.getElement()
      .querySelectorAll(`.film-details__emoji-item`)
      .forEach((emoji) => {
        emoji.checked = false;
      });
    this.commentText = ``;
  }

  _getChosenEmoji(emoji) {
    const allowedEmojis = [`smile`, `sleeping`, `puke`, `angry`];
    const emojiTemplate = `<img src="images/emoji/${emoji}.png" width="55" height="55" alt="emoji-smile">`;

    return allowedEmojis.includes(emoji) ? emojiTemplate : ``;
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
