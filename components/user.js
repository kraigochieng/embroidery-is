import { viewDeleteUser } from '../scripts/delete_user.js';
import { viewUpdateUser } from '../scripts/update_user.js';
import { viewReadUser } from '../scripts/read_user.js';

function addBackground() {
    let users_section = document.querySelector('#users')
    users_section.style.opacity = '0.3'
    let open_create_user_popup= document.querySelector("#open-create-user-popup")
    open_create_user_popup.style.opacity = '0.3'

}

export function userComponent(id, text) {
    let section = document.createElement('section');
    section.className = 'user-section';
    section.addEventListener('click', function(){
        sessionStorage.setItem('view_user_id', id)
        let view_user_section = document.querySelector('#view-user-section')
        view_user_section.style.transform = 'scale(1)'
        addBackground()
        viewReadUser()
    })
    let username = document.createElement('p');
    username.className = 'username';
    username.textContent = text;
    section.appendChild(username);

    let trash_and_edit = document.createElement('section')
    trash_and_edit.className = 'delete-and-edit-section'


    let edit = document.createElement('button');
    edit.type = 'button';
    edit.className = 'user-edit';
    edit.textContent = 'Update';
    
    edit.addEventListener('click', function(event) {
        event.stopPropagation()
        let update_user_section = document.querySelector('#update-user-section');
        update_user_section.style.transform = 'scale(1)';
        sessionStorage.setItem('edit_user_id', id);
        addBackground()
        viewUpdateUser()
    })
    
    trash_and_edit.appendChild(edit)
    
    let trash = document.createElement('button');
    trash.type = 'button';
    trash.className = 'user-delete';
    trash.textContent = 'Delete';

    trash.addEventListener('click', function(event) {
        event.stopPropagation()
        sessionStorage.setItem('delete_user_id', id);
        let delete_user_section = document.querySelector('#delete-user-section');
        delete_user_section.style.transform = 'scale(1)';
        addBackground()
        viewDeleteUser()
    })

    trash_and_edit.appendChild(trash)

    

    section.appendChild(trash_and_edit);

    return section;
}
