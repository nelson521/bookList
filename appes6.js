// Book Constructor
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI constructor
class UI {
  addBookToList(book) {
    // Make a list
    const list = document.getElementById('book-list');
    // Create tr element
    const row = document.createElement('tr');
    // Insert cols
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `;

    list.appendChild(row);
  }

  showAlert(message, className) {
    // Create div
    const div = document.createElement('div');
    // Add classes
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector('.container');
    // Get Form
    const form = document.querySelector('#book-form');
    // Insert alert
    container.insertBefore(div, form);

    // timeout after three seconds
    setTimeout(function () {
      document.querySelector('.alert').remove();
    }, 3000);
  }

  deleteBook(target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}

// Local storage class
class Store {
  static getBooks() {
    books;
    if (localStorage.getItem('books') === null) {
      let books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
  }

  static displayBooks() {}

  static addBook() {}

  static removeBook() {}
}

// Event Listener for add book
document.getElementById('book-form').addEventListener('submit', function (e) {
  // Get forms values
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;

  // Instantiate Book
  const book = new Book(title, author, isbn);

  // Instantiate ui
  const ui = new UI();

  // Validate
  if (title === '' || author === '' || isbn === '') {
    // Error alert
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    // Add book to list
    ui.addBookToList(book);

    // Add to LS
    Store.addBook(book);

    // Clear Fields
    ui.clearFields();
  }
  e.preventDefault();
});

// Event listener for delete
document.getElementById('book-list').addEventListener('click', function (e) {
  // Instantiate UI
  const ui = new UI();
  // Delete Book
  ui.deleteBook(e.target);

  // show message
  ui.showAlert(`Book Removed`, `success`);
  e.preventDefault();
});
