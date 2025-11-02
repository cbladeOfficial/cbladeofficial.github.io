// I promise this is for retrieving the blog data only!

function getBlogList() {
    fetch('posts.json')
        .then(res => res.json())
        .then(posts => {
            const container = document.getElementById('posts');
            posts.forEach(post => {
                const div = document.createElement('div');
                div.className = 'post';
                div.innerHTML = `
            <hr size="1">
            <h3><a href="post.html?id=${post.id}">${post.title}</a></h3>
            <small>${post.date}</small>
            <p>${post.description}</p>
          `;
                container.appendChild(div);
            });
        });
}

function getBlogData() {
    const params = new URLSearchParams(location.search);
    const id = params.get("id");

    fetch("posts.json")
        .then(r => r.json())
        .then(posts => {
            const post = posts.find(p => p.id == id);
            const container = document.getElementById("post");
            if (!post) {
                container.innerHTML = "<h1>Post not found</h1>";
                document.title = "Not found";
                return;
            }

            document.title = post.title;
            fetch(post.file)
                .then(r => r.text())
                .then(md => {
                    const html = DOMPurify.sanitize(marked.parse(md));
                    container.innerHTML = `
              <h1>${post.title}</h1>
              <small>by cbladeOfficial, ${post.date}</small>
              <hr size="1">
              ${html}
            `;
                });
        })
        .catch(() => {
            document.getElementById("post").innerHTML = "<h3>Failed to load post</h3>";
        });
}