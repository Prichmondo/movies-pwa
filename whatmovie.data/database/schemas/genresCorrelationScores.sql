CREATE TABLE `moviesdb`.`genresCorrelationScores` (
  `user_id` VARCHAR(36) NOT NULL,
  `genre_id` INT NOT NULL,
  `avgRating` FLOAT(5,4) NOT NULL,
  `score` FLOAT(5,4) NOT NULL,
  PRIMARY KEY (`user_id`, `genre_id`));