'use strict';

let dogs;

fetch('https://api.thedogapi.com/v1/breeds?limit=100000&page=0').then((response) => response.json()).then((data) => {
    appendDogs(data);
    dogs = data;
});

function appendDogs(dog) {

    const htmlString = dog.map((d) => {

        return `
        <div class="sibling">
        <a class="anc" href=${d.image.url}><div class="imag" style="background-image: url('${d.image.url}')"></div></a>
        <div class="content">
            <h2 class="name">${d.name}</h2>
            <p class="hgt">Height: <span>${d.height.metric}</span> cm</p>
            <p class="wgt">Weight: <span>${d.weight.metric}</span> kg</p>
            <p class="spn">Life Span: <span>${d.life_span.toString().replace('years', '')}</span>years</p>
            <p class="temp">Temperament: <span>${d.temperament}</span>.</p>
        </div>

    </div>`;

    }).join('\n');

    document.getElementById('Con').innerHTML = htmlString;
}

document.querySelector('.in').addEventListener('keyup', (k) => {
    let searchString = k.target.value;

    const filteredDogs = dogs.filter((d) => {
        return d.name.toString().toLowerCase().includes(searchString.toLowerCase());
    });
    appendDogs(filteredDogs);

});