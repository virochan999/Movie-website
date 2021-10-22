const moviesList = document.querySelector('.card-container');
const popular = document.querySelector('.card-container2');
const trending = document.querySelector('.card-container3');

// function called when document is loaded.
eventListeners();
function eventListeners() {
    window.addEventListener('DOMContentLoaded', () =>{
        loadJSON();
        jsondata();
    });
}

// function to fetch and render the data.
function loadJSON() {
    return fetch('data.json')
    .then(response =>{ return response.json()})
    .then(data => {
        
        let html ='';
        let html2 ='';
        let html3 ='';
        // Html for most-watched section
        data.forEach(movie => {
            var data = [];
            if(movie.type ==="most watched"){
                html += 
                `<div class="card">
                    <img src="${movie.img}" class="card-img" alt="">
                    <div class="card-body">
                        <h2 class="name">${movie.name}</h2>
                        <h6 class="des">Lorem ipsum sit amet</h6>
                        <button class="watchlist-btn">add to watchlist</button>
                    </div> 
                </div>`;
                data.push(movie);
            }

            // Html for popular section
            else if(movie.type === "popular") {
                html2 += 
                `<div class="card">
                    <img src="${movie.img}" class="card-img" alt="">
                    <div class="card-body">
                        <h2 class="name">${movie.name}</h2>
                        <h6 class="des">Lorem ipsum sit amet</h6>
                        <button class="watchlist-btn">add to watchlist</button>
                    </div> 
                </div>`;
                data.push(movie);
            }

            // Html for trending section
            else if(movie.type ==="trending"){
                html3 += 
                `<div class="card">
                    <img src="${movie.img}" class="card-img" alt="">
                    <div class="card-body">
                        <h2 class="name">${movie.name}</h2>
                        <h6 class="des">Lorem ipsum sit amet</h6>
                        <button class="watchlist-btn">add to watchlist</button>
                    </div> 
                </div>`;
                data.push(movie);
            }

        });
        moviesList.innerHTML = html;
        popular.innerHTML = html2;
        trending.innerHTML = html3;
        return data;
    })
    .catch(error => {
        alert("coudn't fetch error");
        console.log(error)
    })
}

// let arr = [];
var jsondata = async () => {
    let arr = await loadJSON();

    // filtering the data according to the category.
    let cat = [];
    const genreSelect = document.querySelectorAll("input[type=checkbox][name=category]");
    genreSelect.forEach(function(item) {
        item.addEventListener('click', function() {
            cat = Array.from(genreSelect)
            .filter(i => i.checked)
            .map(i => i.value)
            console.log(cat)
            filterByType()
        })
    });

    // filtering the data according to the years.
    let year =[]
    const yearSelect = document.querySelectorAll('input[type=checkbox][name=year]');
    yearSelect.forEach(function(item) {
        item.addEventListener('click', function() {
            console.log(item)
            year = Array.from(yearSelect)
            .filter(i => i.checked)
            .map(i => i.value)
            filterByType();
        })
    })

    function filterType(data) {
        filteredData = data;
        if(cat.length !== 0) filteredData = filteredData.filter(val => cat.includes(val.category));
        if(year.length !== 0) filteredData = filteredData.filter(val => year.includes(val.year));
        console.log(filteredData)
        return filteredData;
    }

    function filterByType() {
        document.querySelector(".movies-list").innerHTML="";
        data = filterType(arr)
        render(data);
    }

    // Filtereing and sorting according to the rating of movies
    document.getElementsByClassName('high-to-low')[0].addEventListener('click', () =>  {
        document.querySelector(".movies-list").innerHTML="";
        arr.sort((a,b) => {
            return a.rating - b.rating;
    });
    renderSort();
    })

    document.getElementsByClassName('high-to-low')[0].addEventListener('click', () =>  {
        document.querySelector(".movies-list").innerHTML="";
        arr.sort((a,b) => {
            return a.rating - b.rating;
    });
    arr.reverse();
    renderSort();
    })

    const searchBar = document.getElementById('search-bar');
    // let characters = [];

    searchBar.addEventListener('keyup', (e) => {
        const searchString = e.target.value;

        const filteredCharacters = arr.filter( character => {
            return character.name.includes(searchString);
        });
        document.querySelector(".movies-list").innerHTML="";
        render(filteredCharacters);
        // console.log(filteredCharacters)
    });

    function render(data) {
        let html  ="";
        data.forEach(movie => {
                html += 
                `<div class="filtered-data">
                    <div class="card">
                        <img src="${movie.img}" class="card-img" alt="">
                        <div class="card-body">
                            <h2 class="name">${movie.name}</h2>
                            <h6 class="des">Lorem ipsum sit amet</h6>
                            <button class="watchlist-btn">add to watchlist</button>
                        </div> 
                    </div>
                </div>`;
        })
        document.querySelector(".filtered-container").innerHTML = html;
            
    }

    function renderSort() {
        let html  ="";
        arr.forEach(movie => {
                html += 
                `<div class="filtered-data">
                    <div class="card">
                        <img src="${movie.img}" class="card-img" alt="">
                        <div class="card-body">
                            <h2 class="name">${movie.name}</h2>
                            <h6 class="des">Lorem ipsum sit amet</h6>
                            <button class="watchlist-btn">add to watchlist</button>
                        </div> 
                    </div>
                </div>`;
        })
        document.querySelector(".filtered-container").innerHTML = html;

    }

    
}


