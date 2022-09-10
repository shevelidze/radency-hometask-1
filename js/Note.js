function findDates(string) {
  return string.match(/\d+\/\d+\/\d+/g) || [];
}

export default class Note {
  constructor(name, content, category) {
    this.name = name;
    this.content = content;
    this.category = category;
    this.creationDate = new Date();
    this.isArchived = false;
  }

  toRenderObject() {
    return {
      name: this.name,
      creationDate: this.creationDate.toLocaleDateString(),
      categoryName: this.category.name,
      content: this.content,
      dates: findDates(this.content).join(', '),
      isArchived: this.isArchived,
      categoryIconUrl: this.category.iconUrl,
    };
  }
}
