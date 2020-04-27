import {htmlStringToElement} from '../utils.js';

export class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate Abstract class, only concrete one.`);
    }
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = htmlStringToElement(this._getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  _getTemplate() {
    throw new Error(`Abstract method not implemented: ${this._getTemplate.name}`);
  }
}
