import {BaseComponent} from './base-component.js';

export class Filters extends BaseComponent {
  constructor(films = []) {
    super();
    this.favoriteFilms = 0;
    this.watchlistedFilms = 0;
    this.watchedFilms = 0;

    films.forEach((film) => {
      if (film.isFavorite) {
        this.favoriteFilms++;
      }

      if (film.isWatchlisted) {
        this.watchlistedFilms++;
      }

      if (film.isWatched) {
        this.watchedFilms++;
      }
    });
  }

  getTemplate() {
    return (
      `<nav class="main-navigation">
        <div class="main-navigation__items">
          <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
          <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${this.watchlistedFilms}</span></a>
          <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${this.watchedFilms}</span></a>
          <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${this.favoriteFilms}</span></a>
        </div>
        <a href="#stats" class="main-navigation__additional">Stats</a>
      </nav>`
    );
  }
}
