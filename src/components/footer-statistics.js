import {BaseComponent} from './base-component.js';

export class FooterStatistics extends BaseComponent {
  constructor(filmsCount = 0) {
    super();
    this._filmsCount = filmsCount;
  }

  getTemplate() {
    return (
      `<p>${this._filmsCount} movies inside</p>`
    );
  }
}
