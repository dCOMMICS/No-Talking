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


