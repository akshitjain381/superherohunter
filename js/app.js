import { getHash, BASE_URL, PUBLIC_KEY } from './md5.js';
import { saveFavorites,getFavorites,removeFromFavorites} from './favorites.js';

let searchtext = "";
document.addEventListener('DOMContenLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    searchInput.value = '';
});

async function addToFavorites(id) {
    console.log(id);
    const favorites = getFavorites();
    if (!favorites.includes(id)) {
        favorites.push(id);
        saveFavorites(favorites);
        const superheroes = await fetchSuperheroes(searchtext);
        displaySuperheroes(superheroes);
    }
    return;
}

window.addToFavorites = addToFavorites;

export async function fetchSuperheroes(query = '') {
    const ts = new Date().getTime();
    const hash = getHash(ts);
    const url = `${BASE_URL}?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}&nameStartsWith=${query}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.data.results;
}

function favoriteButton(id) {
    const favorites = getFavorites();
    if (!favorites.includes(id)) {
        return `<button class = "btn btn-primary" onClick = "addToFavorites(${id})" id = "${id}-fav">Add to Favorites</button>`;
    } 
    return `<button class = "btn btn-danger" onClick = "removeFromFavorites(${id})" id = "${id}-remove">Remove from Favorites</button>`
}

function displaySuperheroes(superheroes) {
    const results = document.getElementById('results');
    results.innerHTML = '';
    superheroes.forEach(hero => {
        const heroCard = document.createElement('div');
        heroCard.className = 'col-md-4';
        heroCard.innerHTML = `
            <div class="card mb-4">
                <img class="card-img-top image-dimension" src="${hero.thumbnail.path}.${hero.thumbnail.extension}" alt="${hero.name}">
                <div class="card-body">
                    <h5 class="card-title">${hero.name}</h5>
                    ${favoriteButton(hero.id)}
                    <a href="superhero.html?id=${hero.id}" class="btn btn-info">More Info</a>
                </div>
            </div>
        `;
        results.appendChild(heroCard);
    });
}

document.getElementById('searchInput').addEventListener('input', async function () {
    const query = this.value;
    searchtext = this.value;
    if (query && query!=null && query!=undefined) {
        const superheroes = await fetchSuperheroes(query);
        displaySuperheroes(superheroes);
    } else {
        displaySuperheroes([]);
    }
});

