import {AbstractComponent} from './abstract-component';
import {htmlStringToElement} from '../utils/render';

export class AbstractSmartComponent extends AbstractComponent {
  constructor() {
    super();
    this.listeners = [];
  }

  setListener(selector, event, cb) {
    this.listeners.push({selector, event, cb});
    this._element.querySelectorAll(selector).forEach((el) => el.addEventListener(event, cb));
  }

  recoveryListeners() {
    throw new Error(`Abstract method not implemented: ${this.recoveryListeners.name}`);
  }

  rerender() {
    const newElement = htmlStringToElement(this.getTemplate());

    if (this._element) {

      if (this._element.parentNode) {
        this
          ._element
          .parentNode
          .replaceChild(newElement, this._element);
      }

    }

    this._element = newElement;

    this.recoveryListeners();
  }
}
