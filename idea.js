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

  deleteFromStorage(identity) {
    console.log("id", identity)
    ideasArray = ideasArray.filter(idea => { return parseInt(identity) !== idea.id})
    this.saveToStorage(ideasArray)
    console.log(ideasArray)
    // then run save to storage again (invoke)
  }

  updateIdea() {

  }

  updateQuality() {

  }

}