export const compareFilmsByDate = ({releaseDate: x}, {releaseDate: y}) => new Date(y) - new Date(x);
export const compareFilmsByRating = ({rating: x}, {rating: y}) => Number(y) - Number(x);
export const compareFilmsByCommentsCount = ({comments: x}, {comments: y}) => y.length - x.length;
