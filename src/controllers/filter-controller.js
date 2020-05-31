import {render} from '../utils/render';
import {Filters} from '../components/filters-stats';

export class FilterController {
  constructor(container, moviesModel) {
    this.container = container;
    this._moviesModel = moviesModel;
    this._filters = null;
  }

  _onMoviesChange(movies) {
    this._filters.films = movies;
    this._filters.rerender();
  }

  render() {
    this._filters = new Filters(this._moviesModel.movies);
    render(this.container, this._filters.getElement());

    this._moviesModel.subscribe({
      topic: `updateMovie`,
      cb: this._onMoviesChange.bind(this)
    });

    const updateFilter = (value) => {
      this._filters.activeFilter = this._filters.filterStates[value];
      this._filters.rerender();
      this._moviesModel.filterMovies(value);
    };

    this._filters.setAllMoviesFilterClickHandler(() => updateFilter(`all`));
    this._filters.setWatchlistFilterClickHandler(() => updateFilter(`watchlist`));
    this._filters.setHistoryFilterClickHandler(() => updateFilter(`history`));
    this._filters.setFavoritesFilterClickHandler(() => updateFilter(`favorite`));
  }

  rerender() {
    this._filters.rerender();
  }
}
