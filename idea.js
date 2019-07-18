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
    this.saveToStorage(array)
  }

  updateIdea(newTitle, array) {
    //Use saveToStorage

  }

  updateQuality(array) {
    if(this.quality > array.length -1 || this.quality < 0) {
      return
    } else {
    this.quality++
    }
  }

  updateStar() {
    this.star = !this.star;
  }

}