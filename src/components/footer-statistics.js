import {AbstractComponent} from './abstract-component';

export class FooterStatistics extends AbstractComponent {
  constructor(moviesCount = 0) {
    super();
    this._moviesCount = moviesCount;
  }

  getTemplate() {
    return (
      `<p>${this._moviesCount} movies inside</p>`
    );
  }
}
