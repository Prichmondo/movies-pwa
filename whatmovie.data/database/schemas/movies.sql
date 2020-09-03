CREATE TABLE `movies` (
	`id` INT NOT NULL,
	`title` VARCHAR(2048) NOT NULL,
	`genres` VARCHAR(4000),
	`tmdbid` INT NOT NULL,
	`imdbid` INT NOT NULL,
	`year` INT,
	`img` VARCHAR(256),
	`director` VARCHAR(2048),
	`cast` VARCHAR(4000),
	`vote` FLOAT(2),
	KEY `genres` (`genres`) USING BTREE,
    KEY `year` (`year`) USING BTREE,
    KEY `cast` (`cast`) USING BTREE,
    KEY `director` (`director`) USING BTREE,
	PRIMARY KEY (`id`)
);