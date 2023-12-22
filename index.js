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
    `

    
}

