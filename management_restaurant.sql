-- CREATE DATABASE
CREATE DATABASE restaurant_management;
use restaurant_management;

CREATE TABLE restaurant (
	res_id INT PRIMARY KEY AUTO_INCREMENT,
	res_name VARCHAR(255),
	Image VARCHAR(255),
	`desc` VARCHAR(255)
)

CREATE TABLE user (
	user_id INT PRIMARY KEY AUTO_INCREMENT,
	full_name VARCHAR(255),
	email VARCHAR(255),
	passowrd VARCHAR(255)
);

CREATE TABLE rate_res (
	user_id INT,
	res_id INT,
	amount INT,
	date_rate DATETIME,
	PRIMARY KEY(user_id, res_id),
	FOREIGN KEY (user_id) REFERENCES `user` (user_id),
	FOREIGN KEY (res_id) REFERENCES restaurant (res_id)
);

CREATE TABLE like_res (
	user_id INT,
	res_id INT,
	date_like DATETIME,
	PRIMARY KEY(user_id, res_id),
	FOREIGN KEY (user_id) REFERENCES `user` (user_id),
	FOREIGN KEY (res_id) REFERENCES restaurant (res_id)
);

CREATE TABLE food_type (
	type_id INT PRIMARY KEY AUTO_INCREMENT,
	type_name VARCHAR(255)
);

CREATE TABLE food (
	food_id INT PRIMARY KEY AUTO_INCREMENT,
	food_name VARCHAR(255),
	image VARCHAR(255),
	price FLOAT,
	`desc` VARCHAR(255),
	type_id INT,
	FOREIGN KEY (type_id) REFERENCES food_type (type_id)
);

CREATE TABLE `order` (
	user_id INT,
	food_id INT,
	amount INT,
	code VARCHAR(255),
	arr_sub_id VARCHAR(255),
	PRIMARY KEY(user_id, food_id),
	FOREIGN KEY (user_id) REFERENCES `user` (user_id),
	FOREIGN KEY (food_id) REFERENCES food (food_id)
);

ALTER TABLE `order` DROP PRIMARY KEY, ADD PRIMARY KEY(user_id, food_id, code);

CREATE TABLE sub_food (
	sub_id INT PRIMARY KEY AUTO_INCREMENT,
	sub_name VARCHAR(255),
	sub_price FLOAT,
	food_id INT,
	FOREIGN KEY (food_id) REFERENCES food(food_id)
);

-- INSERT DATA
INSERT INTO restaurant (res_name, Image, `desc`)
VALUES
("RES A", "https://picsum.photos/id/1/200/300", "desc a"),
("RES B", "https://picsum.photos/id/2/200/300", "desc b"),
("RES C", "https://picsum.photos/id/3/200/300", "desc c");

INSERT INTO user (full_name, email, passowrd)
VALUES
("User A", "a@gmail.com", "123456a"),
("User B", "b@gmail.com", "123456b"),
("User C", "c@gmail.com", "123456c"),
("User D", "d@gmail.com", "123456c"),
("User E", "e@gmail.com", "123456c"),
("User F", "f@gmail.com", "123456c");

INSERT INTO like_res (user_id, res_id, date_like)
VALUES
(1, 1, "2022-12-12 12:13:14"),
(1, 2, "2022-12-12 12:13:14"),
(1, 3, "2022-12-12 12:13:14"),
(2, 1, "2022-12-12 12:13:14"),
(2, 2, "2022-12-12 12:13:14"),
(2, 3, "2022-12-12 12:13:14"),
(3, 1, "2022-12-12 12:13:14"),
(3, 2, "2022-12-12 12:13:14"),
(4, 3, "2022-12-12 12:13:14"),
(4, 1, "2022-12-12 12:13:14"),
(5, 2, "2022-12-12 12:13:14");

INSERT INTO rate_res (user_id, res_id, amount, date_rate)
VALUES
(1, 1, 4, "2022-12-12 12:13:14"),
(1, 2, 5, "2022-12-12 12:13:14"),
(1, 3, 4, "2022-12-12 12:13:14"),
(2, 1, 5, "2022-12-12 12:13:14"),
(2, 2, 3, "2022-12-12 12:13:14"),
(2, 3, 2, "2022-12-12 12:13:14");

INSERT INTO food_type (type_name)
VALUES
("Món chiên"),
("Món nướng");

INSERT INTO food (food_name, image, price, `desc`, type_id)
VALUES
("Dê nướng", "https://picsum.photos/id/11/200/300", 100000, "Desc dê nướng", 2),
("Gà chiên", "https://picsum.photos/id/12/200/300", 60000, "Desc gà chiên", 1);

INSERT into sub_food (sub_name, sub_price, food_id)
VALUES
("Bia", 15000, 1),
("Khoai tây chiên", 20000, 2),
("Pepsi", 15000, 2);

INSERT INTO `order` (user_id, food_id, amount, code, arr_sub_id)
VALUES
(1,2,1, "code 1", "2,3"),
(1,1,2, "code 2", "1"),
(2,2,1, "code 3", "");

-- CÂU 1
SELECT `user`.*, COUNT(res_id) as count_like
FROM user
INNER JOIN like_res
ON `user`.user_id = like_res.user_id
GROUP BY `user`.user_id
ORDER BY count_like DESC
LIMIT 5;

-- CÂU 2
SELECT restaurant.*, COUNT(user_id) as count_like
FROM restaurant
INNER JOIN like_res
ON restaurant.res_id = like_res.res_id
GROUP BY restaurant.res_id
ORDER BY count_like DESC
LIMIT 2;

-- CÂU 3
SELECT `user`.*, SUM(amount) as sum_amount
FROM `user`
INNER JOIN `order`
ON `user`.user_id = `order`.user_id
GROUP BY `user`.user_id
ORDER BY sum_amount DESC
LIMIT 1;

-- CÂU 4
SELECT `user`.*, COUNT(`order`.food_id) as count_order, COUNT(like_res.res_id) as count_like, COUNT(rate_res.res_id) as count_rate
FROM `user`
LEFT JOIN `order` ON `user`.user_id = `order`.user_id
LEFT JOIN rate_res on `user`.user_id = rate_res.user_id
LEFT JOIN like_res on `user`.user_id = like_res.user_id
GROUP BY user_id
HAVING count_order = 0 AND count_like = 0 AND count_rate = 0; 

-- CÂU 5
SELECT food.*, AVG(sub_price) as avg_sub_food
FROM food
LEFT JOIN sub_food
on food.food_id = sub_food.food_id
GROUP BY (food.food_id);