class Idea {
  constructor(title, body) {
    this.id = Date.now();
    this.title = title;
    this.body = body;
    this.star = false;
    this.quality = 0;
  }

  saveToStorage(obj) {
    // var savedIdea = 
    localStorage.setItem("ideaArray", JSON.stringify(obj));
    // console.log(savedIdea);
  }

  deleteFromStorage() {

  }

  updateIdea() {

  }

  updateQuality() {

  }

}