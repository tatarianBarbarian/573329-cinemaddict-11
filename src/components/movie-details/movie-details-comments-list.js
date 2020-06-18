import {humanizeCommentDate} from '../../utils/format';
import {AbstractSmartComponent} from '../abstract-smart-component';
import {htmlStringToElement, render, remove} from '../../utils/render';

export class MovieDetailsCommentsList extends AbstractSmartComponent {
  constructor() {
    super();
    this._comments = [];
  }

  set comments(value) {
    this._comments = value;
    this.rerender();
  }

  get comments() {
    return this._comments;
  }

  getTemplate() {
    // return this.comments.map(this._getSingleCommentTemplate).join(`\n`);
    return (`
      <ul class="film-details__comments-list">
        ${this.getCommentsMarkup()}
      </ul>
    `);
  }

  getCommentsMarkup() {
    if (this._comments.length) {
      return this._comments.map(this._getSingleCommentTemplate).join(`\n`);
    } else {
      return (`<p>There are no comments yet.</p>`);
    }
  }

  _getSingleCommentTemplate({emotion, comment: text, author, date, id}) {
    return (`
      <li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${humanizeCommentDate(date)}</span>
          <button class="film-details__comment-delete" type="button" data-comment-id="${id}">Delete</button>
        </p>
      </div>
    </li>
    `);
  }

  // rerender() {

  // }

  setDeleteCommentBtnClickHandler(cb) {
    this.setListener(`.film-details__comment-delete`, `click`, cb);
  }

  recoveryListeners() {
    this.listeners.forEach(({selector, event, cb}) => {
      this._element.querySelectorAll(selector).forEach((el) => el.addEventListener(event, cb));
    });
  }
}
