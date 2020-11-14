ALTER TABLE `moviesdb`.`movies` 
ADD COLUMN `avgRating` FLOAT(2,1) NULL DEFAULT 0 AFTER `vote`,
ADD COLUMN `ratingCount` INT NULL DEFAULT 0 AFTER `avg_rating`,
ADD COLUMN `score` FLOAT(5,4) NULL DEFAULT 0 AFTER `rating_count`;