CREATE TABLE IF NOT EXISTS actual_item (
	id INT AUTO_INCREMENT,
    name VARCHAR(50),
    CONSTRAINT actual_item_pk PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS actual_position (
	id INT AUTO_INCREMENT,
    item_id INT,
    name VARCHAR(50),
    CONSTRAINT actual_position_pk PRIMARY KEY(id),
    CONSTRAINT actual_position_fk_item FOREIGN KEY (item_id) REFERENCES actual_item(id) ON DELETE NO ACTION
);