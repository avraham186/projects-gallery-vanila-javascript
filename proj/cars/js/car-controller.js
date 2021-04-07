'use strict'

function onInit() {
    renderCars()
    renderVendors()
}

function renderVendors() {
    var vendors = getVendors();
    var strHTMLs = vendors.map(function(vendor){
        return `<option>${vendor}</option>`
    })
    document.querySelector('select[name=vendorList]').innerHTML = strHTMLs.join('');
}

function renderCars() {
    var cars = getCars()
    var strHtmls = cars.map(function (car) {
        return `
        <div class="car-preview">
            <img class="card-img-top" src="img/${car.vendor}.png" alt="Card image cap">
            <span class="delete-btn" onclick="onDeleteCar('${car.id}')">X</span>
            <div class="card-body">
                <h5 class="card-title">${car.vendor}</h5>
                <p class="card-text">max speed: ${car.maxSpeed}</p>
                <a href="#"  onclick="onReadCar('${car.id}')">Details</a>
                <a href="#" onclick="onUpdateCar('${car.id}')">Update</a>
            </div>
        </div> 
        `
    })
    document.querySelector('.cars-container').innerHTML = strHtmls.join('')
}

function onDeleteCar(carId) {
    deleteCar(carId)
    renderCars()
}

function onAddCar() {
    // var vendor = prompt('vendor?')
    var vendor = document.querySelector('select[name=vendorList]').value;
    addCar(vendor)
    renderCars()
}

function onUpdateCar(carId) {
    var newSpeed = +prompt('Speed?');
    updateCar(carId, newSpeed);
    renderCars();
}

function onReadCar(carId) {
    var car = getCarById(carId)
    var elModal = document.querySelector('.modal')
    elModal.querySelector('h5').innerText = car.vendor
    elModal.querySelector('h6').innerText = car.maxSpeed
    elModal.querySelector('p').innerText = car.desc
    elModal.hidden = false;

}

function onCloseModal() {
    document.querySelector('.modal').hidden = true
}

function onNextPage() {
    nextPage();
    renderCars();
}

function onSetFilter(txt) {
    setFilter({
        vendor: txt
    })
    renderCars();
}