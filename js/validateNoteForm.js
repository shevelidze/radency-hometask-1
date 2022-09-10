import { parseDates, InvalidDateError } from './datesString.js';
import Category from './Category.js';

export class InvalidNoteFormError extends Error {
  constructor() {
    super('Invalid note form. Please, check all the values.');
  }
}

export default function validateNoteForm(formData) {
  const name = formData.get('name');
  const datesString = formData.get('dates');
  const content = formData.get('content');
  const categoryIndexString = formData.get('categoryIndex');

  const result = { name, content };

  if (datesString.length > 0) {
    try {
      result.dates = parseDates(datesString);
    } catch (e) {
      if (e instanceof InvalidDateError) throw new InvalidNoteFormError();
      else throw e;
    }
  } else result.dates = [];

  result.categoryIndex = parseInt(categoryIndexString);

  if (
    !(
      result.categoryIndex >= 0 &&
      result.categoryIndex < Category.categories.length
    )
  )
    throw new InvalidNoteFormError();

  return result;
}
