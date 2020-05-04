import {AbstractComponent} from './abstract-component';

export class ShowMoreBtn extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return (
      `<button class="films-list__show-more">Show more</button>`
    );
  }

  setClickHandler(cb) {
    this._element.addEventListener(`click`, cb);
  }
}
