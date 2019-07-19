class Idea {
  constructor(ideaObj) {
    this.id = ideaObj.id || Date.now();
    this.title = ideaObj.title;
    this.body = ideaObj.body;
    this.star = ideaObj.star || false;
    this.quality = ideaObj.quality || 0;
  }

  saveToStorage(array) {
    localStorage.setItem("ideaArray", JSON.stringify(array));
  }

  deleteFromStorage(index, array) {
    array.splice(index, 1)
    this.saveToStorage(array);
  }

  updateIdea(newTitle, array) {
    //Use saveToStorage

  }

  changeQualityScore(event, voteClass) {
    this.updateQuality(qualityArray, ideasArray, voteClass);
  }

  setQualityText(event) {
    var newQuality = event.target.closest('.section__article').querySelector('.quality');
    newQuality.innerText = qualityArray[this.quality];
  }
  
  updateQuality(qualityArray, ideaArray, buttonClass) {
    if(buttonClass === 'button__img--upvote' && !(this.quality >= qualityArray.length -1 || this.quality < 0)){
      this.quality++;
    } else if(buttonClass === 'button__img--downvote' && (this.quality > 0)) {
      this.quality--;
    } else {
      return
    }
    this.saveToStorage(ideaArray);
  }

  updateStar() {
    this.star = !this.star;
  }

}