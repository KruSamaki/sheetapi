// Function to fetch and display posts
function fetchPosts() {
    const sheetId = '1Jx1UPP1URjfRXBeRIUj8UKg6dUSYPHjLQYus5XR6ICQ';
    const apiKey = 'AIzaSyBlN7d0VWpUrUiLjw4co4INU2pCEYLgzh0';
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Posts!A2:E?key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const posts = data.values;
            const postsContainer = document.getElementById('posts-container');
            postsContainer.innerHTML = '';
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.className = 'post';
                postElement.innerHTML = `
                    <h3>${post[1]}</h3>
                    <p>${post[2]}</p>
                    <a href="viewpost.html?id=${post[0]}">Read more</a>
                `;
                postsContainer.appendChild(postElement);
            });
        })
        .catch(error => console.error('Error fetching posts:', error));
}

// Function to submit a new post
function submitPost(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const category = document.getElementById('category').value;

    const sheetId = '1Jx1UPP1URjfRXBeRIUj8UKg6dUSYPHjLQYus5XR6ICQ';
    const url = `https://script.google.com/macros/s/AKfycbxQgVrfIx_lNA4Anl0MlSlQxoCuhHf9nZTYPWxg1JAtqBwc8_fbE2oxJJwkkLwuJVST/exec`;

    const data = {
        title: title,
        content: content,
        category: category
    };

    fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        alert('Post created successfully!');
        window.location.href = 'index.html';  // Redirect back to the homepage
    })
    .catch(error => console.error('Error posting data:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    fetchPosts();  // Load posts when the page is loaded

    // Attach event listener to the form
    const postForm = document.getElementById('post-form');
    if (postForm) {
        postForm.addEventListener('submit', submitPost);
    }
});
