export default class Category {
    constructor(name, iconUrl) {
        this.name = name;
        this.iconUrl = iconUrl;
    }
    static categories = [
        new Category("Task", "/images/task.svg"),
        new Category("Random thought", "/images/thought.svg"),
        new Category("Idea", "/images/idea.svg"),
    ];
}
