ALTER TABLE `moviesdb`.`movies` 
ADD FULLTEXT INDEX `search_index` (`title`, `genres`, `year`, `director`, `cast`) VISIBLE;