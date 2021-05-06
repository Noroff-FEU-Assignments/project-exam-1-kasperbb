const breadcrumbs = document.querySelector("section.breadcrumbs")
const loader = document.querySelector(".loader")

const ID = params.get("id")

if (!ID) location.href = "/"

const fetchPost = async (id) => {
    const res = await fetch(`${POSTS}/${id}?_embed`)
    const json = await res.json()
    document.title += ` ${json.title.rendered}`
    return json
}

const populatePost = async () => {
    const container = document.querySelector("section.main")
    const post = await fetchPost(ID);
    container.innerHTML = createPostDetails(post)
    breadcrumbs.innerHTML += `<span>${post.title.rendered}</span>`
}

const fixSrc = (element, type) => {
    element.forEach((el, i) => {
        const caption = document.querySelectorAll(`.wp-block-${type} figcaption`)[i]
        el.src = el.dataset.src
        el.alt = caption.innerHTML
    })
}

const fixAllSrc = () => {
    const images = document.querySelectorAll(".wp-block-image img")
    const videos = document.querySelectorAll(".wp-block-video video")

    fixSrc(images, "image")
    fixSrc(videos, "video")
}

populatePost().then(() => {
    addEvents()
    fixAllSrc()
})
