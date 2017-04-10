import _map from 'lodash/map';
import _every from 'lodash/every';
import _maxBy from 'lodash/maxBy';
import _flattenDeep from 'lodash/flattenDeep';
import _forEach from 'lodash/forEach';

global.Str = {};

const compareTwoStrings = function compareTwoStrings(str1, str2) {
  const pairs1 = wordLetterPairs(str1.toUpperCase());
  const pairs2 = wordLetterPairs(str2.toUpperCase());
  let intersection = 0;
  const union = pairs1.length + pairs2.length;

  _forEach(pairs1, (pair1) => {
    for (let i = 0; i < pairs2.length; i++) {
      const pair2 = pairs2[i];
      if (pair1 === pair2) {
        intersection++;
        pairs2.splice(i, 1);
        break;
      }
    }
  });

  return (2.0 * intersection) / union;

  function letterPairs(str) {
    const numPairs = str.length - 1;
    const pairs = [];
    for (let i = 0; i < numPairs; i++) {
      pairs[i] = str.substring(i, i + 2);
    }
    return pairs;
  }

  function wordLetterPairs(str) {
    return _flattenDeep(_map(str.split(' '), letterPairs));
  }
};

const findBestMatch = function findBestMatch(mainString, targetStrings) {
  if (!areArgsValid(mainString, targetStrings)) {
    throw new Error('Bad arguments: First argument should be a string, second should be an array of strings');
  }
  const ratings = _map(targetStrings, targetString => ({
    target: targetString,
    rating: compareTwoStrings(mainString, targetString),
  }));

  return {
    ratings,
    bestMatch: _maxBy(ratings, 'rating'),
  };

  function areArgsValid(mainString, targetStrings) {
    const mainStringIsAString = (typeof mainString === 'string');

    const targetStringsIsAnArrayOfStrings = Array.isArray(targetStrings) &&
      targetStrings.length > 0 &&
      _every(targetStrings, targetString => (typeof targetString === 'string'));

    return mainStringIsAString && targetStringsIsAnArrayOfStrings;
  }
};

Str.find = (search, source, MIN_SCORE = 0.41) => {
  let _re;

  try {
    _re = findBestMatch(search, source);
  } catch (e) {
    console.warn(e);
    return;
  }

  const bestMatch = ((_re || {}).bestMatch || {});

  return (bestMatch.rating > MIN_SCORE) ? bestMatch.target : null;
};

Str.capitalize = (s = '') => {
  s = s.toString();
  return s.slice(0, 1).toUpperCase() + s.slice(1);
};

// Str.createObjectFromMongoQueryString = (str) => {
//   const part1 = str.split('.').reduce((prev, next) => {
//     return prev + '"'+next +'"'+ ':{'
//   }, '{');
//   const nChaves = part1.match(/{/mig).length;
//   const _return = (part1 + Array.apply(null, new Array(nChaves)).map(e => '}').join(''))
//     .replace(/{"(\w*)":{}/, '$1').replace(/}$/, '');
//
//   return _return;
// };

export default Str;
