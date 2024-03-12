const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

interface Book {
  title: string;
  author: string;
}

function addNewBooks(book: Book): void {
  books.push(book);
}

export { addNewBooks };
export default module;
