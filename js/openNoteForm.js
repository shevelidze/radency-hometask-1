import generateNoteFormElement from './generateNoteFormElement.js';
import Category from './Category.js';
import validateNoteForm, { InvalidNoteFormError } from './validateNoteForm.js';
import Note from './Note.js';

const noteFormBackgroundElement = document.querySelector(
  '#note-form-background'
);

function closeNoteForm() {
  noteFormBackgroundElement.classList.remove('visible');
  document.querySelector('#note-form').remove();
}

export default function openNoteForm(noteIndex, notes, updateNotes) {
  function submitHandler(event) {
    const formData = new FormData(event.target);

    try {
      validateNoteForm(formData);
    } catch (e) {
      if (e instanceof InvalidNoteFormError) alert(e.message);
      else throw e;
    }

    if (typeof noteIndex === 'number') {
    } else {
      notes.push(
        new Note(
          formData.get('name'),
          formData.get('content'),
          [],
          Category.categories[parseInt(formData.get('categoryIndex'))]
        )
      );
    }

    updateNotes();
  }

  const formGenerationParameters = {
    submitHandler,
  };

  if (typeof noteIndex === 'number') {
    formGenerationParameters.initialValues = {
      ...notes[noteIndex].toRenderObject(),
      categoryIndex: Category.categories
        .indexOf(notes[noteIndex].category)
        .toString(),
    };
  }

  noteFormBackgroundElement.classList.add('visible');
  document.body.append(generateNoteFormElement(formGenerationParameters));
}

noteFormBackgroundElement.addEventListener('click', closeNoteForm);
