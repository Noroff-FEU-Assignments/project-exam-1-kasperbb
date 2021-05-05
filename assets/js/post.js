const breadcrumbs = document.querySelector("section.breadcrumbs")
const submit = document.querySelector("section.comment form button")
const form = document.querySelector("section.comment form")
const loader = document.querySelector(".loader")

const COMMENTS = 'https://exam-one.bjorno.dev/wp-json/wp/v2/comments'
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

const fetchComments = async () => {
    try {
        const res = await fetch(COMMENTS)
        const json = await res.json()
        const filtered = json.filter(comment => comment.post === +ID)
        loader.remove()
        return filtered
    } catch (err) {
        console.log(err)
    }
}

const populateComments = async () => {
    const container = document.querySelector("#comments")
    const comments = await fetchComments()
    container.innerHTML = ""
    comments.forEach(comment => container.innerHTML += createComment(comment))
    if (!comments.length) container.innerHTML = "<p class='no-comments'>No comments</p>"
}

const addComment = async (e) => {
    const data = JSON.stringify({
        post: ID,
        author_name: form["name"].value,
        author_email: form["email"].value,
        content: form["message"].value,
    });
    
    console.log(`data`, data)

    const options = {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: data,
    }

    const res = await fetch(COMMENTS, options)
    if (res.ok) return populateComments()

    const json = res.json()
    return json;
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

submit.addEventListener("click", addComment)

populatePost().then(() => {
    addEvents()
    fixSrc()
})
populateComments()