import { generateDatesString, generateDateString } from './datesString.js';

export default class Note {
  constructor(name, content, dates, category) {
    this.name = name;
    this.content = content;
    this.category = category;
    this.dates = dates;
    this.creationDate = new Date();
    this.isArchived = false;
  }

  toRenderObject() {
    return {
      name: this.name,
      creationDate: generateDateString(this.creationDate),
      categoryName: this.category.name,
      content: this.content,
      dates: generateDatesString(this.dates),
      isArchived: this.isArchived,
      categoryIconUrl: this.category.iconUrl,
    };
  }
}
