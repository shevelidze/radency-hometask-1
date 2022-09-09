export default function generateNoteElement({
  name,
  creationDate,
  categoryName,
  content,
  dates,
  isArchived,
  deleteClickHandler,
  archiveClickHandler,
}) {
  const noteElement = document.createElement('tr');

  noteElement.innerHTML = `
    <td>${name}</td>
    <td>${creationDate}</td>
    <td>${categoryName}</td>
    <td>${content}</td>
    <td>${dates}</td>
  `;

  const deleteButtonElement = document.createElement('button');

  deleteButtonElement.classList = 'delete-button';
  deleteButtonElement.addEventListener('click', deleteClickHandler);

  const deleteTdElement = document.createElement('td');
  deleteTdElement.append(deleteButtonElement);

  const archiveButtonElement = document.createElement('button');

  archiveButtonElement.className = isArchived
    ? 'from-archive-button'
    : 'to-archive-button';
  archiveButtonElement.addEventListener('click', archiveClickHandler);

  const archiveTdElement = document.createElement('td');
  archiveTdElement.append(archiveButtonElement);

  noteElement.append(archiveTdElement, deleteTdElement);

  return noteElement;
}
