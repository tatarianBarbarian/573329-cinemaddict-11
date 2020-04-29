import {AbstractComponent} from './abstract-component';

export class Sorting extends AbstractComponent {
  constructor() {
    super();
    this._sortOrder = `default`;
    this._subscriptions = [];

    this.setSorterClickHandler((event) => {
      event.preventDefault();
      const newSortOrder = event.currentTarget.dataset.orderBy;

      if (this._sortOrder !== newSortOrder) {
        this._element
          .querySelector(`.sort__button--active`)
          .classList
          .remove(`sort__button--active`);

        event.currentTarget.classList.add(`sort__button--active`);
        this._broadcast(newSortOrder);
        this._sortOrder = newSortOrder;
      }

    });
  }
  getTemplate() {
    return (
      `
        <ul class="sort">
          <li><a href="#" data-order-by="default" class="sort__button sort__button--active">Sort by default</a></li>
          <li><a href="#" data-order-by="date" class="sort__button">Sort by date</a></li>
          <li><a href="#" data-order-by="rating" class="sort__button">Sort by rating</a></li>
        </ul>
      `
    );
  }
  subscribe(cb) {
    this._subscriptions.push(cb);
  }
  _broadcast(newSortOrder) {
    this._subscriptions.forEach((subscription) => subscription(newSortOrder));
  }
  setSorterClickHandler(cb) {
    this.getElement()
      .querySelectorAll(`.sort__button`)
      .forEach((button) => button.addEventListener(`click`, cb));
  }
}
