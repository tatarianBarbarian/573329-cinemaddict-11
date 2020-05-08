import {AbstractComponent} from './abstract-component';
import {htmlStringToElement} from '../utils/render';

export class AbstractSmartComponent extends AbstractComponent {
  constructor() {
    super();
  }

  recoveryListeners() {
    throw new Error(`Abstract method not implemented: ${this.recoveryListeners.name}`);
  }

  rerender() {
    this
      ._element
      .parentNode
      .replaceChild(htmlStringToElement(this.getTemplate), this._element);

    this.recoveryListeners();
  }
}
