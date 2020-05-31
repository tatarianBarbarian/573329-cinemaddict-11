import {render} from '../utils/render';
import {Sorting} from '../components/sort';

export class SortingController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._sortingComponent = new Sorting();
  }

  render() {
    render(this._container, this._sortingComponent.getElement());

    const updateSorting = (sorting) => {
      this._moviesModel.sortMovies(sorting);
      this._sortingComponent.sortOrder = sorting;
      this._sortingComponent.rerender();
    };

    this._sortingComponent.setDefaultSortingClickHandler(() => updateSorting(`default`));
    this._sortingComponent.setDateSortingClickHandler(() => updateSorting(`date`));
    this._sortingComponent.setRatingSortingClickHandler(() => updateSorting(`rating`));
  }

  resetSorting() {

  }
}
