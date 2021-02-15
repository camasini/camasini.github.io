const getForm = document.querySelector('form');
const getButton = document.getElementById('submit');
const mailInput = document.getElementById('email');
const validityBox = document.getElementById('mailvalidation');

const validateForm = () => {
    validityBox.classList.add('mailvalidationoff');
    if (mailInput.value === '') {
        validityBox.classList.add('mailvalidationon');
        validityBox.textContent = 'Wypełnij pole e-mail';
    } else if (!mailInput.value.includes('@')) {
        validityBox.classList.add('mailvalidationon');
        validityBox.innerHTML = 'Pole e-mail, nie zawiera znaku @';
    } else {
        getForm.setAttribute('action', 'contact.php');
        getButton.setAttribute('type', 'submit');
    }
}

getButton.addEventListener('click', validateForm)