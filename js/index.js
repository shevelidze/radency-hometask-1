import Category from './Category.js';
import Note from './Note.js';
import generateNoteElement from './generateNoteElement.js';
import openNoteForm from './openNoteForm.js';
import generateCategorySummaryElement from './generateCategorySummaryElement.js';

const notes = [
  new Note(
    'Shopping',
    'Go shopping on 02/03/2022 or 05/03/2022.',
    Category.categories[0]
  ),
  new Note('Random thought', 'Random thought #1', Category.categories[1]),
  new Note(
    'Docktor',
    'Date of the appointment is 01/01/2022.',
    Category.categories[0]
  ),
  new Note('Note #4', 'Note #4 content', Category.categories[2]),
  new Note('Note #5', 'Note #5 content', Category.categories[1]),
  new Note(
    'Dantist appointment',
    `I’m gonna have a dentist appointment on the 3/5/2021,
I moved it from 5/5/2021`,
    Category.categories[0]
  ),
  new Note('Note #7', 'Note #7 content', Category.categories[1]),
];

let showArchived = false;

const notesTableBodyElement = document.querySelector('#notes-table-body');
const summaryTableBodyElement = document.querySelector('#summary-table-body');

function updateNotes() {
  if (showArchived) notesTableBodyElement.classList.add('show-archived');
  else notesTableBodyElement.classList.remove('show-archived');

  notesTableBodyElement.textContent = '';
  notesTableBodyElement.append(
    ...notes
      .filter((note) => note.isArchived === showArchived)
      .map((note) =>
        generateNoteElement({
          ...note.toRenderObject(),
          editClickHandler: () => {
            openNoteForm(notes.indexOf(note), notes, updateNotes);
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

  summaryTableBodyElement.textContent = '';
  summaryTableBodyElement.append(
    ...Category.categories.map((category) =>
      generateCategorySummaryElement({
        name: category.name,
        iconUrl: category.iconUrl,
        activeNumber: notes.filter(
          (note) => note.category === category && !note.isArchived
        ).length,
        archivedNumber: notes.filter(
          (note) => note.category === category && note.isArchived
        ).length,
      })
    )
  );
}

updateNotes();

document
  .querySelector('#head-archive-button')
  .addEventListener('click', (event) => {
    showArchived = !showArchived;

    event.target.classList.remove('from-archive-button');
    event.target.classList.remove('to-archive-button');

    event.target.classList.add(
      showArchived ? 'from-archive-button' : 'to-archive-button'
    );

    updateNotes();
  });

document.querySelector('#new-note-button').addEventListener('click', () => {
  openNoteForm(null, notes, updateNotes);
});
