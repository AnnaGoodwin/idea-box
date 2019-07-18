// *******Variables******
var saveButton = document.querySelector('.form__button--save');
var titleInput = document.querySelector('.form__input--title');
var bodyInput = document.querySelector('.form__textarea--body');
var form = document.querySelector('.section__form');
var mainSectionBottom = document.querySelector('.main__section--bottom');
var ideasArray = [];
var qualityArray = ['Swill', 'Plausible', 'Genius'];

function mapArray(){
  if (JSON.parse(localStorage.getItem("ideaArray")) === null)
  {ideasArray = [];
  } else {
    ideasArray = JSON.parse(localStorage.getItem("ideaArray")).map(element => {
    return new Idea(element)
    })
  };
} 

//**** On Page Load ******
// Event Listeners
window.addEventListener('load', handlePageLoad)

form.addEventListener('keyup', disableSaveButton);
saveButton.addEventListener('click', handleSaveButton);
mainSectionBottom.addEventListener('click', handleCardInteractions);
mainSectionBottom.addEventListener('keyup', updateTitle);
mainSectionBottom.addEventListener('keyup', updateBody);
mainSectionBottom.addEventListener('keydown', listenForEnter);


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
  ideasMessage();
}

function handleCardInteractions() {
  deleteIdeaCard(event);
  toggleStar(event);
  toggleUpvote(event);
}

function handlePageLoad(){
  disableSaveButton();
  mapArray();
  persistCards();
  ideasMessage();
}

function displayIdeaCard(newIdeaObj) {
  var starSource = newIdeaObj.star ? 'images/star-active.svg' : 'images/star.svg'
  mainSectionBottom.insertAdjacentHTML('afterbegin',
    `<article class="section__article" data-identifier="${newIdeaObj.id}">
      <header class="article__header">
        <img class="header__img--star" src="${starSource}" alt="star">
        <img class="header__img--x" src="images/delete.svg" alt="x">
      </header>
      <div class="article__div">
        <h3 class="div__h3--title" contenteditable="true">${newIdeaObj.title}</h3>
        <p class="div__p--text" contenteditable="true">${newIdeaObj.body}</p>
      </div>
      <footer class="article__footer">
        <button class="footer__button--upvote" type="button">
          <img class="button__img--upvote" src="images/upvote.svg" alt="upvote">
        </button>
        <p class="footer__p--quality">Quality: <span class="quality">${qualityArray[newIdeaObj.quality]}</span></p>
        <button class="footer__button--downvote" type="button">
          <img class="button__img--downvote" src="images/downvote.svg" alt="downvote">
        </button>
      </footer>
    </article>`)
}

function instaniateIdea() {
  var newIdea = new Idea({title:titleInput.value, body:bodyInput.value});
  ideasArray.push(newIdea);
  newIdea.saveToStorage(ideasArray);
  displayIdeaCard(newIdea);
}

function persistCards() {
  ideasArray.forEach(function(element) {
    displayIdeaCard(element);
  });
}

function deleteIdeaCard(event) {
  if(event.target.classList.contains('header__img--x')) {
    event.target.parentNode.parentNode.remove();
    removeFromStorage(event);
    ideasMessage();
  }
}

function removeFromStorage(event) {
  var targetIndex = findTargetIndex(event);
  ideasArray[targetIndex].deleteFromStorage(targetIndex, ideasArray);
}

function toggleStar(event) {
  if(event.target.classList.contains('header__img--star')) {
    var targetObject = findObject();
    targetObject.updateStar();
    var sourcePath = targetObject.star ? 'images/star-active.svg' : 'images/star.svg';
    event.target.setAttribute('src', sourcePath);
    targetObject.saveToStorage(ideasArray);
  }
}

function findTargetIndex(event) {
  var identity = event.target.closest('.section__article').dataset.identifier;
  var targetIndex = ideasArray.findIndex(obj => {
    return parseInt(identity) === obj.id
  });
  return targetIndex;
}

function findObject(event) {
  var targetIdea = findTargetIndex(event);
  var targetObject = ideasArray[targetIdea];
  return targetObject
}

function updateTitle(event) {
  if(event.target.classList.contains('div__h3--title')) {
    var newTitle = event.target.closest('.div__h3--title').innerText;
    var targetObject = findObject(event);
    targetObject.title = newTitle;
    targetObject.saveToStorage(ideasArray);
  }
}

function updateBody(event) {
  if(event.target.classList.contains('div__p--text')) {
    var newBody = event.target.closest('.div__p--text').innerText;
    var targetObject = findObject(event);
    targetObject.body = newBody;
    targetObject.saveToStorage(ideasArray);
  }
}

function ideasMessage() {
  if(ideasArray.length === 0) {
    mainSectionBottom.insertAdjacentHTML('afterbegin', `<p id='ptag'>Create Ideas</p>`);
  } else {
    var ideaMessage = document.querySelector('#ptag')
    ideaMessage.remove();
  }
}

function listenForEnter(event) {
  if (event.key === 'Enter') {
    event.target.blur();
    updateBody();
    updatedTitle();
  }
}

function toggleUpvote(event) {
  console.log('in');
  // console.log(event);
  if(event.target.classList.contains('button__img--upvote')) {
    var targetObj = findObject(event);
    console.log("first obj", targetObj.quality)
    targetObj.updateQuality();
    console.log("second obj", targetObj.quality);
  }
}

//'blur' or 'focusOut' for edit HTML
//Look at rubric, functionality isn't not the only thing there
//




