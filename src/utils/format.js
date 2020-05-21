import moment from 'moment';

export const formatRuntime = (runtime) => {
  const hours = moment.duration(runtime, `minutes`).hours();
  const minutes = moment.duration(runtime, `minutes`).minutes();

  return hours ? `${hours}h ${minutes}m` : `${minutes}m`;
};

export const formatReleaseDateFull = (date) => moment(date).format(`DD MMMM YYYY`);
export const formatReleaseDateShort = (date) => moment(date).format(`YYYY`);
export const humanizeCommentDate = (date) => moment(date).fromNow();
