export function lettersComponent() {
    let input = document.createElement('input');
    input.setAttribute('class', 'format-and-name-input letters');
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'Enter Name');

    input.addEventListener('input', function(){
        let regex = /[^A-Za-z0-9]/;
        if(regex.test(this.value)) {
            
        }
    })
    return input;
}