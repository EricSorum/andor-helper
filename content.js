function determineSelector() {
  const url = window.location.href;
  console.log("determine")
  const siteSelectors = {
    "netflix.com": ".boxart-container",
    "hulu.com": ".boxart-container",
    "disneyplus.com": 'div[data-testid="set-item-tile"]',
    "tv.apple.com": ".artwork-component",
    "amazon.com": 'article[data-testid="card"]'
  };

  for (const [key, selector] of Object.entries(siteSelectors)) {
    if (url.includes(key)) {
      console.log(selector)
      return selector;
    }
  }
}

const observer = new MutationObserver(() => {
  const movies = document.querySelectorAll(determineSelector());
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

