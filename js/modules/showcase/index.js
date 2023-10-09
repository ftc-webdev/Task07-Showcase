'use strict'

import { cssInit, insertCSS } from "/js/modules/css.js"

let imgListPopover  // popover wrapper, define it here, init it somewhere else
let showcaseImage   // img tag, define it here, init it somewhere else
let showcaseImageContainer 
let thumbnails      // collection of thumbnail images
let currentIndex 

const thumbnailClickHandler = (ev) => {
    const thumbnail = ev.target
    currentIndex = thumbnail.index  // remember which thumb has been clicked

    console.log({ thumbnail })
    // is whatever I clicked on an image ie does it have a src attrib
    if(thumbnail.src) showcaseImage.src = thumbnail.src
    showcaseImageContainer.classList.remove("showcase-hidden")
}

const showcaseImageCloseHandler = (ev) => {
    showcaseImageContainer.classList.add("showcase-hidden")
}

const showcaseLeftArrowClickHandler = (ev) => {
    // this wraps the "slider"
    currentIndex-- // go left
    if(currentIndex === -1) currentIndex = thumbnails.length - 1    // the last eleement
    showcaseImage.src = thumbnails[currentIndex].src
}

const showcaseRightArrowClickHandler = (ev) => {
    // this wraps the "slider"
    currentIndex++ // go rigth
    if(currentIndex === thumbnails.length) currentIndex = 0    // the first eleement
    showcaseImage.src = thumbnails[currentIndex].src
}

const renderShowcaseImage = () => {
    let html = ""
    html += `
        <div id="showcase-image-container" class="showcase-popover showcase-hidden">
            <button id="showcase-image-close">X</button>
            <img id="showcase-left-arrow" src="/img/slider-controls/left-arrow.png" />
            <img id="showcase-image" class="showcase-image"/>
            <img id="showcase-right-arrow" src="/img/slider-controls/right-arrow.png" />
            </div>    
    `
    return html

}

const displayImages = (imgListContainerId, imgList, imgFolder = "") => {

    let html = `<div id="showcase-container">`

    imgList.forEach(image => {
        const imagePath = imgFolder + image 
        html += `
            <img src="${imagePath}" class="showcase-thumbnail" />
        `
    })

    html += "</div>"

    html += renderShowcaseImage()

    const imgListContainer = document.getElementById(imgListContainerId)
    imgListContainer.innerHTML = html

    const showcaseContainer = document.getElementById("showcase-container")
    showcaseContainer.addEventListener("click", thumbnailClickHandler)
    
    imgListPopover = document.getElementById("showcase-image-container")
    showcaseImage = document.getElementById("showcase-image")

    showcaseImageContainer = document.getElementById("showcase-image-container")

    const showcaseImageClose = document.getElementById("showcase-image-close")
    showcaseImageClose.addEventListener("click", showcaseImageCloseHandler)

    thumbnails = document.getElementsByClassName("showcase-thumbnail")
    let counter = 0
    for(let thumbnail of thumbnails) {
        thumbnail.index = counter++
    }

    document.getElementById("showcase-left-arrow").addEventListener("click", showcaseLeftArrowClickHandler)
    document.getElementById("showcase-right-arrow").addEventListener("click", showcaseRightArrowClickHandler)

}


const init = (imgListContainerId, imgList, imgFolder = "") => {
    
    cssInit("showcase")

    insertCSS(`
        #container {
            width: 50%;
        }
        .thumbnail {
            width:30%;
        }
        .image {
            width: 45%;
        }
        .hidden {
            display: none;
        }
        #left-arrow, #right-arrow {
            width: 20px;
            cursor: pointer;
        }
    `)
    displayImages(imgListContainerId, imgList, imgFolder)


}

export {
    init
}