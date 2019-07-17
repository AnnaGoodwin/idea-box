class Idea {
  constructor(title, body) {
    this.id = Date.now();
    this.title = title;
    this.body = body;
    this.star = false;
    this.quality = 0;
  }

  saveToStorage(array) {
    localStorage.setItem("ideaArray", JSON.stringify(array));
  }

  deleteFromStorage() {

  }

  updateIdea() {

  }

  updateQuality() {

  }

}