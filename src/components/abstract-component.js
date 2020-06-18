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

      if (this._afterElementCreate) {
        this._afterElementCreate();
      }
    }

    return this._element;
  }

  removeElement() {
    if (this._element) {
      if (this._beforeRemove) {
        this._beforeRemove();
      }
      remove(this._element);
      this._element = null;
    }
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: ${this.getTemplate.name}`);
  }
}
