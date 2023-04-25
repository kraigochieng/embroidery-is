import  { getJobNumber } from "./values.js"
import { getUser } from "./values.js"
import { getTelephoneNumber } from "./values.js"
import { getDateTimes } from "./values.js"
import { randomDescription } from "./values.js"
import { createJob } from "./values.js"

import { randomNumber } from "../functions/randomNumber.js"

import { getJobId } from "./values.js"
import { getFormat } from "./values.js"
import { getLetters } from "./values.js"
import { getItem } from "./values.js"
import { getPosition } from "./values.js"
import { getColour } from "./values.js"
import { getQuantity } from "./values.js"
import { createInstruction } from "./values.js"

// Number of jobs
for(let i = 0; i < 130000; i++) {
    let job_number = await getJobNumber()
    let receiver_teller_id = await getUser()
    let confirmer_teller_id = await getUser()
    let telephone_number = await getTelephoneNumber()
    let job_description = await randomDescription()
    let time = await getDateTimes()
    let time_created = time.created
    let time_done = time.done
    
    let created_job = await createJob(telephone_number, receiver_teller_id, confirmer_teller_id, job_number, time_created, time_done, job_description)
    console.log('Created Job: ', created_job)
    
    let job_id = await getJobId(job_number)
    console.log('Job ID: ', job_id)
    
    // Number of format and letters wanted
    for(let j = 0; j < randomNumber(1, 3); j++) {
        let format_id = await getFormat()
        let letters = await getLetters()
        // Number of instructions
        for(let k = 0; k < randomNumber(1, 5); k++) {
            let item_id = await getItem()
            let position_id = await getPosition(item_id)
            let colour_id = await getColour()
            let quantity = await getQuantity()
            let description = await randomDescription()
            let instruction = await createInstruction(job_id, format_id, letters, item_id, colour_id, position_id, quantity, description)
            console.log('New Instruction: ', instruction)
        }
    }
}







