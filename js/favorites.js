import { fetchSuperheroDetails } from "./superhero.js";

export function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites')) || [];
}

export function saveFavorites(favorites) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

export function removeFromFavorites(id) {
    let favorites = getFavorites();
    favorites = favorites.filter(favId => favId !== id);
    saveFavorites(favorites);
    displayFavorites();
}

window.removeFromFavorites = removeFromFavorites;

async function displayFavorites() {
    if (window.location.href.includes('favorites')) {
        const favorites = getFavorites();
    const results = document.getElementById('results');
    results.innerHTML = '';
    for (const id of favorites) {
        const hero = await fetchSuperheroDetails(id);
        const heroCard = document.createElement('div');
        heroCard.className = 'col-md-4';
        heroCard.innerHTML = `
            <div class="card mb-4">
                <img class="card-img-top" src="${hero.thumbnail.path}.${hero.thumbnail.extension}" alt="${hero.name}">
                <div class="card-body">
                    <h5 class="card-title">${hero.name}</h5>
                    <button class="btn btn-danger" onclick="removeFromFavorites(${hero.id})">Remove from Favorites</button>
                    <a href="superhero.html?id=${hero.id}" class="btn btn-info">More Info</a>
                </div>
            </div>
        `;
        results.appendChild(heroCard);
    }
    }
    
}

document.addEventListener('DOMContentLoaded',displayFavorites);
