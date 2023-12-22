const apiKey  = "57046980c6ff8ad9d06dbb4f5b94e93c"

const imgApi = "https://image.tmdb.org/t/p/w1280"

const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`;

const form = document.getElementById("search-form");

const query = document.getElementById("search-input");

const result = document.getElementById("result");


let page = 1;

let isSearching = false;

// fetch JSON data from URL

async function fetchData(url, callback) {
    try{
        const response = await fetch(url);
        if(!response.ok){
            throw new Error ("Couldn't fetch");
        }
        return await response.json();
    } catch(err){
        return null;
    }
}


//   fetch and show result based on url

async function fetchAndShowResult(url){
    const data = await fetchData(url);
     
    if (data && data.result) {
        showResults(data.result);
    }
}


//  create movie card html template

function createMovieCard(movie) {
    const { posterPath, originalTitle, ReleaseDate, overview } = movie;

    const imagePath = posterPath ? imgApi + posterPath : "./img-01.jpeg";

    const truncatedTitle = originalTitle.length > 15 ?
    originalTitle.slice(0,15) + "..." : originalTitle ;

    const formattedDate = ReleaseDate || " No release date";

    const cardTemplate = `
            <div class="column"> 
            <div class = "row">
            <a class = "card-media" href = "./img-01.jpeg">

            <img src = "${imagePath}" alt = "{originalTitle}" width = "100%" />

            </a>

            <div class = "card-content">
                <div class = " card-header">
                        <div class = "left-content">

                        <h3 style = " font-weight: 600 "> $ {truncatedTitle}</h3>
                        <span style = "color: #12efec"> ${formattedDate} </span>
                        </div>
                        <div class = " right-content"> 
                        <a href = $ {imagePath}" target = "_blank" class = " card-btn">See Cover </a>
                         </div>
                         </div>

                         <div class = " info">
                              $ {overview || "No Overview yet....." } 

                         </div>

                    </div>
                </div>
            </div>
    `;

    return cardTemplate;

    
}


//  clear result element for serach


function clearResult (){
    result.innerHTML = "";
}


//  show result in page

function showResult (item){
    const newResult = item.map(createMovieCard).join(",");
    result.innerHTML = newContent || <p>No results found.</p>;


}


// load more results

async function loadMoreResults (){
    if(isSearching){ return; } 
    page++;
    const searchTerm = query.value;
    const url = searchTerm ? `${searchUrl}${searchTerm} &page = ${page}` : `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}&page=${page}`;
    await fetchAndShowResult (url);


}

// delete end of page and load more results

function detectEnd(){
    const {scrollTop, clientHeight, scrollHeight} = document.documentElement;
    if (scrollTop > clientHeight >= scrollHeight - 20) {
        loadMoreResults();
    }
}

//  handle serach

async function handleSearch(){
    e.preventDefault();
    const searchTerm = query.value.trim();
    if(searchTerm){
        isSearching = true;
        clearResult();
        const newUrl = `${searchUrl}${searchTerm} &page=${page}`;
        await fetchAndShowResult(newUrl)
        query.value = "";
    }
}

// event listners 

form.addEventListener ('submit', handleSearch);
window.addEventListener ('scroll', detectEnd);
window.addEventListener ('resize', detectEnd);