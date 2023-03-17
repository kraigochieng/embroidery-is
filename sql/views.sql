 CREATE VIEW in_progress_job AS
 SELECT
	job.id,
    job.receiver_teller_id,
    user.username AS receiver_teller_username,
    job.job_number,
    job.hand_count,
    job.time_created
    FROM job
	LEFT JOIN
		user ON job.receiver_teller_id = user.id
	WHERE job.status = 1;
 
CREATE VIEW done_job AS
SELECT
	job.id,
	job.receiver_teller_id,
    receiver_teller.username AS receiver_teller_username,
    job.confirmer_teller_id,
    confirmer_teller.username AS confirmer_teller_username,
    job.job_number,
    job.hand_count,
    job.time_created
	FROM job
	LEFT JOIN
		user receiver_teller ON job.receiver_teller_id = receiver_teller.id 
	LEFT JOIN
		user confirmer_teller ON job.confirmer_teller_id = confirmer_teller.id
	WHERE job.status = 2;