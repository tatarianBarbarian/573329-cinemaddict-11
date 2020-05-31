import {AbstractSmartComponent} from './abstract-smart-component';

export class Sorting extends AbstractSmartComponent {
  constructor() {
    super();
    this.sortOrder = `default`;
  }

  getTemplate() {
    const setActiveClass = (sorting) => sorting === this.sortOrder ? `sort__button--active` : ``;

    return (
      `
        <ul class="sort">
          <li><a href="#" data-order-by="default" class="sort__button ${setActiveClass(`default`)}">Sort by default</a></li>
          <li><a href="#" data-order-by="date" class="sort__button ${setActiveClass(`date`)}">Sort by date</a></li>
          <li><a href="#" data-order-by="rating" class="sort__button ${setActiveClass(`rating`)}">Sort by rating</a></li>
        </ul>
      `
    );
  }

  setDefaultSortingClickHandler(cb) {
    this.setListener(`[data-order-by="default"]`, `click`, cb);
  }

  setDateSortingClickHandler(cb) {
    this.setListener(`[data-order-by="date"]`, `click`, cb);
  }

  setRatingSortingClickHandler(cb) {
    this.setListener(`[data-order-by="rating"]`, `click`, cb);
  }

  recoveryListeners() {
    this.listeners.forEach(({selector, event, cb}) => {
      this._element.querySelectorAll(selector).forEach((el) => el.addEventListener(event, cb));
    });
  }
}
