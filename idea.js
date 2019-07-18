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

  deleteFromStorage(index) {
    ideasArray.splice(index, 1)
    this.saveToStorage(ideasArray)
  }

  updateIdea() {

  }

  updateQuality() {

  }

  updateStar() {
    this.star = !this.star;
  }

}