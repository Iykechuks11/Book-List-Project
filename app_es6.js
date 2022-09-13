// BOOK CONSTRUCTOR
class Book {
  constructor(title, author, isbn) {
    this.title = title
    this.author = author
    this.isbn = isbn
  }
}

// UI CONSTRUCTOR
class UI {
  addBookToList(book) {
    const list = document.getElementById("book-list")

    // CREATE A TABLE-ROW ELEMENT
    const row = document.createElement("tr")

    // INSERT COLS
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    `

    list.appendChild(row) 
  }

  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove()
    }
  }
  
  showAlert(message, className) {
    // CREATE DIV
    const div = document.createElement("div")
    // ADD CLASSES
    div.className = `alert ${className}`
    // ADD TEXT
    div.appendChild(document.createTextNode(message))
    // GET PARENT
    const container = document.querySelector(".container")
    // GET FORM
    const form = document.querySelector("#book-form")
    // INSERT ALERT
    container.insertBefore(div, form)
    // TIMEOUT AFTER 3 SEC
    setTimeout(function() {
      document.querySelector(".alert").remove()
    }, 3000)
  }
  
  clearFields() {
    document.getElementById("title").value = ""
    document.getElementById("author").value = ""
    document.getElementById("isbn").value = ""
  }
}

// LOCAL STORAGE CLASS
class Store {
  static getBooks() {
    let books;
    if(localStorage.getItem("books") === null) {
      books = []
    } else {
      books = JSON.parse(localStorage.getItem("books"))
    }

    return books;

  } 

  static displayBooks() {
    const books = Store.getBooks()

    books.forEach(function(book) {
      const ui = new UI

      // ADD BOOK TO UI
      ui.addBookToList(book)
    })

  }

  static addBook(book) {
    const books = Store.getBooks()

    books.push(book)

    localStorage.setItem("books", JSON.stringify(books))

  }

  static removeBook(isbn, index) {
    const books = Store.getBooks()

    books.forEach(function(book, index) {
      if(book.isbn === isbn) {
        books.splice(index, 1)
      }
    })
    localStorage.setItem("books", JSON.stringify(books))
  }
}

// DOM LOAD EVENT
document.addEventListener("DOMContentLoaded", Store.displayBooks)

// EVENT LISTENERS FOR ADD BOOK
document.getElementById("book-form").addEventListener("submit", (e) => {
  // GET FORM VALUES
  const title = document.getElementById("title").value,
  author = document.getElementById("author").value,
  isbn = document.getElementById("isbn").value

  // INSTANTIATING A BOOK
  const book = new Book(title, author, isbn)

  // INSTANTIATING THE UI
  const ui = new UI()


  // VALIDATE
  if (title === "" || author === "" || isbn === "") {
    // ERROR ALERT
    ui.showAlert("Please fill in all fields", "error")
  } else {
    // ADD BOOK TO LIST
    ui.addBookToList(book)

    // ADD TO LOCAL STORAGE
    Store.addBook(book);

    // SHOW SUCCESS
    ui.showAlert("Book Added", "success")

    // CLEAR FIELDS
    ui.clearFields()
  }

  e.preventDefault()
})

// EVENT LISTENER FOR DELETE
document.getElementById("book-list").addEventListener("click", function(e) {
  
  // INSTANTIATING THE UI
  const ui = new UI()

  // DELETE BOOK
  ui.deleteBook(e.target)

  // REMOVE FROM LOCAL STORAGE
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent)

  // SHOW MESSAGE
  ui.showAlert("Book Removed!", "success")

  e.preventDefault()
})