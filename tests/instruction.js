// import { randomNumber } from "../functions/randomNumber.js";
// import { names } from "../functions/names.js";
// import { randomDescription } from "./job.js";
// import { initials } from "../functions/initials.js";

// export async function getFormat() {
//     let response = await fetch('../db/format.php')
//     let formats = await response.json()
//     return formats[randomNumber(0, formats.length - 1)].id
// }

// export async function getLetters() {
//     let variation = randomNumber(1,12)

//     let nameOne = names[0, randomNumber(0, names.length - 1)]
//     let nameTwo = names[0, randomNumber(0, names.length - 1)]
//     let initial = initials[0, randomNumber(0, initials.length - 1)]
//     let admission_number = randomNumber(1000,9999)

//     switch(variation) {
//         case 1:
//             return admission_number
//         case 2:
//             return admission_number + " " +  nameOne
//         case 3:
//             return admission_number + " " +  nameOne + " " + initial
//         case 4:
//             return admission_number + " " +  nameOne + " " + nameTwo
//         case 5:
//             return admission_number + " " +  initial + " " + nameOne
//         case 6:
//             return nameOne
//         case 7:
//             return nameOne + " " + nameTwo
//         case 8:
//             return nameOne + " " + nameTwo + " " + admission_number
//         case 9:
//             return nameOne + " " + admission_number
//         case 10:
//             return nameOne + " " + initial
//         case 11:
//             return nameOne + " " + initial + " " + nameTwo
//         case 12:
//             return nameOne + " " + initial + " " + admission_number
//         case 13:
//             return initial + " " + nameOne
//         case 14:
//             return initial + " " + nameOne + " " + admission_number
//         }
// }

// export async function getItem() {
//     let response = await fetch('../db/item.php')
//     let items = await response.json()
//     return items[randomNumber(0, items.length - 1)].id
// }

// export async function getPosition(item_id) {
//     // Position
//     let positionData = new FormData()
//     positionData.append('item_id', item_id)

//     let settings = {
//         method: 'POST',
//         body: positionData
//     }

//     let response = await fetch('../db/position.php', settings)
//     let positions = await response.json()
//     return positions[0, randomNumber(0, positions.length - 1)].id
// }

// export async function getColour() {
//     let response = await fetch('../db/colour.php')
//     let colours = await response.json()
//     return colours[randomNumber(0, colours.length - 1)].id
// }

// export async function getQuantity() {
//     return randomNumber(0, 30)
// }

// let format_id = await getFormat()
// console.log('Format ID: ', format_id)

// let letters = await getLetters()
// console.log('Letters: ', letters)

// let item_id = await getItem()
// console.log('Item ID: ', item_id)

// let position_id = await getPosition(item_id)
// console.log('Position ID: ', position_id)

// let colour_id = await getColour()
// console.log('Colour ID: ', colour_id)

// let quantity = await getQuantity()
// console.log('Quantity: ', quantity)

// let description = await randomDescription()
// console.log('Description: ', description)



