import {Film} from '../components/film';
import {FilmDetails} from '../components/film-details';
import {render} from '../utils/render';

export class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this.container = container;
    this.onDataChange = onDataChange;
    this.onViewChange = onViewChange;
    this.filmData = null;
    this.filmCard = null;
    this.detailsPopup = null;
  }
  _onWatchlistBtnClick() {
    const newFilmData = Object.assign({}, this.filmData, {isWatchlisted: !this.filmData.isWatchlisted});
    this.onDataChange(this.filmData, newFilmData);
  }

  _onWatchedBtnClick() {
    const newFilmData = Object.assign({}, this.filmData, {isWatched: !this.filmData.isWatched});
    this.onDataChange(this.filmData, newFilmData);
  }

  _onFavoriteBtnClick() {
    const newFilmData = Object.assign({}, this.filmData, {isFavorite: !this.filmData.isFavorite});
    this.onDataChange(this.filmData, newFilmData);
  }

  render(filmData) {
    this.filmData = filmData;
    this.filmCard = new Film(filmData);
    this.detailsPopup = new FilmDetails(filmData);

    const showDetailsPopup = () => {
      const siteMainEl = this.filmCard._element.closest(`.main`);

      this.onViewChange();
      render(siteMainEl, this.detailsPopup.getElement());

      this.detailsPopup.setAddToWatchlistBtnClickHandler(this._onWatchlistBtnClick.bind(this));
      this.detailsPopup.setMarkAsWatchedBtnClickHandler(this._onWatchedBtnClick.bind(this));
      this.detailsPopup.setFavoriteBtnClickHandler(this._onFavoriteBtnClick.bind(this));
      this.detailsPopup.setCommentEmojiClickHandler((event) => {
        this.detailsPopup.chosenEmoji = event.currentTarget.value;
        this.detailsPopup.rerender();
      });

      this.detailsPopup.setCloseBtnClickHandler(this._hideDetailsPopup.bind(this));
      document.addEventListener(`keyup`, this._hideDetailsPopup.bind(this));
    };

    render(this.container, this.filmCard.getElement());

    this.filmCard.setCommentsClickHandler(showDetailsPopup);
    this.filmCard.setFilmTitleClickHandler(showDetailsPopup);
    this.filmCard.setPosterClickHandler(showDetailsPopup);

    this.filmCard.setAddToWatchlistBtnClickHandler(this._onWatchlistBtnClick.bind(this));
    this.filmCard.setMarkAsWatchedBtnClickHandler(this._onWatchedBtnClick.bind(this));
    this.filmCard.setFavoriteBtnClickHandler(this._onFavoriteBtnClick.bind(this));
  }

  _hideDetailsPopup(event) {
    if (event.key === `Escape` || event.type === `click`) {
      const detailsPopupEl = this.detailsPopup.getElement();

      if (detailsPopupEl) {
        this.setDefaultView();
      }
    }
  }

  rerender() {
    this.filmCard.filmData = this.filmData;
    this.detailsPopup.filmData = this.filmData;
    this.filmCard.rerender();
    this.detailsPopup.rerender();
  }

  removeFilm() {
    this.filmCard.removeElement();
  }

  setDefaultView() {
    this.detailsPopup.removeCloseBtnClickHandler(this._hideDetailsPopup);
    document.removeEventListener(`keyup`, this._hideDetailsPopup);
    this.detailsPopup.removeElement();
    this.detailsPopup.chosenEmoji = ``;
  }
}
