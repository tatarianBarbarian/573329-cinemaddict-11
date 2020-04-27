import {AbstractComponent} from './abstract-component.js';

export class FooterStatistics extends AbstractComponent {
  constructor(filmsCount = 0) {
    super();
    this._filmsCount = filmsCount;
  }

  _getTemplate() {
    return (
      `<p>${this._filmsCount} movies inside</p>`
    );
  }
}
