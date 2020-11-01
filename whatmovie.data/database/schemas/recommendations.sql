CREATE TABLE `recommendations` (
	`user_id` VARCHAR(36) NOT NULL,
  `movie_id` INT NOT NULL,
	`score` DECIMAL(8,7) NOT NULL,
  `timestamp` TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
  PRIMARY KEY (`movie_id`, `user_id`),
		FOREIGN KEY(`movie_id`) 
		REFERENCES movies(`id`)
);