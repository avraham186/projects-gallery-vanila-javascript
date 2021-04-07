'use strict'

function oninit() {
    renderBooks()
}
function renderBooks() {
    var books = getBooksForDisplay()
    var strHtmls = books.map(function (book) {
        return `<tr><td>${book.id}</td>
        <td>${book.name}</td>
        <td>${book.price}</td>
        <td><button onclick="onRead(${book.id})">read</button><button onclick="onUpdateBook(${book.id})">update</button>
        <button onclick="onRemoveBook(${book.id})">delete</button>
        <button onclick="onPlusRate(${book.id})"> + </button>
        <span>${book.rate}</span>
        <button onclick="onMinusRate(${book.id})"> - </button></td></tr>`
    }).join('')
    document.querySelector('.books-table table tbody').innerHTML = strHtmls
}

function onRemoveBook(bookId) {
    removeBook(bookId)
    renderBooks()
}

function onAddBook() {
    var bookName = prompt('what is the name of the book?')
    var bookPrice = +prompt('what is the price of the book?')
    addBook(bookName,bookPrice)
    renderBooks()
}

function onUpdateBook(bookId) {
    var newbookPrice = +prompt('what is the new price?')
    updateBook(bookId, newbookPrice)
    renderBooks()
}

function onRead(id) {
    readDescription(id)
}

function onPlusRate(bookId) {
    plusRate(bookId)
    renderBooks()
}
function onMinusRate(bookId) {
    minusRate(bookId)
    renderBooks()
}

function onCloseModal() {
    document.querySelector('.modal-container').style.display = 'none'
}

function onSetSort(sortBy) {
    setSort(sortBy)
    renderBooks()
}