// *******Variables******
var saveButton = document.querySelector('.form__button--save');
var titleInput = document.querySelector('.form__input--title');
var bodyInput = document.querySelector('.form__textarea--body');
var form = document.querySelector('.section__form')

//**** On Page Load ******
disableSaveButton();


// Event Listeners
form.addEventListener('keyup', disableSaveButton)


// Functions

function disableSaveButton(){
  if (titleInput.value === '' || bodyInput.value === '') {
    saveButton.disabled = true;
  } else {
    saveButton.disabled = false;
  }
}