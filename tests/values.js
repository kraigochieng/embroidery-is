import { randomNumber } from "../functions/randomNumber.js";
import { names } from "../functions/names.js";
import { initials } from "../functions/initials.js";
import { alphabet } from "../functions/alphabet.js";
export async function getTelephoneNumber() {
    return `07${randomNumber(11111111,99999999)}`
}

export async function getUser() {
    let response = await fetch('../db/read_users.php')
    let users = await response.json()
    return users[randomNumber(0, users.length - 1)].id
}

export async function getJobNumber() {
    return randomNumber(1000000,9999999)
}

let padding = (number) => {
    return number < 10 ? `0${number}` : number
}

export async function getDateTimes() {
    let year = randomNumber(2010,2022)
    let month = padding(randomNumber(1, 4))
    let day = padding(randomNumber(1, 28))
    let created_hour = randomNumber(6, 19)
    let done_hour = padding(created_hour + 1)
    created_hour = padding(created_hour)
    let created_minute = padding(randomNumber(0, 59))
    let done_minute = padding(randomNumber(0, 59))
    let second = '00'
    
    let time_created = `${year}-${month}-${day} ${created_hour}:${created_minute}:${second}`
    let time_done = `${year}-${month}-${day} ${done_hour}:${done_minute}:${second}`

    return {
        created: time_created,
        done: time_done
    }
}

export async function getFormat() {
    let response = await fetch('../db/format.php')
    let formats = await response.json()
    return formats[randomNumber(0, formats.length - 1)].id
}

export async function getLetters() {
    let variation = randomNumber(1,12)

    let nameOne = names[0, randomNumber(0, names.length - 1)]
    let nameTwo = names[0, randomNumber(0, names.length - 1)]
    let initial = initials[0, randomNumber(0, initials.length - 1)]
    let admission_number = randomNumber(1000,9999)

    switch(variation) {
        case 1:
            return admission_number
        case 2:
            return admission_number + " " +  nameOne
        case 3:
            return admission_number + " " +  nameOne + " " + initial
        case 4:
            return admission_number + " " +  nameOne + " " + nameTwo
        case 5:
            return admission_number + " " +  initial + " " + nameOne
        case 6:
            return nameOne
        case 7:
            return nameOne + " " + nameTwo
        case 8:
            return nameOne + " " + nameTwo + " " + admission_number
        case 9:
            return nameOne + " " + admission_number
        case 10:
            return nameOne + " " + initial
        case 11:
            return nameOne + " " + initial + " " + nameTwo
        case 12:
            return nameOne + " " + initial + " " + admission_number
        case 13:
            return initial + " " + nameOne
        case 14:
            return initial + " " + nameOne + " " + admission_number
        }
}

export async function getItem() {
    let response = await fetch('../db/item.php')
    let items = await response.json()
    return items[randomNumber(0, items.length - 1)].id
}

export async function getPosition(item_id) {
    // Position
    let positionData = new FormData()
    positionData.append('item_id', item_id)

    let settings = {
        method: 'POST',
        body: positionData
    }

    let response = await fetch('../db/position.php', settings)
    let positions = await response.json()
    return positions[0, randomNumber(0, positions.length - 1)].id
}

export async function getColour() {
    let response = await fetch('../db/colour.php')
    let colours = await response.json()
    return colours[randomNumber(0, colours.length - 1)].id
}

export async function getQuantity() {
    return randomNumber(1, 30)
}

export async function randomDescription() {
    let word_length = randomNumber(0, 10)
    let description = ""
    for(let i = 0; i < word_length; i++) {
        description += alphabet[randomNumber(0,25)]
    }
    return description
}

export async function createJob(telephone_number, receiver_teller_id, confirmer_teller_id, job_number, time_created, time_done, description) {
    let jobData = new FormData();
    jobData.append('telephone_number', telephone_number)
    jobData.append('receiver_teller_id', receiver_teller_id)
    jobData.append('confirmer_teller_id', confirmer_teller_id)
    jobData.append('job_number', job_number)
    jobData.append('time_created', time_created)
    jobData.append('time_done', time_done)
    jobData.append('description', description)

    let settings = {
        method: 'POST',
        body: jobData
    }
    
    let response = await fetch('../db/test_create_job.php', settings)
    let job = await response.json()
    return job
}

export async function getJobId(job_number) {
    let body = new FormData()
    body.set('job_number', job_number)
    let settings = {
        method: 'POST',
        body: body
    }

    let response = await fetch('../db/read_job_id.php', settings)
    let job = await response.json()
    return job.id
}

export async function createInstruction(job_id, format_id, letters, item_id, colour_id, position_id, quantity, description) {
    let body = new FormData()
    body.append('job_id', job_id)
    body.append('format_id', format_id)
    body.append('letters', letters)
    body.append('item_id', item_id)
    body.append('colour_id', colour_id)
    body.append('position_id', position_id)
    body.append('quantity', quantity)
    body.append('description', description)

    let settings = {
        method: 'POST',
        body: body
    }

    let response = await fetch('../db/test_create_instruction.php', settings)
    let instruction = response.json()
    return instruction
}
