CREATE TABLE `similarities` (
	`user_id` VARCHAR(36) NOT NULL,
	`other_user_id` VARCHAR(36) NOT NULL,
	`score` INT NOT NULL,
	PRIMARY KEY (`user_id`, `other_user_id`)
);