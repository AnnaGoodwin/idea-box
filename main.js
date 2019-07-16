// *******Variables******
var saveButton = document.querySelector('.form__button--save');
var titleInput = document.querySelector('.form__input--title');
var bodyInput = document.querySelector('.form__textarea--body');
var form = document.querySelector('.section__form');
var mainSectionBottom = document.querySelector('.main__section--bottom');
var titleInput = document.querySelector('.form__input--title');
var textBody = document.querySelector('.form__textarea--body');

//**** On Page Load ******
disableSaveButton();


// Event Listeners
form.addEventListener('keyup', disableSaveButton);
saveButton.addEventListener('click', handleSaveButton);


// Functions
function disableSaveButton(){
  if (titleInput.value === '' || bodyInput.value === '') {
    saveButton.disabled = true;
  } else {
    saveButton.disabled = false;
  }
}

function handleSaveButton() {
  displayIdeaCard(titleInput.value, textBody.value);
}

function displayIdeaCard(ideaTitle, ideaBody) {
  mainSectionBottom.insertAdjacentHTML('afterbegin',
    `<article class="section__article">
      <header class="article__header">
        <img class="header__img--star" src="" alt="star">
        <img class="header__img--x" src="" alt="x">
      </header>
      <div class="article__div">
        <h3 class="div__h3--title">${ideaTitle}</h3>
        <p class="div__p--text">${ideaBody}</p>
      </div>
      <footer class="article__footer">
        <button class="footer__button--upvote" type="button">
          <img class="button__img--upvote" src="" alt="upvote">
        </button>
        <p class="footer__p--quality">Quality:<span>Swill</span></p>
        <button class="footer__button--downvote" type="button">
          <img class="button__img--downvote" src="" alt="downvote">
        </button>
      </footer>
    </article>`)
}