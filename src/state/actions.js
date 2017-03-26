import moment from 'moment'
const movies = require('./movies');

export function getPopularMovies () {

  let moviesWithReleaseYear = [];
  let sortedByYear = {};
  let sortedByTitle = [];

  function addReleaseYear(){
    movies.default[0].concat(movies.default[1]).map(function(movie){
      movie.releaseYear = getYear(movie.title)[0];
      movie.title = getYear(movie.title)[1];
      moviesWithReleaseYear.push(movie);
    });
    sortByYear(moviesWithReleaseYear);
  }

  function getYear(title) {
    var split = title.split("(");
    var year = split[split.length - 1].slice(0, 4);
    var titleWithoutYear = split.slice(0, split.length - 1);
    return [year, titleWithoutYear];
  }

  function sortByYear(moviesWithReleaseYear){
    var years = [];
    moviesWithReleaseYear.map(function(movie){
      var releaseYear = movie.releaseYear;
      if (years.includes(releaseYear)){
        sortedByYear[releaseYear].push(movie);
      }
      else {
        sortedByYear[releaseYear] = [movie];
        years.push(releaseYear);
      }
    });
    sortByTitle(sortedByYear);
  }

  function sortByTitle(sortedByYear){
    Object.keys(sortedByYear).map(function(year){
      sortedByTitle = sortedByTitle.concat(alphabetize(sortedByYear[year]));
    });
  }

  function alphabetize(yearArray){
    if (yearArray.length <= 1){
      return yearArray;
    }
    var left = [];
    var right = [];
    for (var i = 1; i < yearArray.length; i++){
      yearArray[i].title < yearArray[0].title ? left.push(yearArray[i]) : right.push(yearArray[i]);
    }
    return alphabetize(left).concat([yearArray[0]]).concat(alphabetize(right));
  }

  addReleaseYear();

  const combinedResults = [].concat(sortedByTitle);

  return {
    type: 'GET_MOVIES_SUCCESS',
    movies: combinedResults
  }

}
