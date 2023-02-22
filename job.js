// DOM elements
var selected_formats_container;
var delete_format_buttons;

function setDom() {
    selected_formats_container = document.querySelector('#selected-formats-container');
    delete_format_buttons = document.querySelectorAll('.delete-format-button');
}


async function getFormats() {
    const response = await fetch('format.php');
    const formats = await response.json();
    return formats;
}

function fillFormats(formats) {
    let possible_formats_container = document.querySelector('#possible-formats-container');
    for(let i = 0; i < formats.length; i++) {
        let p = document.createElement('p');
        p.setAttribute('id', formats[i].id);
        p.setAttribute('class', 'possible-format');
        p.textContent = formats[i].name;
        possible_formats_container.appendChild(p);
    }
}



function addEventToFormats() {
    let possible_formats = document.querySelectorAll('.possible-format');
    for(let i = 0; i < possible_formats.length; i++) {
        possible_formats[i].addEventListener('click', function() {
            // Create section
            let section = document.createElement('section');
            section.setAttribute('id', this.id);
            section.setAttribute('class', 'selected-format-container')
            // Create paragraph
            let p = document.createElement('p');
            p.setAttribute('class', 'selected-format-name');
            p.textContent = this.textContent;
            section.appendChild(p);
            // Create input
            let input = document.createElement('input');
            input.setAttribute('class', 'letters')
            input.setAttribute('type', 'text');
            input.setAttribute('placeholder', 'Enter Name');
            section.appendChild(input);
            //Create button
            let button = document.createElement('button');
            button.setAttribute('id', this.id);
            button.setAttribute('class', 'delete-format-button');
            button.setAttribute('type', 'button')
            button.textContent = 'X';
            section.appendChild(button);
            //Append whole section to container
            selected_formats_container.appendChild(section);
            
            // Delete button functionality
            delete_format_buttons = document.querySelectorAll('.delete-format-button');
            for(let i = 0; i < delete_format_buttons.length; i++) {
                delete_format_buttons[i].addEventListener('click', function() {
                    delete_format_buttons[i].parentNode.remove();
                });
            } 
        });
    }
}

function instructions() {
    let go_to_instructions = document.querySelector('#go-to-instructions');
    go_to_instructions.addEventListener('click', function(){
        let instructions_container = document.querySelector('#instructions-container');
        // In case of previous entry, clear container
        instructions_container.innerHTML = "";
        let selected_formats = document.querySelectorAll('.selected-format-container');
        let selected_format_name = document.querySelectorAll('.selected-format-name');
        let letters = document.querySelectorAll('.letters');
        for(let i = 0; i < selected_formats.length; i++) {
            // Create section
            let section = document.createElement('section');
            section.setAttribute('id', selected_formats[i].id);
            section.setAttribute('class', 'instruction');
            // Create 
            let p = document.createElement('p');
            p.setAttribute('class','instruction-format');
            p.textContent = selected_format_name[i].textContent;
            section.appendChild(p);
            // Add section to container
            instructions_container.appendChild(section);
        }
        console.log(instructions_container);
    });

}

async function job() {
    // Get Formats from database then add to HTML
    await setDom();
    await getFormats().then(formats => fillFormats(formats));
    await addEventToFormats();
    await instructions();
}

job();




// async function getPossibleFormats() {
//     const response = await fetch('format.php');
//     const formats = await response.json();
//     for(let i = 0; i < formats.length; i++) {
//         temp += `<p id="${formats[i].name}" class='possible-formats'>${formats[i].name}</p>`;
//     }
//     possible_formats_container.innerHTML = temp;
//     temp = "";
//     const possible_formats = document.querySelectorAll('.possible-formats');
//     console.log(possible_formats);
// }



// selected_formats_container.innerHTML += `<section>
// <p id=${this.id} class="format-name">${this.textContent}</p>
// <input type="text" class="selected-format-list-letters" placeholder="Enter Letters">
// <p class='letters'></p>
// <section id="instructions-container">
// </section>
// <section>`;
// const selected_format_list_letters = document.querySelectorAll('.selected-format-list-letters');

// for(let i = 0; i < selected_format_list_letters.length; i++) {
//     selected_format_list_letters[i].addEventListener('input', transferLetters);
// }

// const letters = document.querySelectorAll('.letters');
    
// function transferLetters() {
//     for(let i = 0; i < selected_format_list_letters.length; i++) {
//         letters[i].textContent = selected_format_list_letters[i].value;
//     }
// }