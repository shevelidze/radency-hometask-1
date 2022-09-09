export default class Note {
  constructor(name, content, dates, category) {
    this.name = name;
    this.content = content;
    this.category = category;
    this.dates = dates;
    this.creationDate = new Date();
    this.isArchived = false;
  }
}
