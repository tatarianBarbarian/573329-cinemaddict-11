import {ShowMoreBtn} from '../components/show-more-btn';
import {render} from '../utils/render';

export class ShowMoreBtnController {
  constructor(container, moviesModel, onShowMoreBtnClick) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._onShowMoreBtnClick = onShowMoreBtnClick;
    this._showMoreBtn = new ShowMoreBtn();
    this.MOVIES_SHOWING_BY_CLICK = 5;
  }

  render() {
    if (this._moviesModel.movies.length !== this._moviesModel.renderedFilms.length) {
      render(this._container, this._showMoreBtn.getElement());

      this._showMoreBtn.setClickHandler(() => {
        const renderedFilmsCount = this._moviesModel.renderedFilms.length;
        const updatedFilmsCount = renderedFilmsCount + this.MOVIES_SHOWING_BY_CLICK;

        const filmsToRender = this._moviesModel.movies.slice(renderedFilmsCount, updatedFilmsCount);
        this._onShowMoreBtnClick(filmsToRender);

        if (this._moviesModel.movies.length <= updatedFilmsCount) {
          this._showMoreBtn.removeElement();
        }
      });
    }
  }

  remove() {
    this._showMoreBtn.removeElement();
  }
}
