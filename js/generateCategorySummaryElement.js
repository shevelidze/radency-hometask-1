export default function generateCategorySummaryElement({
  iconUrl,
  name,
  activeNumber,
  archivedNumber,
}) {
  const categorySummaryElement = document.createElement('tr');

  categorySummaryElement.innerHTML = `
  <td><img src=${iconUrl} alt="Category icon" class="category-icon"></img></td>
  <td>${name}</td>
  <td>${activeNumber}</td>
  <td>${archivedNumber}</td>
  `;

  return categorySummaryElement;
}
