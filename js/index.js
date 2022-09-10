import Category from './Category.js';
import Note from './Note.js';
import generateNoteElement from './generateNoteElement.js';
import openNoteForm from './openNoteForm.js';
import generateCategorySummaryElement from './generateCategorySummaryElement.js';

const notes = [
  new Note(
    'Note #1',
    'Note #1 content',
    [new Date('2022-03-02')],
    Category.categories[0]
  ),
  new Note('Note #2', 'Note #2 content', [], Category.categories[1]),
  new Note(
    'Note #3',
    '',
    [new Date('2023-09-09'), new Date('2023-09-10')],
    Category.categories[2]
  ),
  new Note(
    'Note #4',
    'Note #4 content',
    [
      new Date('2022-10-10'),
      new Date('2022-10-10'),
      new Date('2022-10-10'),
      new Date('2022-10-10'),
    ],
    Category.categories[2]
  ),
  new Note(
    'Note #5',
    'Note #5 content',
    [new Date('2023-12-12')],
    Category.categories[1]
  ),
  new Note('Note #6', '', [], Category.categories[0]),
  new Note('Note #7', 'Note #7 content', [], Category.categories[1]),
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
