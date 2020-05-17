import {Film} from '../components/film';
import {FilmDetails} from '../components/film-details';
import {render} from '../utils/render';

export class MovieController {
  constructor(container, onDataChange) {
    this.container = container;
    this.onDataChange = onDataChange;
    this.filmData = null;
    this.filmCard = null;
    this.detailsPopup = null;
  }

  render(filmData) {
    this.filmData = filmData;
    this.filmCard = new Film(filmData);
    this.detailsPopup = new FilmDetails(filmData);

    const onWatchlistBtnClick = () => {
      const newFilmData = Object.assign({}, this.filmData, {isWatchlisted: !this.filmData.isWatchlisted});
      this.onDataChange(this.filmData, newFilmData);
    };

    const onWatchedBtnClick = () => {
      const newFilmData = Object.assign({}, this.filmData, {isWatched: !this.filmData.isWatched});
      this.onDataChange(this.filmData, newFilmData);
    };

    const onFavoriteBtnClick = () => {
      const newFilmData = Object.assign({}, this.filmData, {isFavorite: !this.filmData.isFavorite});
      this.onDataChange(this.filmData, newFilmData);
    };

    const showDetailsPopup = () => {
      const siteMainEl = this.filmCard._element.closest(`.main`);
      render(siteMainEl, this.detailsPopup.getElement());

      this.detailsPopup.setAddToWatchlistBtnClickHandler(onWatchlistBtnClick);
      this.detailsPopup.setMarkAsWatchedBtnClickHandler(onWatchedBtnClick);
      this.detailsPopup.setFavoriteBtnClickHandler(onFavoriteBtnClick);
      this.detailsPopup.setCommentEmojiClickHandler((event) => {
        this.detailsPopup.chosenEmoji = event.currentTarget.value;
        this.detailsPopup.rerender();
      });

      this.detailsPopup.setCloseBtnClickHandler(hideDetailsPopup);
      document.addEventListener(`keyup`, hideDetailsPopup);
    };

    const hideDetailsPopup = (event) => {
      if (event.key === `Escape` || event.type === `click`) {
        const detailsPopupEl = this.detailsPopup.getElement();

        if (detailsPopupEl) {
          this.detailsPopup.removeCloseBtnClickHandler(hideDetailsPopup);
          document.removeEventListener(`keyup`, hideDetailsPopup);
          this.detailsPopup.removeElement();
          this.detailsPopup.chosenEmoji = ``;
        }
      }
    };

    render(this.container, this.filmCard.getElement());

    this.filmCard.setCommentsClickHandler(showDetailsPopup);
    this.filmCard.setFilmTitleClickHandler(showDetailsPopup);
    this.filmCard.setPosterClickHandler(showDetailsPopup);

    this.filmCard.setAddToWatchlistBtnClickHandler(onWatchlistBtnClick);
    this.filmCard.setMarkAsWatchedBtnClickHandler(onWatchedBtnClick);
    this.filmCard.setFavoriteBtnClickHandler(onFavoriteBtnClick);
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
}
