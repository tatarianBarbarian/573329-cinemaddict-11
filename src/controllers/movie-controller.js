import {Movie} from '../components/movie';
import {MovieDetails} from '../components/movie-details/movie-details';
import {render} from '../utils/render';

export class MovieController {
  constructor(container, commentsModel, onDataChange, onViewChange, onCommentsChange) {
    this.container = container;
    this.onDataChange = onDataChange;
    this.onViewChange = onViewChange;
    this.movieData = null;
    this.movieCard = null;
    this.detailsPopup = null;
    this._commentsModel = commentsModel;
    this.onCommentsChange = onCommentsChange;
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

  render(movieData) {
    this.movieData = movieData;
    this.movieCard = new Movie(movieData);
    this.detailsPopup = new MovieDetails(movieData, this._commentsModel);

    this._commentsModel.subscribe({
      id: this.movieData.id,
      cb: (data) => {
        this.detailsPopup.comments = data;
      }
    });

    const showDetailsPopup = () => {
      const siteMainEl = this.movieCard._element.closest(`.main`);

      this.onViewChange();
      render(siteMainEl, this.detailsPopup.getElement());
      this.detailsPopup.setCloseBtnClickHandler(this._hideDetailsPopup.bind(this));
      this.detailsPopup.setAddToWatchlistBtnClickHandler(this._onWatchlistBtnClick.bind(this));
      this.detailsPopup.setMarkAsWatchedBtnClickHandler(this._onWatchedBtnClick.bind(this));
      this.detailsPopup.setFavoriteBtnClickHandler(this._onFavoriteBtnClick.bind(this));
      this.detailsPopup.setCommentEmojiClickHandler((event) => {
        this.detailsPopup.chosenEmoji = event.currentTarget.value;
      });
      this.detailsPopup.setDeleteCommentBtnClickHandler((event) => {
        event.currentTarget.textContent = `Deleting...`;
        event.currentTarget.disabled = true;
        this._commentsModel.deleteComment(event.currentTarget.dataset.commentId)
          .then(() => {
            this._commentsModel.getComments(this.movieData.id)
              .then((comments) => {
                this.detailsPopup.comments = comments;
              })
              .catch();
          });
      });
      this.detailsPopup.setCrlEnterKeysHandler((event) => {
        if (event.key === `Enter` && event.ctrlKey) {
          const commentText = this.detailsPopup.commentText;
          const commentEmoji = this.detailsPopup.chosenEmoji;
          const commentDate = new Date();
          this._commentsModel.addComment(this.movieData.id, {
            comment: commentText,
            date: commentDate.toISOString(),
            emotion: commentEmoji
          })
            .then((updatedMovie) => {
              this.detailsPopup.comments = updatedMovie.comments; // TODO: Form resetting?
              this.detailsPopup.resetForm();
            })
            .catch(() => {
              event.currentTarget.disabled = false;
              event.currentTarget.focus();
            });

        }
      });
      this._commentsModel.getComments(this.movieData.id)
        .then((comments) => {
          this.detailsPopup.comments = comments;
        })
        .catch();

      this._hideDetailsPopup.binded = this._hideDetailsPopup.bind(this); // Для предотвращения утечки, т.к. func !== func.bind(obj)
      document.addEventListener(`keyup`, this._hideDetailsPopup.binded);
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
      if (this.detailsPopup.getElement()) {
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
    document.removeEventListener(`keyup`, this._hideDetailsPopup.binded);
    this.detailsPopup.removeElement();
    this.detailsPopup.chosenEmoji = null;
  }
}
