// Global Variables
let instruction = {
    index: '', // index of tomat and name
    item: {
        id: '',
        name: '',
    },

    description: '',

    position: {
        id: '',
        name: '',
    },

    colour: {
        id: '',
        name: '',
    },

    quantity: '',
}

// Components
import { positionComponent } from "../components/position.js";
import { colourComponent } from "../components/colour.js";

import { formatAndLettersComponent } from "../components/formatAndLetters.js";
import { itemComponent } from "../components/item.js";
import { instructionRowComponent } from "../components/instructionRow.js";
import { instructionTableComponent } from "../components/instructionTable.js";
import { instructionTableValidationComponent } from "../components/instructionTableValidation.js";

// Functions
import { isInputBlank } from "../functions/isInputBlank.js";
import { isContainerBlank } from "../functions/isContainerBlank.js";
import { containsNotNumbers } from "../functions/containsNotNumbers.js";
import { areInputsBlank } from "../functions/areInputsBlank.js";
import { areContainersBlank } from "../functions/areContainersBlank.js";
import { createJobStatement } from "../functions/createJobStatement.js";
import { createInstructionStatement } from "../functions/createInstructionStatement.js";
import { getUrlParam } from "../functions/getUrlParam.js";

async function getUserId() {
    let back_to_home = document.querySelector('#back-to-home');

    // const urlParams = new URLSearchParams(window.location.search);
    // const user_id = urlParams.get('user_id');

    const user_id = getUrlParam('user_id')
    back_to_home.addEventListener('click', function(){
        window.location.assign(`../index.html?user_id=${user_id}`);
    })
}

function jobNumberValidation(element, validation) {
    let regex = /[^0-9]/;
    
    if(regex.test(element.value)) {
        element.classList.add('invalid-input')
        validation.textContent = '* Only Include Numbers';
    } else if(element.value === ''){
        element.classList.add('invalid-input')
        validation.textContent = '* Empty';
    } else {
        element.classList.remove('invalid-input')
        validation.textContent = '';
    }
}

async function jobNumberInputValidation() {
    let job_number = document.querySelector('#job-number');
    let job_number_validation = document.querySelector('#job-number-validation')
    
    job_number.addEventListener('input', function(){
        jobNumberValidation(job_number, job_number_validation);
    })
}

function telephoneNumberValidation(element, validation) {
    const phoneNumberRegex = /^(?:\+254|0)[17]\d{8}$/;

    if (phoneNumberRegex.test(element.value)) {
        element.classList.remove('invalid-input')
        validation.textContent = ''
    } else {
        element.classList.add('invalid-input')
        validation.textContent = 'Invalid Phone Number'
    }
    
}

async function telephoneNumberInputValidation() {
    let telephone_number = document.querySelector('#telephone-number');
    let telephone_number_validation = document.querySelector('#telephone-number-validation')
    
    telephone_number.addEventListener('input', function(){
        telephoneNumberValidation(telephone_number, telephone_number_validation);
    })
}

