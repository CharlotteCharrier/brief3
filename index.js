let slider = document.querySelector("#poster-slider")
let movies = []
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
  // i'm not sure that JSON.objects behaves like Arrays so for security i made a shallow (lady Gaga) copy into an Array
    movies = Array.from(data.results)
  // loop through every element of my new Array and inject photo into the DOM
    for(let i = 0; i < 7; i++) {
      //check if poster image is exists
      if(data.results[i].poster_path) {
        slider.innerHTML += `<button id=${data.results[i].id}><img src= https://image.tmdb.org/t/p/w500${data.results[i].poster_path} alt="">
      <h1 class="title">${data.results[i].title}</h1></button>`
    }
    else {
      slider.innerHTML += `<img src= "https://salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png" alt="">
      <h1 class="title">${data.results[i].title}</h1>`
    }

    
    let buttonDetails = document.querySelectorAll('button'); 
    let newbuttonDetails = Array.from(buttonDetails);
    newbuttonDetails.forEach((button) => {
      button.addEventListener("click", (e) => {
        document.location.href = `/details.html?id=${e.currentTarget.id}`
        getMovieDetails();
        // const id = new URL(document.location.href).searchParams.get('id')
      })
    })
      // buttonDetails.addEventListener('click', (e) => {
      //   console.log("test");
      // })
  }
  return data;
  
})
.catch((err) => console.error("error:" + err));

