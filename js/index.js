'use strict'
import { init } from "./modules/showcase/index.js"
document.addEventListener("DOMContentLoaded", () => {
    const imgs = [
        "image-1.jpg",
        "image-2.jpg",
        "image-3.jpg",
        "image-4.jpg",
        "image-5.jpg",
        "image-6.jpg",
        "image-7.jpg",
        "image-8.jpg",
        "image-9.jpg",
    ]
    init("img-list-container", imgs, "/img/scenes-slider/")




})