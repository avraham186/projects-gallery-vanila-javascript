'use strict'

function onInit() {
    let canvas = document.querySelector('canvas')
    init(canvas)
}

function onTextChange(elText) {
    textChange(elText)
}
function onTextValue() {
    getText()
}

function onIncreaseText() {
    increaseText()
}

function onDecreaseText() {
    decreaseText()
}

function onTextUp() {
    textUp()
}
function onTextDown() {
    textDown()
}
function onTextLeft() {
    textLeft()
}
function onTextRight() {
    textRight()
}
function onSwitchLine() {
    switchLine()
    document.querySelector('.input-txt').value = getText()
}
function onAddLine() {
    addLine()
    document.querySelector('.input-txt').value = getText()
}
function onStrokeColor(color) {
    strokeColor(color)
}
function onFillColor(color) {
    fillColor(color)
}

function onFontChange(font) {
    fontChang(font)
}
function onDownloadPrep(elBtn) {
    downloadPrep()
    let strHtml = `<a href="#" class="download-img" 
        onclick="onDownload(event,this)" download="my-img.jpg">📥</a>`
    elBtn.innerHTML = strHtml
    let elLink = document.querySelector('.download-img')
    setTimeout(() => {
        elLink.click()
    },20)

}
function onDownload(ev, elLink) {
    ev.stopPropagation()
    let elCanvas = document.querySelector('canvas')
    var imgContent = elCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
    let elBtn = document.querySelector('.download')
    elBtn.innerHTML='<a class="download-img" href="#">📥</a>'
    endDownload()
}
function onAddSticker(sticker) {
    addSticker(sticker)
}
function onRemoveLine() {
    document.querySelector('.input-txt').value = getText()
    removeLine()
}
