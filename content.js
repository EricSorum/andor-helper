console.log("content.js")

const observer = new MutationObserver(() => {
  document.querySelectorAll(".boxart-container").forEach(setupMovies);
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});


function setupMovies() {
  console.log("setup")
  let movieSelector = ".boxart-container"
  const movies = document.querySelectorAll(movieSelector);
  console.log("map " + movies[0])
  // movies.forEach(movie => addLayover(movie));

  movies?.forEach(movie => removeImg(movie));
}

function removeImg(movie) {
  console.log("removeImg")
  movie.innerHTML = ""
}

function addLayover(movie) {
  console.log("addLayover")
  const layoverImg = document.createElement("img");
  layoverImg.classList.add("andor-layover-img");
  movie.appendChild(layoverImg);
  layoverImg.src = "./images/andor-full.png";

  const layoverTxt = document.createElement("div");
  layoverTxt.classList.add("andor-layover-txt");
  layoverTxt.innerText = "You could be watching Andor instead";
}