async function addFormatAndName() {
    let format_and_name_choices = document.querySelector('#format-and-name-choices');
    let add_format_and_name = document.querySelector('#add-format-and-name');
    let format_and_name_choice_validation = document.querySelector('#format-and-name-choice-validation')
    let selected_instructions_container_validation = document.querySelector('#selected-instructions-container-validation');
    add_format_and_name.addEventListener('click', function(){
        format_and_name_choices.removeAttribute('class');
        let format_and_name = formatAndLettersComponent();
        format_and_name_choice_validation.textContent = '';
        selected_instructions_container_validation.textContent = '';
        // Add to DOM
        format_and_name_choices.appendChild(format_and_name);
        
        // Add Format
        addSelectedInstructionContainer();
        // Remove Format
        removeSelectedInstructionContainer();
        // Select Format
        chooseFormatAndName();
        // Select First Format
        selectFormatFirst();
    })
}

    function addSelectedInstructionContainer() {
        // Select DOM
        let selected_instructions_container = document.querySelector('#selected-instructions-container');
        let instruction_table_validation = instructionTableValidationComponent();
        // Create Component
        let instruction_table = instructionTableComponent();
        // Show Instructions Section
        let instructions_section = document.querySelector('#instructions-section')
        instructions_section.style.display = 'block'
        // Show Selected Instructions Section
        let selected_instructions_section = document.querySelector('#selected-instructions-section')
        selected_instructions_section.style.display = 'block'
        // Show Add Job
        let add_job = document.querySelector('#add-job')
        add_job.style.display = 'block'
        // Append DOM
        selected_instructions_container.appendChild(instruction_table);
        selected_instructions_container.appendChild(instruction_table_validation);
    }

    function removeSelectedInstructionContainer() {
        let format_and_name_choices = document.querySelector('#format-and-name-choices');
        
        let delete_format_buttons = document.querySelectorAll('.delete-format-button')

        let instruction_tables = document.querySelectorAll('.instruction-table');
        let instruction_table_validation = document.querySelectorAll('.instruction-table-validation');
        for(let i = 0; i < delete_format_buttons.length; i++) {
            delete_format_buttons[i].addEventListener('click', function(){
                // if(delete_format_buttons.length == 1) {
                //     format_and_name_choices.className = 'empty-format-container'
                //     // Hide Instruction Form
                //     let instructions_section = document.querySelector('#instructions-section')
                //     instructions_section.style.display = 'none'            
                // }
                instruction_tables[i].remove();
                instruction_table_validation[i].remove();
            })
        }
    }

    function chooseFormatAndName() {
        // Select DOM
        let format_and_name_choice = document.querySelectorAll('.format-and-name-choice')
        let instruction_table = document.querySelectorAll('.instruction-table');
        // Loop through all format and names
        for(let i = 0; i < format_and_name_choice.length; i++) {
            format_and_name_choice[i].addEventListener('click', function(){
                // Set Classes
                format_and_name_choice[i].setAttribute('class', 'format-and-name-choice selected');
                instruction_table[i].setAttribute('class', 'instruction-table selected');
                // Set Object
                instruction.index = i;
                // Remove class
                for(let j = 0; j < format_and_name_choice.length; j++) {
                    if(i === j) {
                        // Do nothing since attribute was changed above
                    } else {
                        instruction_table[j].setAttribute('class', 'instruction-table')
                        format_and_name_choice[j].setAttribute('class', 'format-and-name-choice');
                    }
                }
            })
        }
    }

    function selectFormatFirst() {
        // Select DOM
        let format_and_name_choice = document.querySelectorAll('.format-and-name-choice');
        let instruction_table = document.querySelectorAll('.instruction-table');
        // Set Initial Choice
        instruction.index = 0;
        // Condition On Length
        if(format_and_name_choice.length === 1) {
            // Set Attribute
            format_and_name_choice[0].setAttribute('class', 'format-and-name-choice selected');
            instruction_table[0].setAttribute('class', 'instruction-table selected');
        }
    }

async function fetchItems() {
    let item_section = document.querySelector('#item-section');
    let select = itemComponent();
    item_section.appendChild(select);
}

async function addItemtoInstruction() {
    let item_select = document.querySelector('#item-select');

    item_select.addEventListener('change', function(){
        // Validation
        let item_validation = document.querySelector('#item-validation');
        item_validation.textContent = '';
        // Selected Item
        let item_id = item_select.options[item_select.selectedIndex].value;
        let item_name = item_select.options[item_select.selectedIndex].textContent;
        // Add item to instruction
        instruction.item.id = item_id;
        instruction.item.name = item_name;
    })
}

async function fetchPositions() {
    let position_section = document.querySelector('#position-section');
    let item_select = document.querySelector('#item-select');

    // Positions are determined by the item chosen
    item_select.addEventListener('change', function(){
        // Selected Item
        let item_id = instruction.item.id;
        let item_name = instruction.item.name;
        // Clear Position Section
        position_section.setAttribute('class', '');
        position_section.innerHTML = "";
        // Create Form Object
        const positionData = new FormData();
        positionData.append('item_id', item_id);
        // Get Data
        fetch('../db/position.php', {
        method: 'POST',
        body: positionData,
        })
            .then(response => response.json())
            .then(positions => {
                for(let i = 0; i < positions.length; i++) {
                    // Create Element
                    let position = positionComponent(positions[i].id, item_name, positions[i].name);

                    position.label.addEventListener('click', function(){
                        // console.log(position.label);
                        // Clear Validation
                        let item_validation = document.querySelector('#item-validation');
                        let position_validation = document.querySelector('#position-validation');
                        item_validation.textContent = '';
                        position_validation.textContent = '';
                        // Add To Object
                        instruction.position.id = this.id;
                        instruction.position.name = this.textContent;
                        // console.log(instruction.position);
                    })
                    // Append
                    position_section.appendChild(position.input);
                    position_section.appendChild(position.label);
                }
            })
    })
}

async function fetchColours() {
    let colour_section = document.querySelector('#colour-section');
    let select = colourComponent();
    colour_section.appendChild(select);
}

async function addColourToInstruction() {
    // Select DOM
    let colour_select = document.querySelector('#colour-select');
    // Add Event
    colour_select.addEventListener('change', function(){
        // Clear Validation
        let colour_validation = document.querySelector('#colour-validation');
        colour_validation.textContent = '';
        // Get data from select element
        let colour_id = colour_select.options[colour_select.selectedIndex].value;
        let colour_name = colour_select.options[colour_select.selectedIndex].textContent;
        // Add to Object
        instruction.colour.id = colour_id;
        instruction.colour.name = colour_name;
    })
}

