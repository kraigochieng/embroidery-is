import { updateUser } from "../scripts/update_user.js";
import { deleteUser } from "../scripts/delete_user.js";
import { clearUsersSection } from "../scripts/read_users.js";

export function userComponent(id, text) {
    let section = document.createElement('section');
    section.className = 'user-section';

    let username = document.createElement('p');
    username.className = 'user';
    username.textContent = text;
    section.appendChild(username);

    let trash = document.createElement('button');
    trash.type = 'button';
    trash.className = 'user-delete';
    let trash_link = document.createElement('a');
    // trash_link.href = `../pages/delete_user.html?user_id=${id}`;
    trash_link.href = '#';
    trash_link.textContent = 'Delete';
    trash.appendChild(trash_link); 

    trash.addEventListener('click', function() {
        clearUsersSection();
        sessionStorage.setItem('delete_user_id', id);
        let delete_user_section = document.querySelector('#delete-user-section');
        delete_user_section.style.transform = 'scale(1)';
        deleteUser();
    })

    section.appendChild(trash);

    let edit = document.createElement('button');
    edit.type = 'button';
    edit.className = 'user-edit';
    let edit_link = document.createElement('a');
    // edit_link.href = `../pages/update_user.html?user_id=${id}`;
    edit_link.href = '#';
    edit_link.textContent = 'Edit';
    edit.appendChild(edit_link); 
    
    edit.addEventListener('click', function() {
        let update_user_section = document.querySelector('#update-user-section');

        update_user_section.style.transform = 'scale(1)';

        sessionStorage.setItem('edit_user_id', id);
        updateUser();
    })
    section.appendChild(edit);

    return section;
}
