const url = window.location.href;

function determineSelectors() {
  const siteSelectors = {
    "netflix.com": [".boxart-container", ".hero-image-wrapper"],
    "hulu.com": [".boxart-container"],
    "disneyplus.com": ['a[data-testid="set-item"]',],
    "tv.apple.com": [".artwork-component", ".video-container"],
    "amazon.com": ['article[data-testid="card"]', 'div[data-testid="poster-link"]', 'div[data-testid="top-hero"]']
  };

  for (const [key, selectors] of Object.entries(siteSelectors)) {
    if (url.includes(key)) {
      return selectors;
    }
  }
  return [];
}

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    // Only run for any added nodes.
    mutation.addedNodes.forEach(node => {
      // Only run for HTML elements
      if (!(node instanceof HTMLElement)) return;

      const selectors = determineSelectors();
      for (let i = 0; i < selectors.length; i++) {
        const movies = document.querySelectorAll(selectors[i]);
        if (movies.length) {
          movies.forEach(movie => addLayover(movie));
        }
      }
    });
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

function addLayover(movie) {
  // Return if the data attribute has already been added.
  if (movie.dataset.andorAdded) return;

  if (url.includes("disneyplus.com")) {
    const ariaLabel = movie.getAttribute("aria-label");
    if (/^(Star Wars)$|Andor|Rogue One: A Star Wars Story/.test(ariaLabel)) {
      return;
    }
  }


  // Add the Andor element with text and background image.
  const div = document.createElement("div");
  div.classList.add("andor-layover-div");
  div.innerText = "You could be watching Andor right now";
  div.style.backgroundImage = `url(${chrome.runtime.getURL("images/andor-full.png")})`;
  movie.appendChild(div);

  // We add a data attribute when we add the Andor logo the first time, to avoid redundancy.
  movie.dataset.andorAdded = "true";
}

