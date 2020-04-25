import {BaseComponent} from './base-component.js';

export class ShowMoreBtn extends BaseComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return (
      `<button class="films-list__show-more">Show more</button>`
    );
  }
}
