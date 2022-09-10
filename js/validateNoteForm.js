export class InvalidNoteFormError extends Error {
  constructor() {
    super('Invalid note form. Please, check all the values.');
  }
}

export default function validateNoteForm(formData) {}
