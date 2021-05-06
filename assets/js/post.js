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

const fixSrc = () => {
    const images = document.querySelectorAll(".wp-block-image img")
    const videos = document.querySelectorAll(".wp-block-video video")
    images.forEach((image, i) => {
        const caption = document.querySelectorAll(".wp-block-image figcaption")[i]
        image.src = image.dataset.src
        image.alt = caption.innerHTML
    })
    videos.forEach((video, i) => {
        const caption = document.querySelectorAll(".wp-block-video figcaption")[i]
        video.src = video.dataset.src
        video.alt = caption.innerHTML
    })
}

populatePost().then(() => {
    addEvents()
    fixSrc()
})
