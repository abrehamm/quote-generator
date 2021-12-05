const quote = document.getElementById("quote");
const author = document.getElementById("author");
const newButton = document.getElementById("new-quote");
const twitterButton = document.getElementById("twitter");
const quoteText = document.querySelector(".quote-text");
const quoteContainer = document.querySelector(".quote-container");
const loader = document.querySelector(".loader");

async function getQuote() {
  // Show spinner when fetching quote from API
  quoteContainer.hidden = true;
  loader.hidden = false;

  const url = "https://api.quotable.io/random";
  try {
    const response = await fetch(url, {
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
    newQuote = await response.json();
    if (newQuote.length > 100) {
      quoteText.classList.remove("quote-text");
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
      quoteText.classList.add("quote-text");
    }
    quote.innerText = newQuote.content;
    author.innerText = newQuote.author;
  } catch (error) {
    console.error(error);
  }

  //Show content when fetching quote is done
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Initialize page with quote
getQuote();

newButton.addEventListener("click", getQuote);
twitterButton.addEventListener("click", () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text="${quote.textContent}" - ${author.textContent}`;
  window.open(twitterUrl, "_blank");
});
