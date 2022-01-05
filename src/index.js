'use strict';

const cardsBlock = document.querySelector('.cards');
const formSelect = document.querySelector('.form-select');
const alertBlock = document.querySelector('.alert');
let cardsList = [];
let moviesList = [];

const url = './db/dbHeroes.json';

const getCards = async () => {
    return await fetch(url)
    .then(res => res.json());
};

const getOptionsForSelect = (list) => {
    list.forEach(item =>{
        if(item.movies) {
            item.movies.forEach(movie => {
                if(!moviesList.includes(movie)) {
                    moviesList.push(movie.trim());
                }
            });
        }
    });
    
    moviesList.sort()
            .forEach(movie => {
                const option = document.createElement('option');
                option.value=movie;
                option.textContent = movie;
                formSelect.append(option);
            });
};

const render = (list) => {
    if(list) {
        cardsBlock.innerHTML = '';
        list.forEach(item =>{
            cardsBlock.insertAdjacentHTML('afterbegin', `
            <div class="card"   >
                <img src="../db/${item.photo}" class="card-img-top" alt="${item.name}">
                <div class="card-body">
                    <h5 class="card-title card-img-overlay text-white">${item.name}</h5>
                    <p class="card-text">
                    <span class="badge bg-warning text-dark rounded-pill">birth day:</span>
                    ${item.birthDay ? new Date(item.birthDay.toString()).getFullYear() : "unknown"}
                    </p>
                    <p class="card-text">
                    <span class="badge bg-warning text-dark rounded-pill">death day:</span>
                    ${item.deathDay && item.status !== 'alive' ? new Date(item.deathDay.toString()).getFullYear() : "-"}
                    </p>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <span class="font-weight-bold">species:</span>
                            ${item.species}
                        </li>
                        <li class="list-group-item">
                            <span class="font-weight-bold">gender:</span>
                            ${item.gender}
                        </li>
                        <li class="list-group-item">
                            <span class="font-weight-bold">status:</span>
                            ${item.status}
                        </li>
                        <li class="list-group-item">
                            <span class="font-weight-bold">actor:</span>
                            ${item.actors}
                        </li>
                        <li class="list-group-item">
                            <span class="font-weight-bold">movies:</span>
                            <small class="text-muted">${item.movies ? item.movies.join(', ') : ''}</small>
                        </li>

                    </ul>
                </div>
            </div>`);
            
        });
    }
};


const init = () => {
    getCards()
    .then(data => {
        cardsList = data;
        return data;
    })
    .then(() => getOptionsForSelect(cardsList))
    .then(() => render(cardsList))
    .catch(e => {
        alertBlock.textContent = 'Ошибка запроса...';
        alertBlock.classList.remove('d-none');
    });
};

formSelect.addEventListener('change', (e) => {
    const findValue = e.target.value;
    let newArr =  cardsList.filter(item => {
        if(item.movies && item.movies.includes(findValue)) {
            return item;
        }
    });
    render(newArr);
});

init();
