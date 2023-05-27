--  CREATE VIEW in_progress_job AS
--  SELECT
-- 	job.id,
--     job.receiver_teller_id,
--     user.username AS receiver_teller_username,
--     job.job_number,
--     job.hand_count,
--     job.time_created
--     FROM job
-- 	LEFT JOIN
-- 		user ON job.receiver_teller_id = user.id
-- 	WHERE job.status = 1;
 
-- CREATE VIEW done_job AS
-- SELECT
-- 	job.id,
-- 	job.receiver_teller_id,
--     receiver_teller.username AS receiver_teller_username,
--     job.confirmer_teller_id,
--     confirmer_teller.username AS confirmer_teller_username,
--     job.job_number,
--     job.hand_count,
--     job.time_created
-- 	FROM job
-- 	LEFT JOIN
-- 		user receiver_teller ON job.receiver_teller_id = receiver_teller.id 
-- 	LEFT JOIN
-- 		user confirmer_teller ON job.confirmer_teller_id = confirmer_teller.id
-- 	WHERE job.status = 2;
    
CREATE VIEW quantity_per_job AS
SELECT
	job_id,
    SUM(quantity) AS total_quantity
    FROM instruction
    
	GROUP BY job_id;
    
CREATE VIEW done_job_summary AS
SELECT
	job.id,
    job.telephone_number,
    job.receiver_teller_id,
    receiver_teller.username AS receiver_teller_username,
    job.confirmer_teller_id,
    confirmer_teller.username AS confirmer_teller_username,
    job.job_number,
    job.time_created,
    job.time_done,
    quantity_per_job.total_quantity AS total_quantity,
    job.description
    FROM job
    LEFT JOIN
		quantity_per_job ON job.id = quantity_per_job.job_id
	LEFT JOIN
		user receiver_teller ON job.receiver_teller_id = receiver_teller.id 
	LEFT JOIN
		user confirmer_teller ON job.confirmer_teller_id = confirmer_teller.id
	WHERE job.status = 2 AND receiver_teller.is_active='Y' AND confirmer_teller.is_active = 'Y'
    ORDER BY job.time_done DESC;
    
CREATE VIEW in_progress_job_summary AS
SELECT
	job.id,
    job.telephone_number,
    job.receiver_teller_id,
    receiver_teller.username AS receiver_teller_username,
    job.job_number,
    job.time_created,
    quantity_per_job.total_quantity AS total_quantity,
    job.description
    FROM job
    LEFT JOIN
		quantity_per_job ON job.id = quantity_per_job.job_id
	LEFT JOIN
		user receiver_teller ON job.receiver_teller_id = receiver_teller.id 
	WHERE job.status = 1 AND receiver_teller.is_active = 'Y';
    
CREATE VIEW quantity_per_format_and_letters AS
SELECT
	instruction.job_id,
    instruction.format_id,
    instruction.letters,
    SUM(instruction.quantity) AS total_quantity
    FROM instruction
    LEFT JOIN 
		format ON instruction.format_id = format.id
	GROUP BY format_id, letters;
    
CREATE VIEW instruction_details AS
SELECT
	instruction.id,
    instruction.job_id,
    instruction.format_id,
    `format`.name AS format_name,
    instruction.letters,
    instruction.item_id,
    item.name AS item_name,
    instruction.colour_id,
    colour.name AS colour_name,
    instruction.position_id,
    position.name AS position_name,
    instruction.quantity,
    instruction.description
FROM instruction
LEFT JOIN
	`format` ON instruction.format_id = format.id
LEFT JOIN
	item ON instruction.item_id = item.id
LEFT JOIN
	colour ON instruction.colour_id = colour.id
LEFT JOIN
	position ON instruction.position_id = position.id;
    
CREATE VIEW format_and_letters AS 
SELECT
	instruction.id,
    instruction.job_id,
    instruction.format_id,
    format.name,
    instruction.letters
    FROM instruction
    LEFT JOIN
		format ON instruction.format_id = format.id
    GROUP BY instruction.format_id, instruction.letters;
    
CREATE VIEW jobs_per_year AS
SELECT
	YEAR(time_created) as year,
	COUNT(*) AS total_jobs
FROM job
GROUP BY year;

CREATE VIEW instructions_per_year AS
SELECT
	YEAR(job.time_created) AS year,
    COUNT(instruction.id) AS total_instructions
FROM instruction
LEFT JOIN job
	ON instruction.job_id = job.id
GROUP BY year;
    
CREATE VIEW jobs_per_month AS
SELECT
	YEAR(time_created) AS year,
	MONTH(time_created) AS month,
    COUNT(*) AS total_jobs
FROM job
GROUP BY year, month;

CREATE VIEW instructions_per_month AS
SELECT
	YEAR(job.time_created) AS year,
	MONTH(job.time_created) AS month,
    COUNT(*) AS total_instructions
FROM instruction
LEFT JOIN job
	ON instruction.job_id = job.id
GROUP BY year, month;

CREATE VIEW items_per_year AS
SELECT 
    YEAR(job.time_created) AS year,
    item.name,
    SUM(instruction.quantity) as quantity
