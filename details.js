// import { getMovieDetails } from './details.js';


// let slider = document.querySelector("#poster-slider")
let movies = []
const id = new URL(document.location.href).searchParams.get('id');
let detailContainer = document.querySelector('.detailContainer');
let date = new Date();
let year = date.toLocaleString("default", { year: "numeric" });
let month = date.toLocaleString("default", { month: "2-digit" });
let day = date.toLocaleString("default", { day: "2-digit" });
let formattedDate = year + "-" + month + "-" + day;

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
    movies = Array.from(data.results)
    movies.find((element) => {
        if(element.id == id) {
            detailContainer.innerHTML = `
            <img src= https://image.tmdb.org/t/p/w500${element.poster_path} alt="">
            <h1 class="title">${element.title}<h1>
            <p>${element.release_date}</p>
            <p>${element.overview}</p>
            `
        }
    })
})
.catch((err) => console.error("error:" + err));


const getMovieDetails = () => {
    console.log("hello");
    window.addEventListener("load", () => {
        const id = new URL(document.location.href).searchParams.get('id');
        
        const url = `https://api.themoviedb.org/3/credit/${id}`;
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTZiZDYzYjNmN2RlMjVjZDA5N2E2MzQ0ZTExYzhiMiIsInN1YiI6IjY1ZGM5ZTVhMDNiZjg0MDE0NWFlMjM2NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e4W_1hREgdktDza0Towxm4obee1wwZ_dde0fZLC92RM'
          }
        };
        fetch(url, options)
          .then(res => {
            // res.json() 
            console.log("res");})
          .then(json => console.log(json))
          .catch(err => console.error('error:' + err));
    })
}
