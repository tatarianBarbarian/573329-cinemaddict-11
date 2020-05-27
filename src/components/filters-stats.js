import {AbstractSmartComponent} from './abstract-smart-component';

export class Filters extends AbstractSmartComponent {
  constructor(films = []) {
    super();
    this.filterStates = {
      all: `all`,
      watchlist: `watchlist`,
      history: `history`,
      favorites: `favorites`
    };
    this._favoriteFilms = 0;
    this._watchlistedFilms = 0;
    this._watchedFilms = 0;
    this.activeFilter = this.filterStates.all;

    films.forEach((film) => {
      if (film.isFavorite) {
        this._favoriteFilms++;
      }

      if (film.isWatchlisted) {
        this._watchlistedFilms++;
      }

      if (film.isWatched) {
        this._watchedFilms++;
      }
    });
  }

  getTemplate() {
    const activeFilterClass = `main-navigation__item--active`;
    const checkState = (filter) => filter === this.filterStates[this.activeFilter] ? activeFilterClass : ``;

    return (
      `<nav class="main-navigation">
        <div class="main-navigation__items">
          <a href="#all" class="main-navigation__item ${checkState(this.filterStates.all)}">All movies</a>
          <a href="#watchlist" class="main-navigation__item ${checkState(this.filterStates.watchlist)}">Watchlist <span class="main-navigation__item-count">${this._watchlistedFilms}</span></a>
          <a href="#history" class="main-navigation__item ${checkState(this.filterStates.history)}">History <span class="main-navigation__item-count">${this._watchedFilms}</span></a>
          <a href="#favorites" class="main-navigation__item ${checkState(this.filterStates.favorites)}">Favorites <span class="main-navigation__item-count">${this._favoriteFilms}</span></a>
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
