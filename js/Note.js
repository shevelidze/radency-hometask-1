function generateDatesString(dates) {
  return dates.map((date) => date.toLocaleDateString()).join(', ');
}

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
      creationDate: this.creationDate.toLocaleDateString(),
      categoryName: this.category.name,
      content: this.content,
      dates: generateDatesString(this.dates),
      isArchived: this.isArchived,
    };
  }
}
