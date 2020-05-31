import {AbstractSmartComponent} from './abstract-smart-component';

export class Filters extends AbstractSmartComponent {
  constructor(films = []) {
    super();
    this.films = films;
    this.filterStates = {
      all: `all`,
      watchlist: `watchlist`,
      history: `history`,
      favorite: `favorite`
    };
    this._activeFilter = this.filterStates.all;
  }

  set activeFilter(value) {
    this._activeFilter = value;
    this.rerender();
  }

  getTemplate() {
    let favoriteFilms = 0;
    let watchlistedFilms = 0;
    let watchedFilms = 0;

    this.films.forEach((film) => {
      if (film.isFavorite) {
        favoriteFilms++;
      }

      if (film.isWatchlisted) {
        watchlistedFilms++;
      }

      if (film.isWatched) {
        watchedFilms++;
      }
    });

    const activeFilterClass = `main-navigation__item--active`;
    const checkState = (filter) => filter === this.filterStates[this._activeFilter] ? activeFilterClass : ``;

    return (
      `<nav class="main-navigation">
        <div class="main-navigation__items">
          <a href="#all" class="main-navigation__item ${checkState(this.filterStates.all)}">All movies</a>
          <a href="#watchlist" class="main-navigation__item ${checkState(this.filterStates.watchlist)}">Watchlist <span class="main-navigation__item-count">${watchlistedFilms}</span></a>
          <a href="#history" class="main-navigation__item ${checkState(this.filterStates.history)}">History <span class="main-navigation__item-count">${watchedFilms}</span></a>
          <a href="#favorites" class="main-navigation__item ${checkState(this.filterStates.favorite)}">Favorites <span class="main-navigation__item-count">${favoriteFilms}</span></a>
        </div>
        <a href="#stats" class="main-navigation__additional">Stats</a>
      </nav>`
    );
  }

  setAllMoviesFilterClickHandler(cb) {
    this.setListener(`.main-navigation__item[href="#all"]`, `click`, cb);
  }

  setWatchlistFilterClickHandler(cb) {
    this.setListener(`.main-navigation__item[href="#watchlist"]`, `click`, cb);
  }

  setHistoryFilterClickHandler(cb) {
    this.setListener(`.main-navigation__item[href="#history"]`, `click`, cb);
  }

  setFavoritesFilterClickHandler(cb) {
    this.setListener(`.main-navigation__item[href="#favorites"]`, `click`, cb);
  }

  recoveryListeners() {
    this.listeners.forEach(({selector, event, cb}) => {
      this._element.querySelectorAll(selector).forEach((el) => el.addEventListener(event, cb));
    });
  }
}
