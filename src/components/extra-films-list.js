import {htmlStringToElement} from '../utils.js';

export class ExtraFilmsContainer {
  constructor(title = ``) {
    this._title = title;
  }

  getTemplate() {
    return (
      `<section class="films-list--extra">
        <h2 class="films-list__title">${this._title}</h2>
        <div class="films-list__container"></div>
      </section>`
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

const createExtraFilmsListMarkup = (title) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${title}</h2>
      <div class="films-list__container"></div>
    </section>`
  );
};

export {createExtraFilmsListMarkup};
