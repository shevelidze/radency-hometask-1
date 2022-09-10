import Category from './Category.js';
import Note from './Note.js';
import generateNoteElement from './generateNoteElement.js';
import openNoteForm from './openNoteForm.js';
import generateCategorySummaryElement from './generateCategorySummaryElement.js';

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
const summaryTableBodyElement = document.querySelector('#summary-table-body');

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

  summaryTableBodyElement.innerHTML = '';
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
