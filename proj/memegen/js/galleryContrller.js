'use strict'


renderGallery()
function renderGallery() {
    var image = getImgToDisplay()
    let strHTML = ''
    strHTML += image.map(img => {
      return `<img src="${img.url}" onclick="onChangeCanvasImg(${img.id})">`  
    }).join('')
    document.querySelector('.gallery').innerHTML = strHTML
}

function onChangeCanvasImg(imgId) {
  let canvas = document.querySelector('canvas')
    let image = getImageById(imgId)
  gCurrImg = image
  document.querySelector('.screen').style.display = 'grid'
  document.querySelector('.gallery').style.display= 'none'
    imgDraw()
}

function onGalleryClick() {
  document.querySelector('.screen').style.display = 'none'
  document.querySelector('.gallery').style.display= 'grid'
}