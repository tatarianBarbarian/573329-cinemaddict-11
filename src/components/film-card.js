const truncateDescription = (description) => description.length > 140
  ? description.substr(0, 139) + `…`
  : description;

const createFilmCardMarkup = (filmData) => {
  const {
    title,
    rating,
    releaseDate,
    runtime,
    genre,
    poster,
    description,
    comments,
    isFavorite,
    isWathced,
    isWatchlisted
  } = filmData;

  const btnActiveClass = `film-card__controls-item--active`;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${releaseDate.getFullYear()}</span>
        <span class="film-card__duration">${runtime}</span>
        <span class="film-card__genre">${genre.short}</span>
      </p>
      <img src="./images/posters/${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${truncateDescription(description)}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isWatchlisted ? btnActiveClass : ``}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isWathced ? btnActiveClass : ``}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavorite ? btnActiveClass : ``}">Mark as favorite</button>
      </form>
    </article>`
  );
};

export {createFilmCardMarkup};
