UPDATE movies m
INNER JOIN (
	SELECT
		r.movie_id,
		AVG(r.rating) avg_rating,
		COUNT(r.rating) rating_count,
		(COUNT(r.rating) / (COUNT(r.rating) + 30) * AVG(r.rating)) + (30 / (30 + COUNT(r.rating)) * 3.6) score
	FROM ratings r
    GROUP BY r.movie_id
) mr ON m.id = mr.movie_id
SET 
m.avg_rating = mr.avg_rating, 
m.rating_count = mr.rating_count, 
m.score = mr.score