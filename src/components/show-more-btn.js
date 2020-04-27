import {AbstractComponent} from './abstract-component.js';

export class ShowMoreBtn extends AbstractComponent {
  constructor() {
    super();
  }

  _getTemplate() {
    return (
      `<button class="films-list__show-more">Show more</button>`
    );
  }
}
