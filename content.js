function determineSelectors() {
  const url = window.location.href;
  const siteSelectors = {
    "netflix.com": [".boxart-container", ".hero-image-wrapper"],
    "hulu.com": [".boxart-container"],
    "disneyplus.com": ['a[data-testid="set-item"]',],
    "tv.apple.com": [".artwork-component", ".video-container"],
    "amazon.com": ['article[data-testid="card"]', 'div[data-testid="top-hero-wrapper"]']
  };

  for (const [key, selectors] of Object.entries(siteSelectors)) {
    if (url.includes(key)) {
      return selectors;
    }
  }
  return [];
}

const observer = new MutationObserver(() => {
  const selectors = determineSelectors();
  for (let i = 0; i < selectors.length; i++) {
    const movies = document.querySelectorAll(selectors[i]);
    if (movies.length) {
      movies.forEach(movie => addLayover(movie));
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

function addLayover(movie) {

const isAndor = movie.getAttribute("aria-label")?.includes("Andor") ? "Andor" : "Not Andor";

  if (movie.querySelector(".andor-layover-div") 
    || isAndor === "Andor"
  ) {
    return;
  }
  const div = document.createElement("div");
  div.classList.add("andor-layover-div");
  div.innerText = "You could be watching Andor right now";
  div.style.backgroundImage = `url(${chrome.runtime.getURL("images/andor-full.png")})`;
  movie.appendChild(div);
}

