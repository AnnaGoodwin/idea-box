// *******Variables******
var saveButton = document.querySelector('.form__button--save');
var titleInput = document.querySelector('.form__input--title');
var bodyInput = document.querySelector('.form__textarea--body');
var form = document.querySelector('.section__form');
var mainSectionBottom = document.querySelector('.main__section--bottom');
var textBody = document.querySelector('.form__textarea--body');
var ideasArray = JSON.parse(localStorage.getItem("ideaArray")) || [];

//**** On Page Load ******
disableSaveButton();
persistCards();

// Event Listeners
form.addEventListener('keyup', disableSaveButton);
saveButton.addEventListener('click', handleSaveButton);
mainSectionBottom.addEventListener('click', deleteIdeaCard);

// Functions
function disableSaveButton(){
  if (titleInput.value === '' || bodyInput.value === '') {
    saveButton.disabled = true;
  } else {
    saveButton.disabled = false;
  }
}

function emptyInputs() {
  titleInput.value = '';
  bodyInput.value = '';
  disableSaveButton();
}

function handleSaveButton() {
  instaniateIdea();
  emptyInputs();
}

function displayIdeaCard(newIdeaObj) {
  mainSectionBottom.insertAdjacentHTML('afterbegin',
    `<article class="section__article" data-identifier="${newIdeaObj.id}">
      <header class="article__header">
        <img class="header__img--star" src="images/star.svg" alt="star">
        <img class="header__img--x" src="images/delete.svg" alt="x">
      </header>
      <div class="article__div">
        <h3 class="div__h3--title">${newIdeaObj.title}</h3>
        <p class="div__p--text">${newIdeaObj.body}</p>
      </div>
      <footer class="article__footer">
        <button class="footer__button--upvote" type="button">
          <img class="button__img--upvote" src="images/upvote.svg" alt="upvote">
        </button>
        <p class="footer__p--quality">Quality:<span>Swill</span></p>
        <button class="footer__button--downvote" type="button">
          <img class="button__img--downvote" src="images/downvote.svg" alt="downvote">
        </button>
      </footer>
    </article>`)
}

function instaniateIdea() {
  var newIdea = new Idea(titleInput.value, bodyInput.value);
  ideasArray.push(newIdea);
  console.log(newIdea);
  newIdea.saveToStorage(ideasArray);
  displayIdeaCard(newIdea);
}

function persistCards() {
  ideasArray.forEach(function(element) {
    displayIdeaCard(element);
  });
}

function deleteIdeaCard() {
  var ideaCard = document.querySelector('.section__article');
  if(event.target.classList.contains('header__img--x')) {
    ideaCard.remove();
    findIndex();
    // ideasArray.saveToStorage(ideasArray);
  }
}

function findIndex() {
  var identity = event.target.closest('.section__article').dataset.identifier;
  var index = ideasArray.findIndex(obj => {
    return parseInt(identity) === obj.id
  });
  console.log("array", ideasArray);
  console.log("index", index);
  // ideasArray.splice(index, 1);
  console.log(ideasArray);
}