'usu strict'
var gprotfolios = [
    {
        id: _makeId(),
        name: 'Avraham',
        title: 'Mine Sweepers',
        desc: 'minesweeper game',
        url: '<a href="./proj/mine-sweeper/index.html">Click Here For The Project!</a>',
        brand:'game',
        imgUrl: './img/portfolio/minesweeper.png',
        publishedAt: 12323564325,
        labels: ["Matrix", "keyboard events"]
    },
    {
        id: _makeId(),
        name: 'Avraham',
        title: 'Book Shop',
        desc: 'bookshop',
        url: '<a href="./proj/book-shop/index.html">Click Here For The Project!</a>',
        brand:'game',
        imgUrl:'./img/portfolio/bookShop.jpg',
        publishedAt: 12323564325,
        labels: ["Matrix", "keyboard events"]
    },
    {
        id: _makeId(),
        name: 'Avraham',
        title: 'Cars',
        desc: 'car shop',
        url: '<a href="./proj/cars/index.html">Click Here For The Project!</a>',
        brand:'game',
        imgUrl:'./img/portfolio/carShop.png',
        publishedAt: 12323564325,
        labels: ["Matrix", "keyboard events"]
    },
    {
        id: _makeId(),
        name: 'Avraham',
        title: 'Todos',
        desc: 'todo app ',
        url: '<a href="./proj/todos/index.html">Click Here For The Project!</a>',
        brand:'game',
        imgUrl:'./img/portfolio/todoApp.png',
        publishedAt: 12323564325,
        labels: ["Matrix", "keyboard events"]
    },
    {
        id: _makeId(),
        name: 'Avraham',
        title: 'ball board',
        desc: 'ballboard game',
        url: '<a href="./proj/ball-board/index.html">Click Here For The Project!</a>',
        brand:'game',
        imgUrl:'./img/portfolio/ballBoard.jpg',
        publishedAt: 12323564325,
        labels: ["Matrix", "keyboard events"]
    },
    {
        id: _makeId(),
        name: 'Avraham',
        title: 'meme generator',
        desc: 'meme generator app',
        url: '<a href="./proj/memegen/index.html">Click Here For The Project!</a>',
        brand:'game',
        imgUrl:'./img/portfolio/memeGen.jpg',
        publishedAt: 12323564325,
        labels: ["Matrix", "keyboard events"]
    }
]

function getPortfolio() {
    return gprotfolios
}


function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

