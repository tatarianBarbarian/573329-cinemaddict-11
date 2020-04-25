import {BaseComponent} from './base-component.js';

export class FilmsBoard extends BaseComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return (
      `
      <div>
        <ul class="sort">
          <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
          <li><a href="#" class="sort__button">Sort by date</a></li>
          <li><a href="#" class="sort__button">Sort by rating</a></li>
        </ul>
        <section class="films">
          <section class="films-list">
            <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
            <div class="films-list__container"></div>
          </section>
        </section>
      </div>
      `
    );
  }
}
