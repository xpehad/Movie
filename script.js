const APIKEY = "11877679e72724b06fe37394f2782165";
const BASE_API = "https://api.themoviedb.org/3";
const BASE_IMG = "https://image.tmdb.org/t/p/w500";

const main = document.getElementById("list-movie");
const form = document.getElementById("form");
const search = document.getElementById("search");

let popularMovie = () => {
	fetch(`${BASE_API}/discover/movie?api_key=${APIKEY}&sort_by=popularity.desc`)
		.then((res) => res.json())
		.then((list) => {
			showMovies(list.results);
		});
};

function getPopular() {
	popularMovie();
}

popularMovie();

let showMovies = (listMovie) => {
	main.innerHTML = "";
	listMovie.forEach((item) => {
		const containerMovie = document.getElementById("list-movie");
		const { title, poster_path, vote_average, release_date } = item;
		containerMovie.innerHTML += `
        <div class="col-md-3">
        <div class="card mx-auto">
            <img src="${BASE_IMG + poster_path}" class="card-img-top" alt="${title}">
            <div class="card-title d-flex">
                <p class="movie-title">${title}</p>
                <p class="rating ms-auto ${colorRating(vote_average)}">${vote_average}</p>
            </div>
            <div class="card-date">
                <p>${release_date}</p>
            </div>
        </div>
    </div>`;
	});
};

function colorRating(vote) {
	if (vote >= 7) {
		return "text-success";
	} else if (vote >= 5) {
		return "text-warning";
	} else {
		return "text-danger";
	}
}

form.addEventListener("submit", (e) => {
	e.preventDefault();

	const dataInput = search.value;
	if (dataInput) {
		let search = () => {
			fetch(`${BASE_API}/search/movie?api_key=${APIKEY}&query=${dataInput}&page=1`)
				.then((res) => res.json())
				.then((listMovie) => {
					showMovies(listMovie.results);
				});
		};
		search();
	} else {
		popularMovie();
	}
});
