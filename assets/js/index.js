document.addEventListener('DOMContentLoaded', async function () {
    
    let loadedNewsIds = [];

    async function fetchLatestNewsIds(startIndex = 0, count = 10, category = 'newstories') {
        const apiUrl = `https://hacker-news.firebaseio.com/v0/${category}.json`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`Errore durante il recupero degli ID delle ${category.replace('stories', '')}.`);
            }

            const newsIds = await response.json();
            return newsIds.slice(startIndex, startIndex + count);
        } catch (error) {
            console.error('Errore:', error.message);
            throw error;
        }
    }

    async function fetchNewsDetails(newsId) {
        const apiUrl = `https://hacker-news.firebaseio.com/v0/item/${newsId}.json?print=pretty`;

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
        if (newsDetails.url) {
            linkElement.href = newsDetails.url;
            linkElement.textContent = 'Leggi di più';
        } else {
            linkElement.textContent = 'Link non disponibile';
        }

        const dateElement = document.createElement('p');
        const newsDate = new Date(newsDetails.time * 1000);
        dateElement.textContent = 'Data: ' + newsDate.toLocaleString();

        newsItem.appendChild(titleElement);
        newsItem.appendChild(linkElement);
        newsItem.appendChild(dateElement);
        newsContainer.appendChild(newsItem);
    }

    async function loadNews(category) {
        loadedNewsIds = [];
        document.getElementById('newsContainer').innerHTML = ''; // Clear existing news
        const firstNewsIds = await fetchLatestNewsIds(0, 10, category);
        loadedNewsIds = loadedNewsIds.concat(firstNewsIds);

        for (const newsId of firstNewsIds) {
            const newsDetails = await fetchNewsDetails(newsId);
            displayNews(newsDetails);
        }
    }

    // Inizializza con le ultime notizie
    await loadNews('newstories');

    document.getElementById('categorySelect').addEventListener('change', async function () {
        const selectedCategory = this.value;
        await loadNews(selectedCategory);
    });

    async function loadMoreNews() {
        const startIndex = loadedNewsIds.length;
        const category = document.getElementById('categorySelect').value;
        const newsIds = await fetchLatestNewsIds(startIndex, 10, category);

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