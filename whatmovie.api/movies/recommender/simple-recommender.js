/**
 * Simple Recommender
 * Simple recommenders are basic systems that recommend the top items based on a certain metric or score.
 * The following formula takes count not only the average rating, but also the number of votes.
 * A movie with  
 * 
 * Params:
 * v = the number of votes for the movie
 * m = the minimum votes required to be listed in the results
 *     used to exclude large amount of items. for example: the lowest amount of votes of top 10%
 * r = is the average rating of the movie
 * c = is the average rating of all movies
 */
function calculateRating(v, m, r, c) {
  return v/(v+m)*r + m/(v+m)*c;
}
