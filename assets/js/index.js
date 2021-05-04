const fetchPosts = async () => {
    const res = await fetch(`${POSTS}?_embed`);
    const json = await res.json();
    console.log(json)
    return json;
}

const populatePosts = async () => {
    const container = document.querySelector("div#content")
    const posts = await fetchPosts()
    container.innerHTML = ""
    posts.forEach(post => container.innerHTML += createPost(post))
}

populatePosts()