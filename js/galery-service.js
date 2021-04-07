'usu strict'
var gprotfolios = [
    {
        id: _makeId(),
        name: 'Avraham',
        title: 'Mine Sweepers',
        desc: 'lorem impsum lorem ipsum',
        url: '<a href="./proj/mine-sweeper/index.html">Click Here For The Project!</a>',
        brand:'game',
        imgUrl: './img/portfolio/01-full.png',
        publishedAt: 12323564325,
        labels: ["Matrix", "keyboard events"]
    },
    {
        id: _makeId(),
        name: 'Avraham',
        title: 'Book Shop',
        desc: 'lorem impsum lorem ipsum',
        url: '<a href="./proj/book-shop/index.html">Click Here For The Project!</a>',
        brand:'game',
        imgUrl:'./img/portfolio/02-full.jpg',
        publishedAt: 12323564325,
        labels: ["Matrix", "keyboard events"]
    },
    {
        id: _makeId(),
        name: 'Avraham',
        title: 'Cars',
        desc: 'lorem impsum lorem ipsum',
        url: '<a href="./proj/cars/index.html">Click Here For The Project!</a>',
        brand:'game',
        imgUrl:'./img/portfolio/03-full.png',
        publishedAt: 12323564325,
        labels: ["Matrix", "keyboard events"]
    },
    {
        id: _makeId(),
        name: 'Avraham',
        title: 'Todos',
        desc: 'lorem impsum lorem ipsum',
        url: '<a href="./proj/todos/index.html">Click Here For The Project!</a>',
        brand:'game',
        imgUrl:'./img/portfolio/04-full.png',
        publishedAt: 12323564325,
        labels: ["Matrix", "keyboard events"]
    },
    {
        id: _makeId(),
        name: 'Avraham',
        title: 'ball board',
        desc: 'lorem impsum lorem ipsum',
        url: '<a href="./proj/ball-board/index.html">Click Here For The Project!</a>',
        brand:'game',
        imgUrl:'./img/portfolio/05-full.jpg',
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

