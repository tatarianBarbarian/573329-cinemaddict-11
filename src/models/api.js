// TODO: Записывать в локалсторедж строку авторизации, вынести методы?, exceptions
export class ApiAdapter {
  constructor() {
    this.baseUrl = `https://11.ecmascript.pages.academy/cinemaddict`;
  }

  adaptForBackend(frontData) {
    return JSON.stringify({
      "id": frontData.id,
      "user_details": {
        "watchlist": frontData.isWatchlisted,
        "already_watched": frontData.isWatched,
        "favorite": frontData.isFavorite,
        "watching_date": frontData.watchingDate
      },
      "film_info": {
        "title": frontData.title,
        "alternative_title": frontData.originalTitle,
        "total_rating": frontData.rating,
        "poster": frontData.poster,
        "age_rating": frontData.ageLimit,
        "director": frontData.director,
        "writers": frontData.writers,
        "actors": frontData.actors,
        "release": {
          "date": frontData.releaseDate,
          "release_country": frontData.countries
        },
        "runtime": frontData.runtime,
        "genre": frontData.genre.full,
        "description": frontData.description
      },
      "comments": frontData.comments
    });
  }

  adaptForFrontend(backData) {
    return {
      title: backData.film_info.title,
      originalTitle: backData.film_info.alternative_title,
      director: backData.film_info.director,
      writers: backData.film_info.writers,
      actors: backData.film_info.actors,
      runtime: backData.film_info.runtime,
      releaseDate: backData.film_info.release.date,
      countries: backData.film_info.release.release_country,
      genre: {
        short: backData.film_info.genre[0],
        full: backData.film_info.genre
      },
      poster: backData.film_info.poster,
      description: backData.film_info.description,
      comments: backData.comments,
      rating: backData.film_info.total_rating,
      ageLimit: backData.film_info.age_rating,
      id: backData.id,
      isFavorite: backData.user_details.favorite,
      isWatchlisted: backData.user_details.watchlist,
      isWatched: backData.user_details.already_watched,
      watchingDate: backData.user_details.watching_date
    };
  }

  getMovies() {
    return new Promise((res, rej) => {
      fetch(`${this.baseUrl}/movies`, {
        method: `GET`,
        headers: {
          'Authorization': `Basic 123x123009`
        }
      })
        .then((resp) => {
          if (!resp.ok) {
            rej(`Error!`);
          }
          return resp.json();
        })
        .catch((err) => rej(err))
        .then((data) => {
          const processedData = data.map(this.adaptForFrontend);

          res(processedData);
        });
    });
  }

  getComments(movieId) {
    return new Promise((res, rej) => {
      fetch(`${this.baseUrl}/comments/${movieId}`, {
        method: `GET`,
        headers: {
          'Authorization': `Basic 123x123009`,
          'Content-Type': `application/json`
        }
      })
        .then((resp) => resp.json())
        .catch((err) => rej(err))
        .then((data) => {
          res(data);
        });
    });
  }

  updateMovie(movieId, data) {
    return new Promise((res, rej) => {
      fetch(`${this.baseUrl}/movies/${movieId}`, {
        method: `PUT`,
        headers: {
          'Content-Type': `application/json`,
          'Authorization': `Basic 123x123009`
        },
        body: this.adaptForBackend(data)
      })
        .then((resp) => resp.json())
        .catch((err) => rej(err))
        .then((updatedMovie) => {
          res(updatedMovie);
        });
    });
  }

  addComment(movieId, comment) {
    // {
    //   "comment": "a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.",
    //   "date": "2019-05-11T16:12:32.554Z",
    //   "emotion": "smile"
    // }

    return new Promise((res, rej) => {
      fetch(`${this.baseUrl}/comments/${movieId}`, {
        method: `POST`,
        headers: {
          'Content-Type': `application/json`,
          'Authorization': `Basic 123x123009`
        },
        body: this.adaptForBackend(comment) // TODO: Отформатировать коммент
      })
        .then((resp) => resp.json())
        .catch((err) => rej(err))
        .then((updatedMovie) => {
          res(updatedMovie);
        });
    });
  }

  deleteComment(commentId) {
    return new Promise((res, rej) => {
      fetch(`${this.baseUrl}/comments/${commentId}`, {
        method: `DELETE`,
        headers: {
          'Authorization': `Basic 123x123009`
        },
      })
        .then((resp) => resp.json())
        .catch((err) => rej(err))
        .then((updatedMovie) => {
          res(updatedMovie);
        });
    });
  }
}
