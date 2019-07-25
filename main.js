// Variables
var bodyNav = document.querySelector('.body__nav');
var saveButton = document.querySelector('.form__button--save');
var titleInput = document.querySelector('.form__input--title');
var bodyInput = document.querySelector('.form__textarea--body');
var form = document.querySelector('.section__form');
var mainSectionBottom = document.querySelector('.main__section--bottom');
var hamburger = document.querySelector('.div__img--hamburger')
var navBar = document.querySelector('.nav__container1')
var searchInput = document.querySelector('.form__input--search');
var starButton = document.querySelector('.div__button--starred');
var swillButton = document.querySelector('.nav__btn--swill');
var plausibleButton = document.querySelector('.nav__btn--plausible');
var geniusButton = document.querySelector('.nav__btn--genius');
var ideasArray = [];
var qualityArray = ['Swill', 'Plausible', 'Genius'];

// Event Listeners
window.addEventListener('load', handlePageLoad)
bodyNav.addEventListener('click', getQuality);
form.addEventListener('keyup', disableSaveButton);
saveButton.addEventListener('click', handleSaveButton);
mainSectionBottom.addEventListener('click', handleCardInteractions);
mainSectionBottom.addEventListener('keyup', updateText);
mainSectionBottom.addEventListener('keydown', listenForEnter);
searchInput.addEventListener('keyup', searchHandler);
starButton.addEventListener('click', filterByStar)
document.querySelector('.body__nav').addEventListener('click', getQuality);
document.querySelector('.form__btn--show').addEventListener('click', showButton)
hamburger.addEventListener('click', toggleHamburger)

// Functions
function mapArray() {
  if (JSON.parse(localStorage.getItem("ideaArray")) === null) {
    ideasArray = [];
  } else {
    ideasArray = JSON.parse(localStorage.getItem("ideaArray")).map(element => {
      return new Idea(element);
    })
  };
}

function disableSaveButton() {
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
  showMessage(ideasArray, 'Create Some Ideas!');
}

function handleCardInteractions() {
  deleteIdeaCard(event);
  toggleStar(event);
  toggleVote(event);
}

function handlePageLoad() {
  disableSaveButton();
  mapArray();
  showTen(ideasArray, tenArray = []);
  showMessage(ideasArray, 'Create Some Ideas!');
}

function displayIdeaCard(newIdeaObj) {
  var starSource = newIdeaObj.star ? 'images/star-active.svg' : 'images/star.svg'
  mainSectionBottom.insertAdjacentHTML('afterbegin',
    `<article class="section__article" data-identifier="${newIdeaObj.id}">
      <header class="article__header">
        <img class="header__img--star" src="${starSource}" alt="star">
        <img class="header__img--x" src="images/delete.svg" alt="delete button">
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
    </article>`);
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
  if (event.target.classList.contains('header__img--x')) {
    event.target.parentNode.parentNode.remove();
    removeFromStorage(event);
    showMessage(ideasArray, 'Create Some Ideas!');
  }
}

function removeFromStorage(event) {
  var targetIndex = findTargetIndex(event);
  ideasArray[targetIndex].deleteFromStorage(targetIndex, ideasArray);
}

function toggleStar(event) {
  if (event.target.classList.contains('header__img--star')) {
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
    return parseInt(identity) === obj.id;
  }) 
  return targetIndex;
}

function findObject(event) {
  var targetIdea = findTargetIndex(event);
  var targetObject = ideasArray[targetIdea];
  return targetObject
}

function updateText(event) {
  if (event.target.classList.contains('div__h3--title') || event.target.classList.contains('div__p--text')) {
    var newTitle = event.target.closest('.section__article').querySelector('.div__h3--title').innerText;
    var newBody = event.target.closest('.section__article').querySelector('.div__p--text').innerText;
    var targetObject = findObject(event);
    targetObject.updateIdea(newTitle, newBody, ideasArray);
  }
}

function listenForEnter(event) {
  if (event.key === 'Enter') {
    event.target.blur();
    updateText(event);
  }
}

function toggleVote(event) {
  var upvoteClass = 'button__img--upvote';
  var downvoteClass = 'button__img--downvote';
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
  for (var i = 0; i < ideasArray.length; i++) {
    if (ideasArray[i].title.toLowerCase().includes(searchInput.value.toLowerCase()) || ideasArray[i].body.toLowerCase().includes(searchInput.value.toLowerCase())) {
      searchArray.push(ideasArray[i]);
    }
  }
  persistCards(searchArray);
}

