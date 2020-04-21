const countFilms = (films) => {
  let favoriteFilms = 0;
  let watchlistedFilms = 0;
  let watchedFilms = 0;

  films.forEach((film) => {
    if (film.isFavorite) {
      favoriteFilms++;
    } if (film.isWatchlisted) {
      watchlistedFilms++;
    } if (film.isWatched) {
      watchedFilms++;
    }
  });

  return {
    favoriteFilms,
    watchlistedFilms,
    watchedFilms
  };
};

const createFiltersAndStatsMarkup = (films) => {
  const filtersCount = countFilms(films);

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${filtersCount.watchlistedFilms}</span></a>
        <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${filtersCount.watchedFilms}</span></a>
        <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${filtersCount.favoriteFilms}</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export {createFiltersAndStatsMarkup};