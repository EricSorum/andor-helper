let movieSelector = ".boxart-container"
const movies = document.querySelectorAll(movieSelector);
movies.forEach(movie => addLayover(movie))

function addLayover(movie) {
  const layoverImg = document.createElement("img");
  layoverImg.classList.add("andor-layover-img");
  movie.appendChild(layoverImg);
  layoverImg.src = "./images/andor-full.png";

  const layoverTxt = document.createElement("div");
  layoverTxt.classList.add("andor-layover-txt");
  layoverTxt.innerText = "You could be watching Andor instead";

  chrome.scripting.insertCSS({
    target: { tabId: currentTabId },
    files: ['andor.css']
  });

}