const apiKey = "57046980c6ff8ad9d06dbb4f5b94e93c";
const imgApi = "https://image.tmdb.org/t/p/w1280";
const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`;
const form = document.getElementById("search-form");
const query = document.getElementById("search-input");
const result = document.getElementById("result");
let page = 1;
let isSearching = false;

async function fetchData(url, callback) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Couldn't fetch");
    }
    return await response.json();
  } catch (err) {
    return null;
  }
}

async function fetchAndShowResult(url) {
  const data = await fetchData(url);
  if (data && data.results) {
    showResult(data.results);
  }
}

function createMovieCard(movie) {
  const { poster_path, original_title, release_date, overview } = movie;
  const imagePath = poster_path ? imgApi + poster_path : "./img-01.jpeg";
  const truncatedTitle =
    original_title.length > 15 ? original_title.slice(0, 15) + "..." : original_title;
  const formattedDate = release_date || "No release date";
  const cardTemplate = `
    <div class="column">
      <div class="row">
        <a class="card-media" href="./img-01.jpeg">
          <img src="${imagePath}" alt="{original_title}" width="100%" />
        </a>
        <div class="card-content">
          <div class="card-header">
            <div class="left-content">
              <h3 style="font-weight: 600">${truncatedTitle}</h3>
              <span style="color: #12efec">${formattedDate}</span>
            </div>
            <div class="right-content">
              <a href="${imagePath}" target="_blank" class="card-btn">See Cover</a>
            </div>
          </div>
          <div class="info">
            ${overview || "No Overview yet....."}
          </div>
        </div>
      </div>
    </div>
  `;
  return cardTemplate;
}

function clearResult() {
  result.innerHTML = "";
}

function showResult(items) {
  const newResult = items.map(createMovieCard).join(",");
  result.innerHTML += newResult || "<p>No results found.</p>";
}

async function loadMoreResults() {
  if (isSearching) {
    return;
  }
  page++;
  const searchTerm = query.value;
  const url = searchTerm
    ? `${searchUrl}${searchTerm}&page=${page}`
    : `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}&page=${page}`;
  await fetchAndShowResult(url);
}

function detectEnd() {
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
  if (scrollTop > clientHeight >= scrollHeight - 20) {
    loadMoreResults();
  }
}

async function handleSearch(e) {
  e.preventDefault();
  const searchTerm = query.value.trim();
  if (searchTerm) {
    isSearching = true;
    clearResult();
    const newUrl = `${searchUrl}${searchTerm}&page=${page}`;
    await fetchAndShowResult(newUrl);
    query.value = "";
  }
}

form.addEventListener("submit", handleSearch);
window.addEventListener("scroll", detectEnd);
window.addEventListener("resize", detectEnd);

async function init() {
  clearResult();
  const url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}&page=${page}`;
  isSearching = false;
  await fetchAndShowResult(url);
}

init();
