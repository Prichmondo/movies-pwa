function calculateCorrelationScore(dataset, p1, p2) {
  
  var existp1p2 = {};
  var matchCount = 0;
  
  for(item in dataset[p1]){
    if(item in dataset[p2]){
      matchCount++;
      existp1p2[item] = 1
    }
  }

  if(matchCount == 0) return 0;
  //store the sum and the square sum of both p1 and p2
  //store the product of both
  var p1_sum=0,
      p2_sum=0,
      p1_sq_sum=0,
      p2_sq_sum=0,
      prod_p1p2 = 0;

  //calculate the sum and square sum of each data point
  //and also the product of both point
  for(var item in existp1p2){
    p1_sum += dataset[p1][item];
    p2_sum += dataset[p2][item];
    p1_sq_sum += Math.pow(dataset[p1][item],2);
    p2_sq_sum += Math.pow(dataset[p2][item],2);
    prod_p1p2 += dataset[p1][item]*dataset[p2][item];
  }

  var numerator = prod_p1p2 - (p1_sum*p2_sum/matchCount);
  var st1 = p1_sq_sum - Math.pow(p1_sum,2)/matchCount;
  var st2 = p2_sq_sum - Math.pow(p2_sum,2)/matchCount;
  var denominator = Math.sqrt(st1*st2);

  if(denominator ==0) {
    return 0;
  }
  else 
  {
    var val = numerator / denominator;
    return val;
  }
        
}

module.exports.rankSimilarUsers = function (dataset, userId) {
  
  var scores = [];

  for(var otherId in dataset){
    if(otherId != userId){
      var score = calculateCorrelationScore(dataset, userId, otherId)
      scores.push({ userId: otherId, score: score});
    }
  }

  scores.sort(function(a,b){
      return b.score < a.score ? -1 : b.score > a.score ? 1 : b.score >= a.score ? 0 : NaN;
  });

  return scores;
}
