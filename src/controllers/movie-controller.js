import {Movie} from '../components/movie';
import {MovieDetails} from '../components/movie-details';
import {render} from '../utils/render';

export class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this.container = container;
    this.onDataChange = onDataChange;
    this.onViewChange = onViewChange;
    this.movieData = null;
    this.movieCard = null;
    this.detailsPopup = null;
  }
  _onWatchlistBtnClick() {
    const newFilmData = Object.assign({}, this.movieData, {isWatchlisted: !this.movieData.isWatchlisted});
    this.onDataChange(this.movieData.id, newFilmData);
  }

  _onWatchedBtnClick() {
    const newFilmData = Object.assign({}, this.movieData, {isWatched: !this.movieData.isWatched});
    this.onDataChange(this.movieData.id, newFilmData);
  }

  _onFavoriteBtnClick() {
    const newFilmData = Object.assign({}, this.movieData, {isFavorite: !this.movieData.isFavorite});
    this.onDataChange(this.movieData.id, newFilmData);
  }

  render(moveData) {
    this.movieData = moveData;
    this.movieCard = new Movie(moveData);
    this.detailsPopup = new MovieDetails(moveData);

    const showDetailsPopup = () => {
      const siteMainEl = this.movieCard._element.closest(`.main`);

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

    render(this.container, this.movieCard.getElement());

    this.movieCard.setCommentsClickHandler(showDetailsPopup);
    this.movieCard.setFilmTitleClickHandler(showDetailsPopup);
    this.movieCard.setPosterClickHandler(showDetailsPopup);

    this.movieCard.setAddToWatchlistBtnClickHandler(this._onWatchlistBtnClick.bind(this));
    this.movieCard.setMarkAsWatchedBtnClickHandler(this._onWatchedBtnClick.bind(this));
    this.movieCard.setFavoriteBtnClickHandler(this._onFavoriteBtnClick.bind(this));
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
    this.movieCard.movieData = this.movieData;
    this.detailsPopup.movieData = this.movieData;
    this.movieCard.rerender();
    this.detailsPopup.rerender();
  }

  removeFilm() {
    this.movieCard.removeElement();
  }

  setDefaultView() {
    this.detailsPopup.removeCloseBtnClickHandler(this._hideDetailsPopup);
    document.removeEventListener(`keyup`, this._hideDetailsPopup);
    this.detailsPopup.removeElement();
    this.detailsPopup.chosenEmoji = ``;
  }
}
