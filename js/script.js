const APIKEY = "1f75fdb1ac9645af8d3e176292ac7907";
const url = `https://newsapi.org/v2/everything?q=`;

window.addEventListener("load", () => fetchNews('Indonesia'))
async function fetchNews(query){
    const res = await axios.get(`${url}${query}&apiKey=${APIKEY}`)
    const data = res.data.articles;
    dataNews(data)
}
    // axios
    // .get(`${url}Indonesia&apiKey=${APIKEY}`)
    // .then((res) => dataNews(res.data.articles))
    // .catch((err) => console.log(err));


function dataNews(articles) {
    const cardContainer = document.getElementById('card-container');
    const articlesNews = document.getElementById('news-cards');

    cardContainer.innerHTML= '';

    articles.forEach((article) => {
        if(!article.urlToImage) return;
        const cardClone = articlesNews.content.cloneNode(true);
        fillDataArticles(cardClone, article);
        cardContainer.appendChild(cardClone);
    });
}

function fillDataArticles(cardClone, article){
    const newsImg = cardClone.querySelector('#news-img')
    const newsTitle = cardClone.querySelector('#news-title')
    const newsDate = cardClone.querySelector('#news-date')
    const newsContent = cardClone.querySelector('#news-content')

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsContent.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("id-ID", {
        timeZone: "Asia/Jakarta"
    });

    newsDate.innerHTML = `${article.author} - ${date}`;

    cardClone.firstElementChild.addEventListener("click", ()=> {
        window.open(article.url,"blank");
    })
}

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-input');

searchButton.addEventListener("click",()=> {
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
})