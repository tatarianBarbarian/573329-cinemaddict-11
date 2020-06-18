import {AbstractSmartComponent} from '../abstract-smart-component';
import {MovieDetailsCommentsList} from './movie-details-comments-list';
import {MovieDetailsCommentForm} from './movie-details-comment-form';
import {render} from '../../utils/render';

export class MovieDetailsComments extends AbstractSmartComponent {
  constructor() {
    super();
    this._commentsList = new MovieDetailsCommentsList();
    this._commentForm = new MovieDetailsCommentForm();
  }

  set comments(comments) {
    this._commentsList.comments = comments;
    this.getElement().querySelector(`.film-details__comments-count`).textContent = comments.length ? comments.length : ``;
  }

  set chosenEmoji(value) {
    this._commentForm.chosenEmoji = value;
  }

  get chosenEmoji() {
    return this._commentForm.chosenEmoji;
  }

  get commentText() {
    return this._commentForm.commentText;
  }

  getTemplate() {
    return (`
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count"></span></h3>
      </section>
    `);
  }

  _afterElementCreate() {
    const container = this._element;

    this._commentForm.resetForm();
    render(container, this._commentsList.getElement());
    render(container, this._commentForm.getElement());
  }

  _beforeRemove() {
    this._commentsList.removeElement();
    this._commentForm.removeElement();
  }

  setCtrlEnterKeysHandler(cb) {
    this._commentForm.setCrlEnterKeysHandler(cb);
  }

  setCommentEmojiClickHandler(cb) {
    this._commentForm.setCommentEmojiClickHandler(cb);
  }

  setDeleteCommentBtnClickHandler(cb) {
    this._commentsList.setDeleteCommentBtnClickHandler(cb);
  }
}
