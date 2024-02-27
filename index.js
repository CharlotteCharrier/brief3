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

const result = fetch(url, options)
  .then((response) => response.json())
  .then((data) => {
    console.log(
      data.results.forEach((element) => {
        console.log(element.title);
      })
    );
    return data;
  })
  .catch((err) => console.error("error:" + err));
