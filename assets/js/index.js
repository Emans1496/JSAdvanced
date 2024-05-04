import '../css/styles.css';
import hackerImage from '../img/hacker.png'; 
import logowhiteImage from '../img/logowhite.png';
document.addEventListener('DOMContentLoaded', async function () {
    
        let loadedNewsIds = [];
    async function fetchLatestNewsIds(startIndex = 0, count = 10) {
        const apiUrl = 'https://hacker-news.firebaseio.com/v0/newstories.json';

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Errore durante il recupero degli ID delle news.');
            }

            const newsIds = await response.json();
            return newsIds.slice(startIndex, startIndex + count);
        } catch (error) {
            console.error('Errore:', error.message);
            throw error;
        }
    }

    async function fetchNewsDetails(newsId) {
        const apiUrl = `https://hacker-news.firebaseio.com/v0/item/${newsId}.json`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`Errore durante il recupero dei dettagli della news ${newsId}.`);
            }

            const newsDetails = await response.json();
            return newsDetails;
        } catch (error) {
            console.error('Errore:', error.message);
            throw error;
        }
    }

    function displayNews(newsDetails) {
        const newsContainer = document.getElementById('newsContainer');
        const newsItem = document.createElement('div');
        newsItem.classList.add('newsItem');
        const titleElement = document.createElement('h2');
        titleElement.textContent = newsDetails.title;
        const linkElement = document.createElement('a');
        linkElement.href = newsDetails.url;
        linkElement.textContent = 'Leggi di più';
        const dateElement = document.createElement('p');
        const newsDate = new Date(newsDetails.time * 1000);
        dateElement.textContent = 'Data: ' + newsDate.toLocaleString();
        newsItem.appendChild(titleElement);
        newsItem.appendChild(linkElement);
        newsItem.appendChild(dateElement);
        newsContainer.appendChild(newsItem);
    }

    const firstNewsIds = await fetchLatestNewsIds(0, 10);
    loadedNewsIds = loadedNewsIds.concat(firstNewsIds);
    for (const newsId of firstNewsIds) {
        const newsDetails = await fetchNewsDetails(newsId);
        displayNews(newsDetails);
    }
    async function loadMoreNews() {
        const startIndex = loadedNewsIds.length;
        const newsIds = await fetchLatestNewsIds(startIndex, 10);
        if (newsIds.length === 0) {
            document.getElementById('loadMoreBtn').style.display = 'none';
            const noMoreNewsMessage = document.createElement('p');
            noMoreNewsMessage.textContent = 'Non ci sono più news disponibili.';
            document.getElementById('newsContainer').appendChild(noMoreNewsMessage);
            console.log('Non ci sono più news da caricare.');
            return;
        }
        loadedNewsIds = loadedNewsIds.concat(newsIds);
        for (const newsId of newsIds) {
            const newsDetails = await fetchNewsDetails(newsId);
            displayNews(newsDetails);
        }
    }
    document.getElementById('loadMoreBtn').addEventListener('click', loadMoreNews);
    
});

