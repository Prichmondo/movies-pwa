CREATE TABLE `ratings` (
	`movie_id` INT NOT NULL,
	`user_id` VARCHAR(36) NOT NULL,
	`rating` INT NOT NULL,
	PRIMARY KEY (`movie_id`, `user_id`),
		FOREIGN KEY(`movie_id`) 
        REFERENCES movies(`id`)
);