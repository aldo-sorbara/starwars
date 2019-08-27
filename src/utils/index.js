const episodes = {
  1: 'I',
  2: 'II',
  3: 'III',
  4: 'IV',
  5: 'V',
  6: 'VI',
  7: 'VII'
};

export const romanize = episodeId => episodes[episodeId] || 'Not found';

export const arrayToSet = (oldArray, size) => {
  const arrays = [];

  while (oldArray.length > 0) {
    arrays.push(oldArray.splice(0, size));
  }
  return arrays;
};
