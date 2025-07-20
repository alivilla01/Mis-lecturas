const shelf = document.getElementById('shelf');
const form = document.getElementById('book-form');
const coverUpload = document.getElementById('cover-upload');

let books = JSON.parse(localStorage.getItem('books')) || [];

function displayBooks() {
  shelf.innerHTML = '';
  books.forEach((book) => {
    const bookDiv = document.createElement('div');
    bookDiv.className = 'book';
    bookDiv.innerHTML = `
      <img src="${book.cover}" alt="${book.title}" />
      <h3>${book.title}</h3>
      <p><strong>${book.author}</strong></p>
      <p>${book.genre}</p>
      <p>${'⭐'.repeat(book.rating)}</p>
      <p class="small">${book.review}</p>
    `;
    shelf.appendChild(bookDiv);
  });
}

displayBooks();

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const genre = document.getElementById('genre').value;
  const review = document.getElementById('review').value;
  const rating = parseInt(document.getElementById('rating').value);

  const reader = new FileReader();
  const file = coverUpload.files[0];

  reader.onloadend = () => {
    const newBook = {
      title,
      author,
      genre,
      review,
      rating,
      cover: reader.result || ''
    };
    books.push(newBook);
    localStorage.setItem('books', JSON.stringify(books));
    displayBooks();
    form.reset();
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    reader.onloadend();
  }
});
