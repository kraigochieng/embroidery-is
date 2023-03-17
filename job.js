// Global Variables
let instruction = {
    index: '', // index of tomat and name
    item: {
        id: '',
        name: '',
    },

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
import { positionComponent } from "./components/positionComponent.js";
import { colourComponent } from "./components/colourComponent.js";
import { instructionTableComponent } from "./components/instructionTableComponent.js";
import { instructionDescription } from "./components/instructionDescriptionComponent.js";
import { deleteInstructionButton } from "./components/deleteInstruction.js";
import { formatAndLettersComponent } from "./components/formatAndLettersComponent.js";
import { itemComponent } from "./components/itemComponent.js";

function instructionRowComponent(item, position, colour, quantity) {
    let instruction_row = {
        row: document.createElement('tr'),
        item: document.createElement('td'),
        position: document.createElement('td'),
        colour: document.createElement('td'),
        quantity: document.createElement('td'),
        description: document.createElement('td'),
        delete: document.createElement('td'),
    }

    // Set Attributes
    instruction_row.item.setAttribute('id', item.id);
    instruction_row.position.setAttribute('id', position.id);
    instruction_row.colour.setAttribute('id', colour.id);

    instruction_row.row.setAttribute('class', 'instruction-row');
    instruction_row.item.setAttribute('class', 'instruction-item');
    instruction_row.position.setAttribute('class', 'instruction-position');
    instruction_row.colour.setAttribute('class', 'instruction-colour');
    instruction_row.quantity.setAttribute('class', 'instruction-quantity');

    // Add text
    instruction_row.item.textContent = item.name;
    instruction_row.position.textContent = position.name;
    instruction_row.colour.textContent = colour.name;
    instruction_row.quantity.textContent = quantity;
    instruction_row.description.appendChild(instructionDescription());
    instruction_row.delete.appendChild(deleteInstructionButton());

    // Add Events
    instruction_row.delete.addEventListener('click', function(){
        this.parentNode.remove();
        let instruction_table_body = document.querySelectorAll('.instruction-table-body');
        if(instruction_table_body[instruction.index].childNodes.length === 0) {
            instruction_table_body[instruction.index].setAttribute('class','instruction-table-body empty-table');
        }
    })
    // Add items
    instruction_row.row.appendChild(instruction_row.item);
    instruction_row.row.appendChild(instruction_row.position);
    instruction_row.row.appendChild(instruction_row.colour);
    instruction_row.row.appendChild(instruction_row.quantity);
    instruction_row.row.appendChild(instruction_row.description);
    instruction_row.row.appendChild(instruction_row.delete);

    return instruction_row;
}

function jobNumberValidation(element, validation) {
    let regex = /[^0-9]/;
    
    if(regex.test(element.value)) {
        validation.textContent = '* Only Include Numbers';
    } else if(element.value === ''){
        validation.textContent = '* Empty';
    } else {
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

async function addFormatAndName() {
    let format_and_name_choices = document.querySelector('#format-and-name-choices');
    let add_format_and_name = document.querySelector('#add-format-and-name');

    add_format_and_name.addEventListener('click', function(){
        format_and_name_choices.removeAttribute('class');
        let format_and_name = formatAndLettersComponent();

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
        // Create Component
        let instruction_table = instructionTableComponent();
        // Append DOM
        selected_instructions_container.appendChild(instruction_table);
    }

    function removeSelectedInstructionContainer() {
        let delete_format_buttons = document.querySelectorAll('.delete-format-button')

        let instruction_tables = document.querySelectorAll('.instruction-table');

        for(let i = 0; i < delete_format_buttons.length; i++) {
            delete_format_buttons[i].addEventListener('click', function(){
                instruction_tables[i].remove();
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
        fetch('position.php', {
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
                        item_validation.textContent = '';
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
        // Select DOM
        instructionValidation();
        let instruction_table_body = document.querySelectorAll('.instruction-table-body');
        // Create Element
        let instruction_row = instructionRowComponent(instruction.item, instruction.position, instruction.colour, instruction.quantity);
        // Clear
        instruction_table_body[instruction.index].setAttribute('class', 'instruction-table-body');
        // Append to table
        instruction_table_body[instruction.index].appendChild(instruction_row.row);
        // Reset All Fields
        
        resetInstructionFields();
    })
}

function instructionValidation() {
    let format_and_name_choice = document.querySelector('#format-and-name-choices');
    let format_and_name_choice_validation = document.querySelector('#format-and-name-choice-validation');

    let item_select = document.querySelector('#item-select');
    let item_validation = document.querySelector('#item-validation');

    let position_section = document.querySelector('#position-section');
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

}

function resetInstructionFields() {
    let item_select = document.querySelector('#item-select');
    let position_section = document.querySelector('#position-section');
    let colour_select = document.querySelector('#colour-select');
    let quantity = document.querySelector('#instruction-quantity');

    item_select.value = "";
    position_section.setAttribute('class', 'empty-position-container');
    position_section.innerHTML = "";
    colour_select.value = "";
    quantity.value = "";
}

async function addJob(){
    let add_job = document.querySelector('#add-job');
    let job_number = document.querySelector('#job-number');
    let job_number_validation = document.querySelector('#job-number-validation')

    add_job.addEventListener('click', function(){
        // Job Number Validation
        let regex = /[^0-9]/;
        // Invalid job Number
        if(regex.test(job_number.value)) {
            job_number_validation.textContent = '* Only Include Numbers';
        } else if(job_number.value === ''){
            job_number_validation.textContent = '* Empty';
        }

        // Valid Job Number
        if(!regex.test(job_number.value)) {
            job_number_validation.textContent = '';
            let jobs = [];
            let format_and_name_choices = document.querySelectorAll('.format-and-name-choice');
            // All tables
            let instruction_table = document.querySelectorAll('.instruction-table-body');
            // Each different format
            for(let i = 0; i < format_and_name_choices.length; i++) {
                let format = format_and_name_choices[i].childNodes[0];
                let letters = format_and_name_choices[i].childNodes[1];
                //All Rows for each table, this means for each format
                let instructions = instruction_table[i].childNodes;
                // Each Row, for each format
                for(let j = 0; j < instructions.length; j++) {
                    // One Row
                    // let item_id = instructions[i].childNodes[0].id;
                    // let position_id = instructions[i].childNodes[1].id;
                    // let colour_id = instructions[i].childNodes[2].id;
                    // let quantity = instructions[i].childNodes[3].textContent;
                    // let description = instructions[i].childNodes[4].value;
                    let instruction = {
                        item_id: instructions[j].childNodes[0].id,
                        position_id: instructions[j].childNodes[1].id,
                        colour_id: instructions[j].childNodes[2].id,
                        quantity: instructions[j].childNodes[3].textContent,
                        description: instructions[j].childNodes[4].value,
                    }
                    console.log(instruction);
                }
                // jobs.push({
                //     format: format.options[format.selectedIndex].value,
                //     letters: letters.value,
                //     instruction: [],
                // });
            }
        }
    })
}

async function job() {
    await jobNumberInputValidation();
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