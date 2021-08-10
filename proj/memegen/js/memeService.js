'use strict'
var gImgs = [
    { id: 1, url: './meme-imgs/1.jpg', keywords: ['happy'] },
    { id: 2, url: './meme-imgs/2.jpg', keywords: ['happy'] },
    { id: 3, url: './meme-imgs/3.jpg', keywords: ['happy'] },
    { id: 4, url: './meme-imgs/4.jpg', keywords: ['happy'] },
    { id: 5, url: './meme-imgs/5.jpg', keywords: ['happy'] },
    { id: 6, url: './meme-imgs/6.jpg', keywords: ['happy'] },
    { id: 7, url: './meme-imgs/7.jpg', keywords: ['happy'] },
    { id: 8, url: './meme-imgs/8.jpg', keywords: ['happy'] },
    { id: 9, url: './meme-imgs/9.jpg', keywords: ['happy'] },
    { id: 10, url: './meme-imgs/10.jpg', keywords: ['happy'] },
    { id: 11, url: './meme-imgs/11.jpg', keywords: ['happy'] },
    { id: 12, url: './meme-imgs/12.jpg', keywords: ['happy'] },
    { id: 13, url: './meme-imgs/13.jpg', keywords: ['happy'] },
    { id: 14, url: './meme-imgs/14.jpg', keywords: ['happy'] },
    { id: 15, url: './meme-imgs/15.jpg', keywords: ['happy'] },
    { id: 16, url: './meme-imgs/16.jpg', keywords: ['happy'] },
    { id: 17, url: './meme-imgs/17.jpg', keywords: ['happy'] },
    { id: 18, url: './meme-imgs/18.jpg', keywords: ['happy'] }
]
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I never eat Falafel',
            size: 30,
            align: 'top',
            stroke: 'black',
            fill: 'white',
            location: {
                x: 250,
                y: 70
            }
        },
        {
            txt: 'I never eat Falafel',
            size: 30,
            align: 'top',
            stroke: 'black',
            fill: 'white',
            location: {
                x: 250,
                y: 470
            }
        }
    ]
}

var gCanvas
var gCtx
var gCurrImg = gImgs[0]
var gFontFamily = 'IMPACT'
var gIsDownload = false

function init(canvas) {
    gCanvas = canvas
    gCtx = canvas.getContext('2d')
}

function imgDraw() {
    let img = new Image()
    img.src = gCurrImg.url
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        gMeme.lines.forEach((line, idx) => {
            drawTextOnImg(line.txt,
                gMeme.lines[idx].size,
                gMeme.lines[idx].stroke,
                gMeme.lines[idx].fill,
                gMeme.lines[idx].align,
                gMeme.lines[idx].location.x,
                gMeme.lines[idx].location.y)
                let mark = false
            if (idx === gMeme.selectedLineIdx && !gIsDownload) {
                mark = true
                markTxt(gMeme.lines[idx].location.x, gMeme.lines[idx].location.y,mark)  
            }
        })
    }
}

function textChange(elText) {
    gMeme.lines[gMeme.selectedLineIdx].txt = elText.value
    imgDraw()
}
function markTxt(x, y, mark) {
    if (mark) {
        let mesure = gCtx.measureText(gMeme.lines[gMeme.selectedLineIdx].txt)
        gCtx.beginPath();
        // gCtx.ellipse(x, y - 10, mesure.width, gMeme.lines[gMeme.selectedLineIdx].size, Math.PI / 1, 0, 2 * Math.PI);
        gCtx.rect(0, y-(gMeme.lines[gMeme.selectedLineIdx].size), gCanvas.width, gMeme.lines[gMeme.selectedLineIdx].size+10);
        gCtx.fillStyle = 'rgba(255,255,255, 0.4)';
        gCtx.fill()
        // gCtx.stroke();
    }
}

function getText() {
    return gMeme.lines[gMeme.selectedLineIdx].txt
}

function drawTextOnImg(text, fontSize, strokeColor, fillColor, align, x, y) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = `${strokeColor}`
    gCtx.fillStyle = `${fillColor}`
    gCtx.font = `${fontSize}px ${gFontFamily}`
    gCtx.textAlign = 'top'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
    markTxt(x, y)
}

function getImgToDisplay() {
    let imgs = []
    gImgs.forEach(img => {
        imgs.push(img)
    })
    return imgs
}
function getImageById(imgId) {
    let img = gImgs.find(function (img) {
        if (img.id === +imgId) return img
    })
    return img
}

function increaseText() {
    gMeme.lines[gMeme.selectedLineIdx].size += 2
    imgDraw()
}
function decreaseText() {
    gMeme.lines[gMeme.selectedLineIdx].size -= 2
    imgDraw()
}
function textUp() {
    gMeme.lines[gMeme.selectedLineIdx].location.y -= 10
    imgDraw()

}
function textDown() {
    gMeme.lines[gMeme.selectedLineIdx].location.y += 10
    imgDraw()
}
function textLeft() {
    gMeme.lines[gMeme.selectedLineIdx].location.x -= 10
    imgDraw()
}
function textRight() {
    gMeme.lines[gMeme.selectedLineIdx].location.x += 10
    imgDraw()
}

function switchLine() {
    if (gMeme.selectedLineIdx + 1 === gMeme.lines.length) {
        gMeme.selectedLineIdx = 0

    } else if (gMeme.selectedLineIdx === 0) {
        gMeme.selectedLineIdx++

    } else gMeme.selectedLineIdx++
    imgDraw()
}

function addLine() {
    gMeme.lines.push({
        txt: 'new line',
        size: 30,
        align: 'top',
        stroke: 'black',
        fill: 'white',
        location: {
            x: 250,
            y: 250
        }
    })
    gMeme.selectedLineIdx = gMeme.lines.length - 1
    imgDraw()
}
function addSticker(sticker) {
    gMeme.lines.push({
        txt: sticker,
        size: 30,
        align: 'center',
        stroke: 'black',
        fill: 'white',
        location: {
            x: 250,
            y: 250
        }
    })
    gMeme.selectedLineIdx = gMeme.lines.length - 1
    imgDraw()
}
function getCurrImg() {
    return gCurrImg
}

function strokeColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].stroke = color
    imgDraw()
}
function fillColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].fill = color
    imgDraw()
}
function fontChang(font) {
    gFontFamily = font
    imgDraw()
}

function removeLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    gMeme.selectedLineIdx--
    imgDraw()
}
function downloadPrep() {
    gIsDownload = true
    imgDraw()
}
function endDownload() {
    gIsDownload = false
    imgDraw()
}
