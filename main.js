// *******Variables******
var saveButton = document.querySelector('.form__button--save');
var titleInput = document.querySelector('.form__input--title');
var bodyInput = document.querySelector('.form__textarea--body');
var form = document.querySelector('.section__form');
var mainSectionBottom = document.querySelector('.main__section--bottom');
var searchInput = document.querySelector('.form__input--search');
var starButton = document.querySelector('.div__button--starred')
var ideasArray = [];
var qualityArray = ['Swill', 'Plausible', 'Genius'];
var toggleArray = [false, false, false, false];

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
searchInput.addEventListener('keyup', searchIdea);
starButton.addEventListener('click', filterByStar)
document.querySelector('.body__nav').addEventListener('click', getQuality);



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
  toggleVote(event);
}

function handlePageLoad(){
  disableSaveButton();
  mapArray();
  showTen(ideasArray, tenArray = []);
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
        <img class="button__img--upvote" src="images/upvote.svg" alt="upvote">
        <p class="footer__p--quality">Quality: <span class="quality">${qualityArray[newIdeaObj.quality]}</span></p>
        <img class="button__img--downvote" src="images/downvote.svg" alt="downvote">
      </footer>
    </article>`)
}

function instaniateIdea() {
  var newIdea = new Idea({title:titleInput.value, body:bodyInput.value});
  ideasArray.push(newIdea);
  newIdea.saveToStorage(ideasArray);
  displayIdeaCard(newIdea);
}

function persistCards(array) {
  array.forEach(function(element) {
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
    var targetObject = findObject(event);
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
  });function cardButtonHover(e, location, activeButton) {
  if (e.target.classList.contains(location)) {
    e.target.setAttribute('src', `idea-box-icons/${activeButton}`);
  }
}
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

var upvoteClass = 'button__img--upvote'
var downvoteClass = 'button__img--downvote'

function toggleVote(event) {
  var targetObj = findObject(event);
  if (event.target.classList.contains(upvoteClass)) {
    targetObj.changeQualityScore(event, upvoteClass);
    targetObj.setQualityText(event);
  }

  if (event.target.classList.contains(downvoteClass)) {
    targetObj.changeQualityScore(event, downvoteClass);
    targetObj.setQualityText(event);
  }
}

function searchIdea() {
    clearCards();
    var searchArray = [];
  for(var i = 0; i < ideasArray.length; i++) {
    if(ideasArray[i].title.toLowerCase().includes(searchInput.value.toLowerCase()) || ideasArray[i].body.toLowerCase().includes(searchInput.value.toLowerCase())) {
      searchArray.push(ideasArray[i]);
    }
  }
  persistCards(searchArray);
}

function clearCards() {
  mainSectionBottom.innerHTML = '';
}

function filterByStar() {
  toggleArray[3] = !toggleArray[3];
  toggleArray[3] ? searchStar() : clearStars();
}

function searchStar() {
  clearCards();
  var starArray = [];
  for (var i = 0; i < ideasArray.length; i++) {
    if (ideasArray[i].star === true) {
    starArray.push(ideasArray[i]);
    }
  }
  persistCards(starArray);
  starButton.innerText = 'View All Ideas'
}

function clearStars() {
  clearCards(); 
  persistCards(ideasArray);
  starButton.innerText = 'Show Starred Ideas';
}

//EDUARDO TEST
var bodyNav = document.querySelector('.body__nav');
bodyNav.addEventListener('click', toggleQuality);

function toggleQuality(event) {
  if(event.target.classList.contains('nav__btn--swill')) {
    toggleArray[0] = !toggleArray[0];
    toggleArray[0] ? getQuality(event) : clearQuality();
  } else if (event.target.classList.contains('nav__btn--plausible')) {
    toggleArray[1] = !toggleArray[1];
    toggleArray[1] ? getQuality(event) : clearQuality();
  } else if (event.target.classList.contains('nav__btn--genius')) {
    toggleArray[2] = !toggleArray[2];
    toggleArray[2] ? getQuality(event) : clearQuality();
  }
}

function getQuality(event) {
  if(event.target.classList.contains('nav__btn--swill')) {
    toggleArray[0] = !toggleArray[0];
    toggleArray[0] ? getQuality(event) : clearQuality();
    filterByQuality(0, sArray = []);
  } else if (event.target.classList.contains('nav__btn--plausible')) {
    filterByQuality(1, pArray = []);
  } else if (event.target.classList.contains('nav__btn--genius')) {
    filterByQuality(2, gArray = []);
  } 
}

function filterByQuality(index, qArray) {
  clearCards();
  for(var i = 0; i < ideasArray.length; i++) {
    if(ideasArray[i].quality === index) {
      qArray.push(ideasArray[i]);
    }
  }
  persistCards(qArray);
}

function clearQuality() {
  clearCards(); 
  persistCards(ideasArray);
}
//End Eduardo Test

document.querySelector('.form__btn--show').addEventListener('click', showButton)

function showTen(array1, array2){
  if (array1.length > 10 ){
    for (i = array1.length -1; i >= array1.length - 10; i--){
      array2.push(array1[i])
    }
    array2.reverse();
    persistCards(array2)
  } else {
    persistCards(array1)
  }
}

function showButton(){
  if (document.querySelector('.form__btn--show').innerText === 'Show More'){
    clearCards();
    persistCards(ideasArray);
    document.querySelector('.form__btn--show').innerText = 'Show Less';
  } else if (document.querySelector('.form__btn--show').innerText === 'Show Less') {
    clearCards();
    showTen(ideasArray, tenArray = []);
    document.querySelector('.form__btn--show').innerText = 'Show More';
  }
}