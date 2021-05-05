const loader = document.querySelector(".loader")
const loaderSmall = document.querySelector(".loader-small")
const button = document.querySelector("button")
const filter = document.querySelector("#filter")
let page = 1

const fetchFilteredPosts = async (page, order) => {
    try {
        const res = await fetch(`${POSTS}?page=${page}&order=${order}&_embed`);
        const json = await res.json();
        loader.remove()
        return json;
    } catch (err) {
        console.log(err)
    }
}

const populateFilteredPosts = async (order) => {
    page = 1
    const container = document.querySelector("#results")
    const posts = await fetchFilteredPosts(page, order)
    container.innerHTML = ""
    button.innerHTML = "Load more"
    posts.forEach(post => container.innerHTML += createPost(post))
}

const appendFilteredPosts = async (order) => {
    const container = document.querySelector("#results")
    const posts = await fetchFilteredPosts(page, order)
    posts.forEach(post => container.innerHTML += createPost(post))
}

const loadMore = async () => {    
    try {
        page++
        button.innerHTML = "Loading... <div class='loader-double'></div>"
        await appendFilteredPosts(filter.value)
        button.innerHTML = "Load more"
    } catch (err) {
        page--
        button.innerHTML = "No more posts"
    }
}

const handleFilter = () => populateFilteredPosts(filter.value)



filter.addEventListener("input", handleFilter)
button.addEventListener("click", loadMore)
populateFilteredPosts(filter.value)