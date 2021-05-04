const prev = document.querySelector("#prev")
const next = document.querySelector("#next")

const maxWidth = 900
const itemsPerSlide = 4
let counter = 0

const moveCarousel = (carousel) => {
    Array.from(carousel.children).forEach(item => {
        item.style.transform = `translateX(-${maxWidth * counter}px)`
    })
}

const goBack = () => {
    const carousel = document.querySelector("#posts")
    const length = getCarouselLength()
    if (counter !== 0) counter--
    moveCarousel(carousel)
    disablePrevButton()
    disableNextButton(length)
}

const goForward = () => {
    const carousel = document.querySelector("#posts")
    const length = getCarouselLength()
    if (counter !== length) counter++
    moveCarousel(carousel)
    disablePrevButton()
    disableNextButton(length)
}

const getCarouselLength = () => {
    const carousel = document.querySelector("#posts")
    const length = Array.from(carousel.children).length / itemsPerSlide
    return length
}

const disablePrevButton = () => (counter === 0) ? prev.disabled = true : prev.disabled = false

const disableNextButton = (length) => (counter >= Math.floor(length)) ? next.disabled = true : next.disabled = false



disablePrevButton()
prev.addEventListener("click", goBack)
next.addEventListener("click", goForward)