import {AbstractComponent} from './abstract-component';

export class Sorting extends AbstractComponent {
  constructor() {
    super();
    this.sortOrder = `default`;
    this.subscriptions = [];
  }
  _getTemplate() {
    return (
      `
        <ul class="sort">
          <li><a href="#" data-order-type="default" class="sort__button sort__button--active">Sort by default</a></li>
          <li><a href="#" data-order-type="date" class="sort__button">Sort by date</a></li>
          <li><a href="#" data-order-type="rating" class="sort__button">Sort by rating</a></li>
        </ul>
      `
    );
  }
  subscribe(cb) {
    this.subscriptions.push(cb);
  }
  broadcast(newSortOrder) {
    this.subscriptions.forEach((subscription) => subscription(newSortOrder));
  }
}