async function quantityValidation() {
    let quantity = document.querySelector('#instruction-quantity') 
    let quantity_validation = document.querySelector('#quantity-validation');

    let regex = /[^0-9]/;
    quantity.addEventListener('input', function(){
        if(regex.test(quantity.value)) {
            quantity_validation.textContent = '* Only Include Numbers';
        } else if(quantity.value === ''){
            quantity_validation.textContent = '* Empty';
        } else {
            quantity_validation.textContent = '';
            // Add to Object
            instruction.quantity = this.value;
        }
    })
}

async function addInstruction() {
    // Selet DOM
    let add_instruction = document.querySelector('#add-instruction');
    add_instruction.addEventListener('click', function(){
        //Do Validation
        instructionValidation();
        // Select DOM
        let item_validation = document.querySelector('#item-validation');
        let position_validation = document.querySelector('#position-validation');
        let colour_validation = document.querySelector('#colour-validation');
        let quantity_validation = document.querySelector('#quantity-validation');
        if(
            item_validation.textContent === '' &&
            position_validation.textContent === '' &&
            colour_validation.textContent === '' &&
            quantity_validation.textContent === ''
        ) {
            // Clear Validation
            let instruction_table_body = document.querySelectorAll('.instruction-table-body');
            let instruction_table_validation = document.querySelectorAll('.instruction-table-validation');
            instruction_table_validation[instruction.index].textContent = '';
            // Create Element
            let instruction_row = instructionRowComponent(instruction.index, instruction.item, instruction.position, instruction.colour, instruction.quantity);
            // Clear
            instruction_table_body[instruction.index].setAttribute('class', 'instruction-table-body');
            // Append to table
            instruction_table_body[instruction.index].appendChild(instruction_row.row);
            // Reset All Fields
            resetInstructionFields();
        }
        
        
    })
}

function instructionValidation() {
    let format_and_name_choice = document.querySelector('#format-and-name-choices');
    let format_and_name_choice_validation = document.querySelector('#format-and-name-choice-validation');

    let item_select = document.querySelector('#item-select');
    let item_validation = document.querySelector('#item-validation');

    let position_section = document.querySelector('#position-section');
    let position_validation = document.querySelector('#position-validation');
    let colour_select = document.querySelector('#colour-select');
    let colour_validation = document.querySelector('#colour-validation');

    let quantity = document.querySelector('#instruction-quantity');
    let quantity_validation = document.querySelector('#quantity-validation');
    
    if(format_and_name_choice.length === 0) {
        format_and_name_choice_validation.textContent = '* Empty';
    }

    if(item_select.value === '') {
        item_validation.textContent = '* Empty';
    }

    if(colour_select.value === '') {
        colour_validation.textContent = '* Empty';
    }

    if(quantity.value === '') {
        quantity_validation.textContent = '* Empty';
    }

    if(instruction.position.id === '') {
        position_validation.textContent = '* Empty';
    }

}

function resetInstructionFields() {
    let item_select = document.querySelector('#item-select');
    let position_section = document.querySelector('#position-section');
    let colour_select = document.querySelector('#colour-select');
    let quantity = document.querySelector('#instruction-quantity');

    // Clear Elements
    item_select.value = "";
    position_section.setAttribute('class', 'empty-position-container');
    position_section.innerHTML = "";
    colour_select.value = "";
    quantity.value = "";

    // Clear Object
    instruction.item.id = '';
    instruction.item.name = '';
    instruction.colour.id = '';
    instruction.colour.name = '';
    instruction.position.id = '';
    instruction.position.name = '';
    instruction.quantity = '';

}

