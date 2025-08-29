const observer = new MutationObserver(() => {
  const movies = document.querySelectorAll(".boxart-container");
  if (movies.length) {
    movies.forEach(movie => addLayover(movie));
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

function addLayover(movie) {
  if (movie.querySelector(".andor-layover-div")) {
    return;
  }
  const div = document.createElement("div");
  div.classList.add("andor-layover-div");
  div.innerText = "You could be watching Andor right now";
  div.style.backgroundImage = `url(${chrome.runtime.getURL("images/andor-full.png")})`;
  movie.appendChild(div);
}

