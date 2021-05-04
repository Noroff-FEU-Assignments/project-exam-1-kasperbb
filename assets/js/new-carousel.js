
const carousel = document.querySelector("#carousel")
const content = document.querySelector("#content")
const next = document.querySelector("#next")
const prev = document.querySelector("#prev")
const scrollText = document.querySelector("#scrollText")

let width = carousel.offsetWidth

const moveNext = () => carousel.scrollBy(width, 0)


const movePrev = () => carousel.scrollBy(-(width), 0)


next.addEventListener("click", moveNext);
prev.addEventListener("click", movePrev);


window.addEventListener("resize", () => (width = carousel.offsetWidth));
