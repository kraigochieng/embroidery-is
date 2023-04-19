export function createInstructionStatement(job) {
    let full_statement = '';
    let instruction_batch = job.instruction_batch;
    
    let insert_into_clause = '';
    insert_into_clause =  `INSERT INTO instruction(job_id, format_id, letters, item_id, position_id, colour_id, quantity, description) VALUES`;
    // For different Format and names
    for(let i = 0; i < instruction_batch.length; i++) {
        // For Differents instructions
        let instructions = instruction_batch[i].instructions;
        for(let j = 0; j < instructions.length; j++) {
            let format = instruction_batch[i].format;
            let letters = instruction_batch[i].letters;
            let item_id = instructions[j].item_id;
            let position_id = instructions[j].position_id;
            let colour_id = instructions[j].colour_id;
            let quantity = instructions[j].quantity;
            let description = instructions[j].description;
            // console.log(description);

            let values_clause = '';

            if(j === instructions.length - 1  && i === instruction_batch.length - 1) {
                // To add comma
                values_clause = `(job_id_to_be_replaced,"${format}", "${letters}", "${item_id}", "${position_id}", "${colour_id}", "${quantity}", "${description}");`;
                console.log()
            } else {
                // To add semicolon
                values_clause = `(job_id_to_be_replaced,"${format}", "${letters}", "${item_id}", "${position_id}", "${colour_id}", "${quantity}", "${description}"),`; 
            }
            
            insert_into_clause += values_clause;
        }
    }

    return insert_into_clause;
}