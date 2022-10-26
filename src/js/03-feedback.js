import throttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');
const texstAria = document.querySelector('.feedback-form textarea');

console.log(formRef.message.value);

const STORAGE_KEY = 'feedback-form-state';

let formData = {"email":"","message":""};

formRef.addEventListener('input', throttle(onFormInput, 500) );
formRef.addEventListener('submit', onFormSubmit)

populateTextAria();

function onFormInput(evt) {
    const saveMassage = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saveMassage) {
        formData.email  = saveMassage.email;
        formData.message = saveMassage.message;
     }

    formData[evt.target.name] = evt.target.value;
    const message = JSON.stringify(formData);
    console.log(message);
    localStorage.setItem(STORAGE_KEY, message);
}

function populateTextAria() { 
    const saveMassage = JSON.parse(localStorage.getItem(STORAGE_KEY));

    // console.log(saveMassage);
    if (saveMassage) {
        formRef.email.value = saveMassage.email;
        formRef.message.value = saveMassage.message;
     }
}

function onFormSubmit(evt) {
    evt.preventDefault();
    evt.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
 }