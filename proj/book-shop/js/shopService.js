'use strict'

var gBooks = [
    { id: _makeId(), name: 'In the Wheat Field', price: '$50', imgUrl: '../img/book1image.jpg', description: getLorem(60), rate: 0 },
    { id: _makeId(), name: 'Jungle', price: '$60', imgUrl: '../img/book2image.jpg', description: getLorem(60), rate: 0 },
    { id: _makeId(), name: 'Over the Horizon', price: '$40', imgUrl: '../img/book3image.jpg', description: getLorem(60), rate: 0 },
]

setToStorage()
function setToStorage() {
    localStorage.setItem('books', JSON.stringify(gBooks))
}

function getBooksForDisplay() {
    return gBooks
}

function removeBook(bookId) {
    var bookToRemove = gBooks.findIndex(function (book) {
        return +book.id === bookId
    })
    gBooks.splice(bookToRemove, 1)
}

function addBook(bookName, bookPrice) {
    gBooks.push({
        id: _makeId(),
        name: bookName,
        price: '$' + bookPrice,
        imgUrl: '../image/bookName.jpg',
        description: getLorem(60),
        rate: 0
    })
}

function updateBook(bookId, newbookPrice) {
    var bookToUpdate = gBooks.findIndex(function (book) {
        return +book.id === bookId
    })
    gBooks[bookToUpdate].price = '$'+newbookPrice
}

function readDescription(id) {
    var desBook = gBooks.find(function (book) {
        return +book.id === id
    })
    var elModalcontainer = document.querySelector('.modal-container')
    var elModal = document.querySelector('.modal')
    var elModalPic = document.querySelector('.book-pic')
    elModalcontainer.style.display = 'block'
    elModal.innerText = desBook.description
    elModalPic.innerHTML = `<img src="${desBook.imgUrl}">   ${desBook.name}`
}

function plusRate(bookId) {
    var bookRate = gBooks.find(function (book) {
        return bookId === +book.id
    })
    if(bookRate.rate < 10) bookRate.rate++
}

function minusRate(bookId) {
    var bookRate = gBooks.find(function (book) {
        return bookId === +book.id
    })
    if(bookRate.rate > 0) bookRate.rate--
}

function setSort(sortBy) {
    if (sortBy === 'title') {
        gBooks.sort(function (bookA, bookB) {
            if (bookA.name > bookB.name) return 1;
            if (bookB.name > bookA.name) return -1;
            return 0;
        })
    } else {
        if (sortBy === 'price') {
            gBooks.sort(function (bookA, bookB) {
                if (bookA.price > bookB.price) return 1;
                if (bookB.price > bookA.price) return -1;
                return 0;
            })
        }
    }
}


    function _makeId(length = 5) {
        var txt = '';
        var possible = '0123456789';
        for (var i = 0; i < length; i++) {
            txt += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return txt
    }

    // Define getLorem() - returns lorem at the size asked()
    function getLorem(size) {
        var lorem = '';
        for (var i = 0; i < size; i++) {
            lorem += generateWord(getRandomInt(3, 10));
        }
        return lorem;
    }
    // Define generateWord() - returns word at the size asked
    function generateWord(size) {
        var ltr = 'abcdefghijklmnopqrstuvwxyz';
        var word = '';
        for (var i = 0; i < size; i++) {
            word += ltr.charAt(getRandomInt(0, ltr.length));
        }
        return word + ' ';
    }
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }
