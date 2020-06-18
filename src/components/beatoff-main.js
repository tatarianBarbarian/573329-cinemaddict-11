import {AbstractComponent} from './abstract-component';

export class BeatoffMain extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return (
      `<h2 class="films-list__title">There are no movies in our database</h2>`
    );
  }
}
