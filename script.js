const searchform = document.querySelector('form');
const moviecontainer = document.querySelector('.movie-container');
const inputbox = document.querySelector(".inputbox");

// Function to fetch details using OMdb Api
const getmovieinfo = async (movie) =>{
    try{
        const key = "9f2f1873";
        const url = `https://www.omdbapi.com/?apikey=${key}&t=${movie}`;

        const response = await fetch(url);

        if(!response.ok){
            throw new Error("Unable to fetch Movie Data!")
        }

        const data = await response.json();
        showMoviedata(data);
    }
    catch(error){
        showErrorMessage("No Movie Found!");
    }
    
}


const showMoviedata = (data)=>{
    moviecontainer.innerHTML ="";
    moviecontainer.classList.remove('noBackground');
    // Use Destructuring assignment to extract properties from data object
    const {Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster} = data;

    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-info');

    movieElement.innerHTML = `<h2>${Title}</h2>
    <p><strong>Rating : &#11088;</strong>${imdbRating}</p>`;
    moviecontainer.appendChild(movieElement);

    const movieGenreElement = document.createElement('div');
    movieGenreElement.classList.add('movie-genre');

    Genre.split(",").forEach(element => {
        const p = document.createElement('p');
        p.innerHTML = element;
        movieGenreElement.appendChild(p);
    });

    movieElement.appendChild(movieGenreElement)

    movieElement.innerHTML += `
    <p><strong>Released : </strong>${Released}</p>
    <p><strong>Duration : </strong>${Runtime}</p>
    <p><strong>Cast : </strong>${Actors}</p>
    <p><strong>Plot : </strong>${Plot}</p>`;


    //Poster
    const moviePosterElement = document.createElement('div');
    moviePosterElement.classList.add('movie-poster');
    moviePosterElement.innerHTML = `<img src="${Poster}"/>`;

    moviecontainer.appendChild(moviePosterElement);
    moviecontainer.appendChild(movieElement);
}


const showErrorMessage = (message) => {
    moviecontainer.innerHTML = `<h2>${message}</h2>`;
}

// Adding Eventlistner to search
searchform.addEventListener('submit', (e)=>{
    e.preventDefault();
    const moviename = inputbox.value.trim();
    if(moviename != ''){
        
        showErrorMessage("Fetching Movie Info...");
        getmovieinfo(moviename);
    }
    else{
        showErrorMessage("Enter Movie Name First to get Information");
    }
});
