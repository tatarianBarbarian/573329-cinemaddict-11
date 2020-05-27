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
  }
}
