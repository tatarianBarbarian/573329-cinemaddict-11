import {htmlStringToElement, remove} from '../utils/render';

export class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate Abstract class, only concrete one.`);
    }
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = htmlStringToElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    remove(this._element);
    this._element = null;
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: ${this.getTemplate.name}`);
  }
}
