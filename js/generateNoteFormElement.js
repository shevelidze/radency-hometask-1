import Category from './Category.js';

function generateCategoryOption(category, value) {
  return `<option value=${value}>${category.name}</option>`;
}

export default function generateNoteFormElement({
  submitHandler,
  initialValues,
}) {
  const noteFormElement = document.createElement('form');

  noteFormElement.id = 'note-form';
  noteFormElement.innerHTML = `
  <input type="text" placeholder="Name" name="name" required class="regular-input"></input>
  <input type="text" placeholder="Dates" name="dates" class="regular-input"></input>
  <input type="text" placeholder="Content" name="content" class="regular-input"></input>
  <select name="categoryIndex" class="regular-input">
    ${Category.categories.map(generateCategoryOption).join('')}
  </select>
  <input type="submit" class="regular-button"></input>
  `;

  for (const valueKey in initialValues) {
    const inputElement = noteFormElement.querySelector(`*[name="${valueKey}"`);
    if (inputElement !== null) inputElement.value = initialValues[valueKey];
  }

  noteFormElement.addEventListener('submit', (event) => {
    event.preventDefault();
    submitHandler(event);
  });

  return noteFormElement;
}
