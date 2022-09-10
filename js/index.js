import Category from './Category.js';
import Note from './Note.js';
import generateNoteElement from './generateNoteElement.js';
import openNoteForm from './openNoteForm.js';

const notes = [
  new Note(
    'Note #1',
    'Note #1 content',
    [new Date(), new Date()],
    Category.categories[0]
  ),
  new Note(
    'Note #1',
    'Note #1 content',
    [new Date(), new Date()],
    Category.categories[1]
  ),
];

let showArchived = false;

const notesTableBodyElement = document.querySelector('#notes-table-body');

function updateNotes() {
  if (showArchived) notesTableBodyElement.classList.add('show-archived');
  else notesTableBodyElement.classList.remove('show-archived');

  notesTableBodyElement.innerHTML = '';

  notesTableBodyElement.append(
    ...notes
      .filter((note) => note.isArchived === showArchived)
      .map((note, noteIndex) =>
        generateNoteElement({
          ...note.toRenderObject(),
          editClickHandler: () => {
            openNoteForm(noteIndex, notes, updateNotes);
          },
          archiveClickHandler: () => {
            note.isArchived = !note.isArchived;
            updateNotes();
          },
          deleteClickHandler: () => {
            notes.splice(notes.indexOf(note), 1);
            updateNotes();
          },
        })
      )
  );
}

updateNotes();

document
  .querySelector('#head-archive-button')
  .addEventListener('click', (event) => {
    showArchived = !showArchived;

    event.target.className = showArchived
      ? 'from-archive-button'
      : 'to-archive-button';

    updateNotes();
  });

document
  .querySelector('#new-note-button')
  .addEventListener('click', (event) => {
    openNoteForm(null, notes, updateNotes);
  });
