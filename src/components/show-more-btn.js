import {htmlStringToElement} from '../utils.js';

export class ShowMoreBtn {
  getTemplate() {
    return (
      `<button class="films-list__show-more">Show more</button>`
    );
  }

  getElement() {
    if (!this._element) {
      this._element = htmlStringToElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

const createShowMoreBtnMarkup = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

export {createShowMoreBtnMarkup};