// Validation
function addToJobObject() {
    let job_number = document.querySelector('#job-number');
    let telephone_number = document.querySelector('#telephone-number');
    let job_description = document.querySelector('#job-description');

    let job = {
        number: job_number.value,
        telephone_number: telephone_number.value,
        description: job_description.value,
        // Format, Name and its Instructions
        instruction_batch: [],
    };

    let format_and_name_choices = document.querySelectorAll('.format-and-name-choice');
    // All tables
    let instruction_table = document.querySelectorAll('.instruction-table-body');
    
    // Each different format
    for(let i = 0; i < format_and_name_choices.length; i++) {
        let format = format_and_name_choices[i].childNodes[0].childNodes[0];
        let letters = format_and_name_choices[i].childNodes[1].childNodes[0]

        //All Rows for each table, this means for each format
        let instruction_rows = instruction_table[i].childNodes;
        let instructions = [];
        // Each Row, for each format,  to get all instructions for a certain fo
        for(let j = 0; j < instruction_rows.length; j++) {
            
            // Specific Instruction
            let instruction = {
                item_id: instruction_rows[j].childNodes[0].id,
                position_id: instruction_rows[j].childNodes[1].id,
                colour_id: instruction_rows[j].childNodes[2].id,
                quantity: instruction_rows[j].childNodes[3].textContent,
                description: instruction_rows[j].childNodes[4].childNodes[0].value,
            }

            console.log(instruction)
            // console.log(instruction.description);
            // Add all instructions for specific format
            instructions.push(instruction);
        }
        // Add Order
        job.instruction_batch.push({
            format: format.value,
            letters: letters.value,
            instructions: instructions,
        })
    }
    // Get User ID
    const urlParams = new URLSearchParams(window.location.search);
    const user_id = urlParams.get('user_id');
    // Create Job Statement
    let new_job = createJobStatement(user_id, job.number);
    let new_instructions = createInstructionStatement(job);
    console.log(new_job);
    console.log(new_instructions);
    let jobData = new FormData();
    jobData.append('job_number', job.number);
    jobData.append('job_statement', createJobStatement(user_id, job.number, job.telephone_number, job.description));
    jobData.append('instruction_statement', createInstructionStatement(job));

    fetch('../db/create_job.php', {
        method: 'POST',
        body: jobData,
    })
        .then(response => response.text())
        .then(job => console.log(job))
        .catch(error => console.log(error));

    // Go Back To Index Page 
    window.location.assign(`../index.html?user_id=${user_id}`);
}

async function addJob(){
    let add_job = document.querySelector('#add-job');
    
    // Validation
    add_job.addEventListener('click', async function(){
        // They have to be selected on the event so that they can be refreshed
        let job_number = document.querySelector('#job-number');
        let telephone_number = document.querySelector('#telephone-number')
        let formats = document.querySelectorAll('.format-select');
        let letters = document.querySelectorAll('.letters');
        let selected_instructions_container = document.querySelector('#selected-instructions-container');
        let instruction_table_body = document.querySelectorAll('.instruction-table-body');
        let format_and_name_choices = document.querySelector('#format-and-name-choices');

        let job_number_validation = document.querySelector('#job-number-validation')
        let telephone_number_validation = document.querySelector('#telephone-number-validation')
        let format_and_name_choice_validation = document.querySelector('#format-and-name-choice-validation');    
        let format_validation = document.querySelectorAll('.format-validation');
        let letters_validation = document.querySelectorAll('.letters-validation');
        let selected_instructions_container_validation = document.querySelector('#selected-instructions-container-validation');
        let instruction_table_validation = document.querySelectorAll('.instruction-table-validation');

        //// Validation
        // Invalid job Number
        containsNotNumbers(job_number, job_number_validation);
        isInputBlank(job_number, job_number_validation);
        // Telephone Number
        isInputBlank(telephone_number, telephone_number_validation)
        // Check Whole Format And Name container
        isContainerBlank(format_and_name_choices, format_and_name_choice_validation, 'Choose A Format and Name');
        // For formats
        areInputsBlank(formats, format_validation);
        // For Letters
        areInputsBlank(letters, letters_validation);
        // Check The whole container
        isContainerBlank(selected_instructions_container, selected_instructions_container_validation);
        // Check individual tables
        areContainersBlank(instruction_table_body, instruction_table_validation, '* Add An Instruction');

        //// To send object
        // Job Number

        let isJobValid = false;
        if(job_number_validation.textContent === '') {
            // console.log('Job Number');
            // Format And Name Container
            if(format_and_name_choice_validation.textContent === '') {
                // console.log('Format And Name');
                // Format And Name Individually
                for(let i = 0; i < format_and_name_choices.childElementCount; i++) {
                    // console.log('Format And Name Individual');
                    if(format_validation[i].textContent === '' || letters_validation[i].textContent === '') {
                        // Table As A Whole
                        // console.log('Table');
                        if(selected_instructions_container_validation.textContent === '') {
                            // Individual Tables
                            for(let j = 0; j < instruction_table_body.length; j++) {
                                // console.log('Individual Table');
                                if(instruction_table_validation[j].textContent === '') {
                                    // So that it does not repeat posting again and again
                                        // addToJobObject();
                                    isJobValid = true;
                                } else { break; }
                            }
                        }
                    } else { break; }
                }
            }
        }

        if(isJobValid){
            addToJobObject();
        }
    })
}

async function job() {
    await getUserId();
    await jobNumberInputValidation();
    await telephoneNumberInputValidation();
    await addFormatAndName();

    await fetchItems();
    await addItemtoInstruction();

    await fetchPositions();

    await fetchColours();
    await addColourToInstruction();

    await quantityValidation();
    await addInstruction();

    await addJob();
}

job();