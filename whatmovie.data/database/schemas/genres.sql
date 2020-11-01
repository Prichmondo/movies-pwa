CREATE TABLE `moviesdb`.`genres` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(1024) NULL,
  PRIMARY KEY (`id`));

INSERT INTO genres (name)
VALUES 
('Action'),
('Adventure'),
('Animation'),
('Comedy'),
('Crime'),
('Documentary'),
('Drama'),
('Fantasy'),
('Horror'),
('Music'),
('Mystery'),
('Romance'),
('Sci-Fi'),
('Thriller'),
('War'),
('Western')