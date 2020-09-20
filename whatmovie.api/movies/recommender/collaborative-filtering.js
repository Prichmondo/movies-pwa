/**
 * Collaborative filtering (Jaccard Index)
 * finds items that are similar to one another based on how your collective user base have rated these items,
 * or finds users who are similar based on the items that they have mutually rated similarly. 
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
