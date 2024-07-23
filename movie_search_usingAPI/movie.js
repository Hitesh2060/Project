const Form = document.querySelector('form');
const moviecont = document.querySelector('.movie_container');
const input = document.querySelector('.inputbox');


const getmovieInfo = async (movie) => {
    try{
    const myapikey = "e409519";
    const url = `http://www.omdbapi.com/?apikey=${myapikey}&t=${movie}`;

    const response = await fetch(url);

    if(!response.ok){
        throw Error("Unable to Fetch Movie Data.");
    }

    const data = await response.json();

    showMoviedata(data);
    }
    catch(error){
        errorMessage("No Movie Found...!");
    }
}

const showMoviedata = (data) => {
    moviecont.innerHTML = '';
    moviecont.classList.remove('noBack');

    const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } = data;
    const movieelement = document.createElement('div');
    movieelement.classList.add('movie_info');
    movieelement.innerHTML = `<h2>${Title}</h2>
                            <p><strong>Rating: &#11088;</strong>${imdbRating}</p>`;

    const movieGenreElement = document.createElement('div');
    movieGenreElement.classList.add('movie_genre');

    Genre.split(",").forEach(element => {
        const p = document.createElement('p');
        p.innerText = element;
        movieGenreElement.appendChild(p);
    });
    movieelement.appendChild(movieGenreElement);

    movieelement.innerHTML +=
        `<p><strong>Released Date: </strong>${Released}</p>     <p><strong>Duration: </strong>${Runtime}</p>
     <p><strong>Cast: </strong>${Actors}</p>
     <p><strong>Plot: </strong>${Plot}</p>`


    const movieposter = document.createElement('div');
    movieposter.classList.add('movie_poster');
    movieposter.innerHTML = `<img src="${Poster}" alt="">`;

    moviecont.appendChild(movieposter);
    moviecont.appendChild(movieelement);
}

const errorMessage= (message)=>{

        moviecont.innerHTML = `<h2>${message}</h2>`;
    moviecont.classList.add('noBack');
}

Form.addEventListener('submit', (e) => {
    e.preventDefault();
    const moviename = input.value.trim();
    if (moviename !== '') {
        errorMessage("Loading....");
        getmovieInfo(moviename);
    }
    else{
       errorMessage('Please Enter Movie name to get Movie Details');
    }
});