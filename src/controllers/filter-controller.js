import {render} from '../utils/render';
import {Filters} from '../components/filters-stats';

export class FilterController {
  constructor(container, moviesModel) {
    this.container = container;
    this._moviesModel = moviesModel;
  }

  render() {
    const filters = new Filters(this._moviesModel.movies);
    render(this.container, filters.getElement());

    const updateFilter = (value) => {
      filters.activeFilter = filters.filterStates[value];
      filters.rerender();
      this._moviesModel.updateFilter(value);
    };

    filters.setAllMoviesFilterClickHandler(() => updateFilter(`all`));
    filters.setWatchlistFilterClickHandler(() => updateFilter(`watchlist`));
    filters.setHistoryFilterClickHandler(() => updateFilter(`history`));
    filters.setFavoritesFilterClickHandler(() => updateFilter(`favorites`));
  }
}