function clearCards() {
  mainSectionBottom.innerHTML = '';
}

function filterByStar() {
  if (event.target.textContent === 'Show Starred Ideas') {
  searchStar();
  } else {
  clearStars();
  }
}

function searchHandler() {
  clearCards();
  if (swillButton.innerText === 'Show All Ideas') {
    qualitySearch(sArray = [], 0, 'quality');
  } else if (plausibleButton.innerText === 'Show All Ideas') {
    qualitySearch(pArray = [], 1, 'quality');
  } else if (geniusButton.innerText === 'Show All Ideas') {
    qualitySearch(gArray = [], 2, 'quality');
  } else if (starButton.innerText === 'Show All Ideas') {
    qualitySearch(starArray = [], true, 'star');
  } else {
    searchIdea();
  }
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
  starButton.innerText = 'Show All Ideas';
  showMessage(starArray, 'Star Some Ideas!')
}

function showMessage(array, message) {
  if (array.length === 0) {
    mainSectionBottom.insertAdjacentHTML('afterbegin', `<p id='ptag'>${message}</p>`);
  } else {
    var newMessage = document.querySelector('#ptag');
    newMessage.remove();
  }
}

function qualitySearch(qArray, qIndex, property) {
  clearCards();
  for(var i = 0; i < ideasArray.length; i++) {
    if((ideasArray[i].title.toLowerCase().includes(searchInput.value.toLowerCase()) || ideasArray[i].body.toLowerCase().includes(searchInput.value.toLowerCase())) && ideasArray[i][property] === qIndex) {
      qArray.push(ideasArray[i]);
    }
  }
  persistCards(qArray);
}

function clearStars() {
  clearCards(); 
  persistCards(ideasArray);
  starButton.innerText = 'Show Starred Ideas';
}

function toggleQuality(event) {
  var childrenArr = Array.from(event.target.parentNode.childNodes)
  var index = childrenArr.findIndex(element => {
    return element.innerText === 'Show All Ideas';
  })
  if (index === 5) {
    childrenArr[index].innerText = qualityArray[0];
    childrenArr[5].classList.remove('active');
  } else if (index === 7) {
    childrenArr[index].innerText = qualityArray[1];
    childrenArr[7].classList.remove('active');
  } else if (index === 9) {
    childrenArr[index].innerText = qualityArray[2];
    childrenArr[9].classList.remove('active');
  }
}

function changeQualityText(event) {
  if (event.target.textContent  === 'Show All Ideas') {
    clearCards();
    persistCards(ideasArray);
    toggleQuality(event);
  } else {
    toggleQuality(event);
    event.target.classList.add('active');
    event.target.textContent = "Show All Ideas";
  }
}

function getQuality(event) {
  if(event.target.classList.contains('nav__btn--swill')) {
    filterByQuality(0, sArray = []);
    changeQualityText(event);
  } else if (event.target.classList.contains('nav__btn--plausible')) {
    filterByQuality(1, pArray = []);
    changeQualityText(event);
  } else if (event.target.classList.contains('nav__btn--genius')) {
    filterByQuality(2, gArray = []);
    changeQualityText(event);
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

function showTen(array1, array2) {
  if (array1.length > 10 ) {
    for (i = array1.length -1; i >= array1.length - 10; i--) {
      array2.push(array1[i]);
    }
    array2.reverse();
    persistCards(array2)
  } else {
    persistCards(array1)
  }
}

function showButton() {
  if (document.querySelector('.form__btn--show').innerText === 'Show More') {
    clearCards();
    persistCards(ideasArray);
    document.querySelector('.form__btn--show').innerText = 'Show Less';
  } else if (document.querySelector('.form__btn--show').innerText === 'Show Less') {
    clearCards();
    showTen(ideasArray, tenArray = []);
    document.querySelector('.form__btn--show').innerText = 'Show More';
  }
}

function toggleHamburger(event) {
  if (navBar.classList.contains('hidden')) {
    event.target.setAttribute('src', 'images/menu-close.svg');
    navBar.classList.add('show');
    navBar.classList.remove('hidden');
    mainSectionBottom.style.opacity = '.2';
  } else if (navBar.classList.contains('show')) {
    event.target.setAttribute('src', 'images/menu.svg');
    navBar.classList.add('hidden');
    navBar.classList.remove('show');
  }
}