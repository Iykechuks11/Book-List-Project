// BOOK CONSTRUCTOR

function Book(title, author, isbn) {
  this.title = title
  this.author = author
  this.isbn = isbn
}

// UI CONSTRUCTOR
function UI() {}

// PROTOTYPE 1
// ADD BOOK TO LIST
UI.prototype.addBookToList = function(book) {
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

// PROTOTYPE 2
UI.prototype.clearFields = function() {
  document.getElementById("title").value = ""
  document.getElementById("author").value = ""
  document.getElementById("isbn").value = ""
}

// PROTOTYPE 3
// SHOW ALERT
UI.prototype.showAlert = function(message, className) {
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

// PROTOTYPE 4
// DELETE BOOK
UI.prototype.deleteBook = function(target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove()
  }
}

// EVENT LISTENERS FOR ADD
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

  // SHOW MESSAGE
  ui.showAlert("Book Removed!", "success")

  e.preventDefault()
})