let slider = document.querySelector("#poster-slider")
let movies = []

const url =
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&release_date.gte=2024-01-01&release_date.lte=2024-02-29&sort_by=primary_release_date.desc";
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
  // i'm not sure that JSON.objects behaves like Arrays so for security i made a shallow (lady Gaga) copy into an Array
    movies = Array.from(data.results)
  // loop through every element of my new Array and inject photo into the DOM
    for(let i = 0; i < 7; i++) {
      //check if poster image exists and assigns the id of the movie to the button that contains the poster and the title of the movie in html
      if(data.results[i].poster_path) {
        slider.innerHTML += `<button id=${data.results[i].id}><img src= https://image.tmdb.org/t/p/w500${data.results[i].poster_path} alt="">
      <h1 class="title">${data.results[i].title}</h1></button>`
    }
    else {
      slider.innerHTML += `<img src= "https://salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png" alt="">
      <h1 class="title">${data.results[i].title}</h1>`
    }

    // select all the buttons that contain the posters and titles of the movies
    let buttonDetails = document.querySelectorAll('button'); 
    // create an new array with all buttons to secure (see Omar's comment about lady gaga to understsand better)
    let newbuttonDetails = Array.from(buttonDetails);
    // there's a forEach loop on all the buttons which adds an eventListener on click to every button, sends user to another page called 'details.html' and sends the id of the movie on which you clicked to the url
    newbuttonDetails.forEach((button) => {
      button.addEventListener("click", (e) => {
        document.location.href = `/details.html?id=${e.currentTarget.id}`
      })
    })
  }
  return data;

})
.catch((err) => console.error("error:" + err));

