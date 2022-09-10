export default function generateCategorySummaryElement({
  name,
  activeNumber,
  archivedNumber,
}) {
  const categorySummaryElement = document.createElement('tr');

  categorySummaryElement.innerHTML = `
  <td>${name}</td>
  <td>${activeNumber}</td>
  <td>${archivedNumber}</td>
  `;

  return categorySummaryElement;
}
