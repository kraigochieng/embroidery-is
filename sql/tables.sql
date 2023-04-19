USE embroidery;

CREATE TABLE IF NOT EXISTS user (
	id INT AUTO_INCREMENT NOT NULL,
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    username VARCHAR(50),
    password VARCHAR(255),
    role_id INT,
    CONSTRAINT user_pk PRIMARY KEY(id),
    CONSTRAINT user_fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS role (
	id INT AUTO_INCREMENT,
    name VARCHAR(20),
    CONSTRAINT role_pk PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS colour (
	id INT AUTO_INCREMENT,
    name VARCHAR(50),
    CONSTRAINT colour_pk PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS item (
	id INT AUTO_INCREMENT,
    name VARCHAR(50),
    CONSTRAINT item_pk PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS position (
	id INT AUTO_INCREMENT,
    item_id INT,
    name VARCHAR(50),
    CONSTRAINT position_pk PRIMARY KEY(id),
    CONSTRAINT position_fk_item FOREIGN KEY (item_id) REFERENCES item(id) ON DELETE NO ACTION
);


CREATE TABLE IF NOT EXISTS job (
	id INT AUTO_INCREMENT,
    receiver_teller_id INT,
    confirmer_teller_id INT,
    job_number INT,
    hand_count INT,
    time_created DATETIME DEFAULT NOW(),
    `status` ENUM('In Progress', 'Done'),
    CONSTRAINT job_pk PRIMARY KEY(id),
    CONSTRAINT job_fk_receiver_teller FOREIGN KEY (receiver_teller_id) REFERENCES user(id) ON DELETE NO ACTION,
    CONSTRAINT job_fk_confirmer_teller FOREIGN KEY (confirmer_teller_id) REFERENCES user(id) ON DELETE NO ACTION
);


CREATE TABLE IF NOT EXISTS instruction (
	id INT AUTO_INCREMENT,
	job_id INT,
    format_id INT,
    letters VARCHAR(255),
	item_id INT,
    colour_id INT,
    position_id INT,   
    quantity INT,
    description VARCHAR(100),
    CONSTRAINT order_pk PRIMARY KEY(id),
    CONSTRAINT order_fk_job FOREIGN KEY (job_id) REFERENCES job(id) ON DELETE NO ACTION,
    CONSTRAINT order_fk_format FOREIGN KEY (format_id) REFERENCES `format`(id) ON DELETE NO ACTION,
    CONSTRAINT order_fk_item FOREIGN KEY (item_id) REFERENCES item(id) ON DELETE NO ACTION,
    CONSTRAINT order_fk_colour FOREIGN KEY (colour_id) REFERENCES colour(id) ON DELETE NO ACTION,
    CONSTRAINT order_fk_position FOREIGN KEY (position_id) REFERENCES `position`(id) ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS `format` (
	id INT AUTO_INCREMENT,
    name VARCHAR(50),
    CONSTRAINT format_pk PRIMARY KEY(id)
);

CREATE TABLE user_log (
	id INT AUTO_INCREMENT,
    user_id INT,
    login_time DATETIME,
    logout_time DATETIME,
    CONSTRAINT user_log_pk PRIMARY KEY(id),
    CONSTRAINT user_log_fk_user FOREIGN KEY(user_id) REFERENCES user(id) ON DELETE SET NULL
);