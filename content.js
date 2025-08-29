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
// Create container div
const div = document.createElement("div");
div.classList.add("andor-layover-div");

// Create image
// const img = document.createElement("img");
// img.src = chrome.runtime.getURL("images/andor-full.png");
// img.classList.add("andor-layover-img");

// Create text
// const txt = document.createElement("div");
// txt.classList.add("andor-layover-txt");
// txt.innerText = "You could be watching Andor right now";

// div.classList.add("andor-layover-txt");
div.innerText = "You could be watching Andor right now";
div.style.backgroundImage = `url(${chrome.runtime.getURL("images/andor-full.png")})`;

// Build structure
// div.appendChild(img);
// div.appendChild(txt);
movie.appendChild(div);

}

