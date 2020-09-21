CREATE TABLE `recommendations` (
	`user_id` INT NOT NULL,
  `movie_id` INT NOT NULL,
	`score` DECIMAL(8,7) NOT NULL,
  PRIMARY KEY (`movie_id`, `user_id`),
		FOREIGN KEY(`movie_id`) 
		REFERENCES movies(`id`)
);