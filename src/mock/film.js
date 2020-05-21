const posters = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`
];
const titles = [
  `Star Wars: Episode I – The Phantom Menace`,
  `Star Wars: Episode II – Attack of the Clones`,
  `Star Wars: Episode III – Revenge of the Sith`,
  `Batman Begins`,
  `The Dark Knight`,
  `The Dark Knight Rises`,
  `Planet of apes`
];
const names = [
  `Alfie Gray`,
  `Archie Gray`,
  `Lloyd Sullivan`,
  `Saul Wong`,
  `Patricia Tyler`,
  `Kelli Thornton`,
  `Minnie Francis`,
  `Lamar Richards`,
  `Geraldine Butler`,
  `Jodi Roy`,
  `Josh Mccoy`,
  `Jesse Powell`,
  `Bruce Wayne`,
  `Obi Van Kenobi`,
  `Luke Skywalker`,
  `Darth Vader`,
  `Bayne`,
  `Joker`
];
const countries = [
  `The Bahamas`,
  `Bahrain`,
  `Bangladesh`,
  `Barbados`,
  `Belarus`,
  `Belgium`,
  `Belize`
];
const genres = [`Action`, `Comedy`, `Musical`, `Drama`, `Fantasy`];

const getRandomBool = () => Math.random() > 0.5;
export const getRandomInt = (min, max) => min + Math.floor(Math.random() * (max - min));
const getRandomArrayItem = (array) => array[getRandomInt(0, array.length)];
const getRandomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
export const createRandomLengthArray = (min, max) => {
  return new Array(getRandomInt(min, max))
    .fill(undefined);
};
const createArrayWithRandomItems = (min, max, itemsSource) => {
  return createRandomLengthArray(min, max)
    .map(() => getRandomArrayItem(itemsSource));
};

const generateDuration = () => getRandomInt(60, 120);

const generateRating = () => (getRandomInt(0, 100) / 10).toFixed(1);

const generateComments = () => {
  const commentSamples = [
    `Interesting setting and a good cast`,
    `Booooooooooring`,
    `Very very old. Meh`,
    `Almost two hours? Seriously?`,
    `Why so seriously?`,
    `Hello there!`,
    `May the Force be with you`
  ];
  const emojis = [
    `angry`,
    `puke`,
    `sleeping`,
    `smile`
  ];

  const createComment = () => ({
    emoji: getRandomArrayItem(emojis),
    text: getRandomArrayItem(commentSamples),
    author: getRandomArrayItem(names),
    date: getRandomDate(new Date(2015, 1, 1), new Date())
  });

  return createRandomLengthArray(1, 5).map(createComment);
};

const generateDescription = () => {
  const descriptionSentences = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit`,
    `Cras aliquet varius magna, non porta ligula feugiat eget`,
    `Fusce tristique felis at fermentum pharetra`,
    `Aliquam id orci ut lectus varius viverra`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui`,
    `Sed sed nisi sed augue convallis suscipit in sed felis`,
    `Aliquam erat volutpat`,
    `Nunc fermentum tortor ac porta dapibus`,
    `In rutrum ac purus sit amet tempus`
  ];

  return createArrayWithRandomItems(1, 5, descriptionSentences)
    .join(`.`)
    + `. `;
};

export const mockFilm = () => {
  const title = getRandomArrayItem(titles);

  return {
    title,
    originalTitle: title,
    director: getRandomArrayItem(names),
    writers: createArrayWithRandomItems(1, 5, names),
    actors: createArrayWithRandomItems(1, 5, names),
    releaseDate: getRandomDate(new Date(1950), new Date()),
    runtime: generateDuration(),
    countries: createArrayWithRandomItems(1, 3, countries),
    genre: {
      short: getRandomArrayItem(genres),
      full: createArrayWithRandomItems(1, 3, genres)
    },
    poster: getRandomArrayItem(posters),
    description: generateDescription(),
    comments: generateComments(),
    rating: generateRating(),
    ageLimit: getRandomInt(7, 18),
    isFavorite: getRandomBool(),
    isWatched: getRandomBool(),
    isWatchlisted: getRandomBool()
  };
};
