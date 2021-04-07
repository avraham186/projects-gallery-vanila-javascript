'use strict'
const KEY = 'cars';
const PAGE_SIZE = 5;

var gPageIdx = 0;
var gVendors = ['audi', 'fiat', 'suzuki', 'honda']
var gCars;
var gFilterBy = {
    vendor: '',
    maxSpeed: Infinity
}

function setFilter(filterBy) {
    gFilterBy.vendor = filterBy.vendor;
}

_createCars();

function getCars() {
    var cars = gCars.filter(function (car) {
        return car.vendor.includes(gFilterBy.vendor) &&
            car.maxSpeed <= gFilterBy.maxSpeed
    })

    var startIdx = gPageIdx * PAGE_SIZE;
    cars.slice(startIdx, startIdx + PAGE_SIZE)
    return cars;
}

function getVendors() {
    return gVendors;
}

function deleteCar(carId) {
    var carIdx = gCars.findIndex(function (car) {
        return carId === car.id
    })
    gCars.splice(carIdx, 1)
    _saveCarsToStorage();

}

function addCar(vendor) {
    var car = _createCar(vendor)
    gCars.unshift(car)
    _saveCarsToStorage();
}

function getCarById(carId) {
    var car = gCars.find(function (car) {
        return carId === car.id
    })
    return car
}

function updateCar(carId, newSpeed) {
    var carIdx = gCars.findIndex(function (car) {
        return car.id === carId;
    })
    gCars[carIdx].maxSpeed = newSpeed;
    _saveCarsToStorage();
}

function _createCar(vendor) {
    return {
        id: makeId(),
        vendor: vendor,
        maxSpeed: getRandomIntInclusive(1, 200),
        desc: makeLorem()
    }
}

function _createCars() {
    var cars = loadFromStorage(KEY)
    if (!cars || !cars.length) {
        cars = []
        for (var i = 0; i < 21; i++) {
            var vendor = gVendors[getRandomIntInclusive(0, gVendors.length - 1)]
            cars.push(_createCar(vendor))
        }
    }
    gCars = cars;
    _saveCarsToStorage();
}

function _saveCarsToStorage() {
    saveToStorage(KEY, gCars)
}

function nextPage() {
    gPageIdx++;
    if (gPageIdx * PAGE_SIZE >= gCars.length) {
        gPageIdx = 0;
    }
}


