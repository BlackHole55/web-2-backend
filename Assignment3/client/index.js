const API_URL = "http://localhost:3000/blogs";

async function fetchBlogs() {
    const res = await fetch(API_URL);
    const blogs = await res.json();

    const list = document.getElementById("blogList");
    list.innerHTML = "";

    blogs.forEach(blog => {
        const li = document.createElement("li");
        li.innerHTML = `
            ID: ${blog._id}<br><br>
            <b>${blog.title}</b><br>
            ${blog.body}<br>
            <hr>
            ${blog.author}<br>
            <button onclick="updateBlog('${blog._id}')">Update</button>
            <button onclick="deleteBlog('${blog._id}')">Delete</button>
        `;
        list.appendChild(li);
    });
}

async function createBlog() {
    const title = document.getElementById("title").value;
    const body = document.getElementById("body").value;
    const author = document.getElementById("author").value;

    const data = { title, body }

    if (author) {
        data.author = author;
    }

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    document.getElementById("title").value = "";
    document.getElementById("body").value = "";
    document.getElementById("author").value = "";
    fetchBlogs();
}

async function findById() {
    const id = document.getElementById("blogId").value;

    const res = await fetch(`${API_URL}/${id}`);
    const blog = await res.json();
    console.log(blog)

    const list = document.getElementById("blogList");
    list.innerHTML = "";

    const li = document.createElement("li");
    li.innerHTML = `
        ID: ${blog._id}<br><br>
        <b>${blog.title}</b><br>
        ${blog.body}<br>
        <hr>
        ${blog.author}<br>
        <button onclick="updateBlog('${blog._id}')">Update</button>
        <button onclick="deleteBlog('${blog._id}')">Delete</button>
    `;
    list.appendChild(li);

    document.getElementById("blogId").value = "";
}

async function updateBlog(id) {
    const title = document.getElementById("title").value;
    const body = document.getElementById("body").value;
    const author = document.getElementById("author").value;

    const data = {}

    if (title) {
        data.title = title;
    }

    if (body) {
        data.body = body;
    }

    if (author) {
        data.author = author;
    }

    await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    fetchBlogs();
}

async function deleteBlog(id) {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    fetchBlogs();
}

fetchBlogs();