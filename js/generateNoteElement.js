function wrapIntoTd(element) {
  const tdElement = document.createElement('td');

  tdElement.append(element);

  return tdElement;
}

export default function generateNoteElement({
  name,
  creationDate,
  categoryName,
  content,
  dates,
  isArchived,
  editClickHandler,
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

  const editButtonElement = document.createElement('button');

  editButtonElement.classList = 'edit-button';
  editButtonElement.addEventListener('click', editClickHandler);

  const deleteButtonElement = document.createElement('button');

  deleteButtonElement.classList = 'delete-button';
  deleteButtonElement.addEventListener('click', deleteClickHandler);

  const archiveButtonElement = document.createElement('button');

  archiveButtonElement.className = isArchived
    ? 'from-archive-button'
    : 'to-archive-button';
  archiveButtonElement.addEventListener('click', archiveClickHandler);

  noteElement.append(
    wrapIntoTd(editButtonElement),
    wrapIntoTd(archiveButtonElement),
    wrapIntoTd(deleteButtonElement)
  );

  return noteElement;
}
