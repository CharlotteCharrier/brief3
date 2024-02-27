let movies = []
// variable that gets the id in the url
const id = new URL(document.location.href).searchParams.get('id');
let detailContainer = document.querySelector('.detailContainer');
let date = new Date();
let year = date.toLocaleString("default", { year: "numeric" });
let month = date.toLocaleString("default", { month: "2-digit" });
let day = date.toLocaleString("default", { day: "2-digit" });
let formattedDate = year + "-" + month + "-" + day;
let title = document.querySelector('title');

const url = `https://api.themoviedb.org/3/discover/movie?certification.gte=${formattedDate}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTZiZDYzYjNmN2RlMjVjZDA5N2E2MzQ0ZTExYzhiMiIsInN1YiI6IjY1ZGM5ZTVhMDNiZjg0MDE0NWFlMjM2NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e4W_1hREgdktDza0Towxm4obee1wwZ_dde0fZLC92RM",
  },
};
// Fetch API call
const result = fetch(url, options)
  // returns a promise
  .then((response) => response.json())
  // again another promise
  .then((data) => {
    // secure the array by making sure it is an array that contains the results
    movies = Array.from(data.results)
    // look into the movies array for the element that has the same id we got into the url and injects information in html when found
    movies.find((element) => {
        if(element.id == id) {
            title.innerText = `${element.title}`
            detailContainer.innerHTML = `
            <img src= https://image.tmdb.org/t/p/w500${element.poster_path} alt="">
            <h1 class="title">${element.title}<h1>
            <p>${element.release_date}</p>
            <p>${element.overview}</p>`
        }
    })
})
.catch((err) => console.error("error:" + err));