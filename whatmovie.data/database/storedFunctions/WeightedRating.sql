DELIMITER $$

CREATE FUNCTION WeightedRating(
	movie_rating_count INT,
    movie_average_rating DECIMAL(5,4),
    min_rating_count INT,
    average_rating DECIMAL(5,4)
) 
RETURNS DECIMAL(5,4)
DETERMINISTIC
BEGIN
	DECLARE mrc INT;
    DECLARE ar DECIMAL(5,4);
    SET mrc = min_rating_count;
    SET ar = average_rating;
    IF(mrc IS NULL) THEN SET mrc = 30; END IF;
    IF(ar IS NULL) THEN SET ar = 3.6; END IF;    
    RETURN (movie_rating_count / (movie_rating_count + mrc) * movie_average_rating) + (mrc / (mrc + movie_rating_count) * ar);
END$$
DELIMITER ;