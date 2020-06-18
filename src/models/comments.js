import {ApiAdapter} from './api';

export class Comments {
  constructor() {
    this.api = new ApiAdapter();
    this.comments = null;
    this.loadingStatus = ``;
    this.currentId = null;
    this.subscriptions = [];
  }

  subscribe(cb) {
    this.subscriptions.push(cb);
  }

  broadcast(data) {
    this.subscriptions.forEach((sub) => sub(data));
  }

  getComments(movieId) {
    return new Promise((resolve, reject) => {
      this.currentId = movieId;
      this.loadingStatus = `loading`;
      this.api.getComments(movieId)
        .then((comments) => {
          this.comments = comments;
          this.loadingStatus = `done`;
          resolve(comments);
        })
        .catch((err) => {
          this.loadingStatus = `error`;
          reject(err);
        });
    });
  }

  addComment(movieId, comment) {
    return new Promise((resolve, reject) => {
      this.api.addComment(movieId, comment)
        .then((updatedInfo) => {
          this.comments = updatedInfo.comments;
          resolve(updatedInfo);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  deleteComment(commentId) {
    return new Promise((resolve, reject) => {
      this.api.deleteComment(commentId)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
