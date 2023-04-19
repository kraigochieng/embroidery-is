export function createJobStatement(receiver_teller_id, job_number, telephone_number, description) {
    // Add Job Number
    let statement = `INSERT INTO job(receiver_teller_id, job_number, telephone_number, description, status) VALUES("${receiver_teller_id}", "${job_number}", "${telephone_number}", "${description}","1")`;
    
    return statement;
}