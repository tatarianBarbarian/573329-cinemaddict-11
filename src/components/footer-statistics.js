import {htmlStringToElement} from '../utils.js';

export class FooterStatistics {
  constructor(filmsCount = 0) {
    this._filmsCount = filmsCount;
  }

  getTemplate() {
    return (
      `<p>${this._filmsCount} movies inside</p>`
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

const createFooterStatisticsMarkup = (filmsCount) => {
  return (
    `<p>${filmsCount} movies inside</p>`
  );
};

export {createFooterStatisticsMarkup};