FROM instruction
LEFT JOIN item
	ON instruction.item_id = item.id
LEFT JOIN job
	ON instruction.job_id = job.id
GROUP BY year, item_id;

CREATE VIEW items_per_month AS
SELECT 
    YEAR(job.time_created) AS year,
    MONTH(job.time_created) AS month,
    item.name,
    SUM(instruction.quantity) as quantity
FROM instruction
LEFT JOIN item
	ON instruction.item_id = item.id
LEFT JOIN job
	ON instruction.job_id = job.id
GROUP BY year, month, item_id;

CREATE VIEW formats_per_instruction AS
SELECT
	format.id,
	format.name,
    COUNT(*) as count
FROM instruction
LEFT JOIN format
	ON instruction.format_id = format.id
GROUP BY id;

CREATE VIEW format_per_item AS
SELECT
	instruction.format_id,
	format.name AS format_name,
	instruction.item_id,
    item.name AS item_name,
	COUNT(*) AS count
FROM instruction
LEFT JOIN format
	ON instruction.format_id = format.id
LEFT JOIN item
	ON instruction.item_id = item.id
GROUP BY format_id, item_id;

SELECT
	instruction.format_id,
	format.name AS format_name,
	instruction.item_id,
    item.name AS item_name,
    instruction.position_id,
    position.name AS position_name,
	COUNT(*) AS count
FROM instruction
LEFT JOIN format
	ON instruction.format_id = format.id
LEFT JOIN item
	ON instruction.item_id = item.id
LEFT JOIN position
	ON instruction.position_id = position.id
GROUP BY format_id, item_id, position_id
ORDER BY format_name ASC, item_name ASC, count DESC;

CREATE VIEW years AS
SELECT DISTINCT
	year(time_created) AS year
FROM job;

CREATE VIEW months AS
SELECT DISTINCT
	YEAR(time_created) AS year,
	MONTH(time_created) AS month
FROM job
ORDER BY year ASC, month ASC;

CREATE VIEW days AS
SELECT DISTINCT
	YEAR(time_created) AS year,
	MONTH(time_created) AS month,
    DAY(time_created) AS day
FROM job
ORDER BY year ASC, month ASC, day ASC;

CREATE VIEW jobs_per_day AS
SELECT
	YEAR(time_created) AS year,
	MONTH(time_created) AS month,
	DAY(time_created) AS day,
    job.status,
    COUNT(*) AS jobs
    FROM job
    GROUP BY year, month, day;
    
CREATE VIEW jobs_per_hour AS
SELECT
	YEAR(time_created) AS year,
	MONTH(time_created) AS month,
	DAY(time_created) AS day,
    HOUR(time_created) AS hour,
    job.status,
    COUNT(*) AS jobs
    FROM job
    GROUP BY year, month, day, hour;
    
CREATE VIEW position_per_item AS
SELECT
	instruction.item_id,
	item.name AS item_name,
    instruction.position_id,
    position.name AS position_name,
    COUNT(*) as count
FROM instruction
LEFT JOIN item
	ON instruction.item_id = item.id
LEFT JOIN position
	ON instruction.position_id = position.id
GROUP BY instruction.item_id, instruction.position_id;

CREATE  VIEW instructions_per_year AS
SELECT
	YEAR(job.time_created) as year,
	SUM(quantity) as total_quantity
FROM instruction
LEFT JOIN job
	ON instruction.job_id = job.id
GROUP BY year
ORDER BY year ASC;

CREATE  VIEW instructions_per_month AS
SELECT
	YEAR(job.time_created) AS year,
    MONTH(job.time_created) AS month,
	SUM(quantity) as total_quantity
FROM instruction
LEFT JOIN job
	ON instruction.job_id = job.id
GROUP BY year, month
ORDER BY year ASC, month ASC;

CREATE VIEW instructions_per_day AS
SELECT
	YEAR(job.time_created) AS year,
    MONTH(job.time_created) AS month,
    DAY(job.time_created) AS day,
    status,
	SUM(quantity) as total_quantity
FROM instruction
LEFT JOIN job
	ON instruction.job_id = job.id
GROUP BY year, month, day
ORDER BY year ASC, month ASC, day ASC;

CREATE VIEW instructions_per_hour AS
SELECT
	YEAR(job.time_created) AS year,
    MONTH(job.time_created) AS month,
    DAY(job.time_created) AS day,
    HOUR(job.time_created) AS hour,
    job.status,
	SUM(quantity) as total_quantity
FROM instruction
LEFT JOIN job
	ON instruction.job_id = job.id
GROUP BY year, month, day, hour
ORDER BY year ASC, month ASC, day ASC, hour ASC;

CREATE VIEW in_progress_jobs_count AS
SELECT
	COUNT(*) AS count
	FROM job
	WHERE status = 1;
    
CREATE VIEW in_progress_items_count AS
SELECT
	SUM(instruction.quantity) AS quantity
FROM instruction
LEFT JOIN 
	job ON instruction.job_id = job.id
WHERE job.status = 1;