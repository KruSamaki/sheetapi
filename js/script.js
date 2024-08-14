document.addEventListener('DOMContentLoaded', function() {
    fetchNews();
});

function fetchNews() {
    // Replace with your Google Sheets ID and range
    const sheetID = '1Jx1UPP1URjfRXBeRIUj8UKg6dUSYPHjLQYus5XR6ICQ';
    const apiKey = 'AIzaSyBlN7d0VWpUrUiLjw4co4INU2pCEYLgzh0';
    const range = 'Articles!A2:D'; // Adjust the range as per your sheet structure

    const sheetURL = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${range}?key=${apiKey}`;

    fetch(sheetURL)
        .then(response => response.json())
        .then(data => {
            const newsContainer = document.getElementById('news-container');
            const rows = data.values;

            if (rows.length > 0) {
                rows.forEach(row => {
                    const title = row[1]; // Assuming title is in column B
                    const content = row[2]; // Assuming content is in column C
                    const date = row[3]; // Assuming date is in column D

                    const newsDiv = document.createElement('div');
                    newsDiv.classList.add('news-item');
                    newsDiv.innerHTML = `
                        <h3>${title}</h3>
                        <p>${content}</p>
                        <p><small>${date}</small></p>
                    `;
                    newsContainer.appendChild(newsDiv);
                });
            } else {
                newsContainer.innerHTML = 'No news available.';
            }
        })
        .catch(error => console.error('Error fetching news:', error));
}

// Simple login logic for demonstration
const loginForm = document.getElementById('login-form');

if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Replace with real authentication logic
        if (username === 'admin' && password === '123') {
            window.location.href = 'dashboard.html';
        } else {
            alert('Invalid login credentials!');
        }
    });
}

const postForm = document.getElementById('post-form');

if (postForm) {
    postForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const date = new Date().toLocaleDateString();

        const postData = { title, content, date };

        // Replace with your Google Apps Script Web App URL
        const scriptURL = 'https://script.google.com/macros/s/AKfycbwFncQDmCBtbw_EPehisc9zdZksvKjTWiNPOeaC4rsLBLudaiYGl6ghNS1qyETd7M0g/exec';

        fetch(scriptURL, {
            method: 'POST',
            body: JSON.stringify(postData),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('post-status').textContent = data.message;
            postForm.reset();
        })
        .catch(error => {
            console.error('Error posting data:', error);
            document.getElementById('post-status').textContent = 'Error submitting post!';
        });
        
    });
}

