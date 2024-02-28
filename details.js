let recommendations = document.querySelector(".recommendation")
let populaire = document.querySelector(".populaire");
let movies = []
let ReMovies = []
// variable that gets the id in the url
let id = new URL(document.location.href).searchParams.get('id');
let detailContainer = document.querySelector('.detailContainer');
let date = new Date();
let year = date.toLocaleString("default", { year: "numeric" });
let month = date.toLocaleString("default", { month: "2-digit" });
let day = date.toLocaleString("default", { day: "2-digit" });
let formattedDate = year + "/" + month + "/" + day;
let title = document.querySelector('title');

const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_date.gte=${formattedDate}&sort_by=popularity.desc`;
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTZiZDYzYjNmN2RlMjVjZDA5N2E2MzQ0ZTExYzhiMiIsInN1YiI6IjY1ZGM5ZTVhMDNiZjg0MDE0NWFlMjM2NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e4W_1hREgdktDza0Towxm4obee1wwZ_dde0fZLC92RM",
  },
};

const ReUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=${navigator.language}&page=1&sort_by=popularity.desc`;
const ReOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTZiZDYzYjNmN2RlMjVjZDA5N2E2MzQ0ZTExYzhiMiIsInN1YiI6IjY1ZGM5ZTVhMDNiZjg0MDE0NWFlMjM2NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e4W_1hREgdktDza0Towxm4obee1wwZ_dde0fZLC92RM'
  }
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
      if (element.id == id) {
        title.innerText = `${element.title}`
        detailContainer.innerHTML = `
            <img src= https://image.tmdb.org/t/p/w500${element.poster_path} alt="">
            <h1 class="title">${element.title}<h1>
            <p>${element.release_date}</p>
            <p>${element.overview}</p>`
      } else {
        console.log("hello");
        fetch(ReUrl, ReOptions)
          .then(response => response.json()
          )
          .then((data) => {

            ReMovies = Array.from(data.results)
            console.log(data.results.title);
          })
          .catch(err => console.error('error:' + err));
      }
    })
  })
  .catch((err) => console.error("error:" + err));

fetch(ReUrl, ReOptions)
  .then(response => response.json())
  .then((data) => {

    ReMovies = Array.from(data.results)

    for (let i = 0; i < 6; i++) {

      if (data.results[i].poster_path) {
        populaire.innerHTML += `
      <button id=${data.results[i].id}><img src= https://image.tmdb.org/t/p/w500${data.results[i].poster_path} alt="">
      <h1 class="title">${data.results[i].title}</h1></button>`
      }
      else {
        recommendations.innerHTML += `<img src= "https://salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png" alt="">
      <h1 class="title">${data.results[i].title}</h1>`
      }
      // select all the buttons that contain the posters and titles of the movies

    }
    let buttonDetails = document.querySelectorAll('button');
    // create an new array with all buttons to secure (see Omar's comment about lady gaga to understsand better)
    let newbuttonDetails = Array.from(buttonDetails);
    // there's a forEach loop on all the buttons which adds an eventListener on click to every button, sends user to another page called 'details.html' and sends the id of the movie on which you clicked to the url
    newbuttonDetails.some((button) => {
      button.addEventListener("click", (e) => {
        // document.location.href = `/details.html?id=${e.currentTarget.id}`
        ReMovies.some((element) => {
          document.location.href = `/details.html?id=${e.currentTarget.id}`
          if (element.id == e.currentTarget.id) {
            title.innerText = `${element.title}`
            detailContainer.innerHTML = `
          <img src= https://image.tmdb.org/t/p/w500${element.poster_path} alt="">
          <h1 class="title">${element.title}<h1>
          <p>${element.release_date}</p>
          <p>${element.overview}</p>`
            return true
          }
        })
      })
    })
    return data;
  })
  .catch(err => console.error('error:' + err));

// const getRecommandationDetails = () => {
//     ReMovies.find((element) => {
//         if(element.id == e.currentTarget.id) {
//             document.location.href = `/details.html?id=${e.currentTarget.id}`
//             title.innerText = `${element.title}`
//             detailContainer.innerHTML = `
//             <img src= https://image.tmdb.org/t/p/w500${element.poster_path} alt="">
//             <h1 class="title">${element.title}<h1>
//             <p>${element.release_date}</p>
//             <p>${element.overview}</p>`
//         }
//     })
//   }