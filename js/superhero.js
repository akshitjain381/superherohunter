import {getHash,PUBLIC_KEY,BASE_URL} from './md5.js';

const urlParams = new URLSearchParams(window.location.search);
const heroId = urlParams.get('id');

export async function fetchSuperheroDetails(id) {
    const ts = new Date().getTime();
    const hash = getHash(ts);
    const url = `${BASE_URL}/${id}?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.data.results[0];
}

async function displaySuperheroDetails() {
    const hero = await fetchSuperheroDetails(heroId);
    console.log(hero)
    document.getElementById('heroName').innerText = hero.name;
    document.getElementById('heroImage').src = `${hero.thumbnail.path}.${hero.thumbnail.extension}`;
    document.getElementById('heroDescription').innerHTML = hero.description || `<div>Description not available.</div>`;
    // Add more details as needed
}

displaySuperheroDetails();
