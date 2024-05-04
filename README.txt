////////////////////
 HACKER NEWS READER
////////////////////

GO TO THE SITE
https://hackernewsexplorer.netlify.app/

GITHUB
https://github.com/Emans1496/JSAdvanced


The Hacker News Reader is a web application designed to fetch and display the latest news articles from the Hacker News API in a user-friendly interface.
Introduction

##FUNCTION
This project utilizes JavaScript to interact with the Hacker News API and dynamically generate HTML content to present news articles to the user. The application employs event listeners and asynchronous functions to ensure smooth retrieval and display of news data.
Functionality
document.addEventListener('DOMContentLoaded', async function () { ... });

This event listener ensures that the JavaScript code is executed only after the DOM content has been fully loaded, ensuring that elements targeted by the script are available.
fetchLatestNewsIds(startIndex = 0, count = 10)

This asynchronous function fetches the latest news article IDs from the Hacker News API. It accepts optional parameters startIndex and count to specify the starting index and the number of IDs to fetch, respectively. If no parameters are provided, it defaults to fetching the first 10 news IDs.
fetchNewsDetails(newsId)

This asynchronous function fetches the details of a specific news article using its ID from the Hacker News API. It retrieves information such as the title, URL, and publication date of the news article.
displayNews(newsDetails)

This function dynamically generates HTML elements to display the details of a news article on the web page. It creates elements for the title, a link to the full article, and the publication date. These elements are appended to the news container on the page.
loadMoreNews()

This function is triggered when the user clicks the "Load More" button. It fetches additional news articles from the Hacker News API and displays them on the page. If there are no more news articles available, it hides the "Load More" button and displays a message indicating that no more news is available.
Usage

##AUTHOR
To use the Hacker News Reader, simply open the index.html file in a web browser. Upon opening the application, the latest 10 news articles will be displayed. You can click on the "Leggi di più" link to read the full article. To load more news articles, click the "Load More" button at the bottom of the page.
Credits
This project was created by Emanuele Squillante.