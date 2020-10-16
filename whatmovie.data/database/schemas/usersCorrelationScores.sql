CREATE TABLE `usersCorrelationScores` (
	`user_id` VARCHAR(36) NOT NULL,
	`other_user_id` VARCHAR(36) NOT NULL,
	`score` DECIMAL(8,7) NOT NULL,
	PRIMARY KEY (`user_id`, `other_user_id`)
);