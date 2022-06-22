// API ENDPOINT
const endpoint = 'http://quotes.stormconsultancy.co.uk/random.json';
//console.log(endpoint);

const quoteButton = document.querySelector('#js-new-quote');
// this might select all the buttons?
//document.querySelector('.new-quote button');

quoteButton.addEventListener('click', changeQuote);



async function changeQuote() {
  console.log('clicked button');
  try {
    const response = await fetch(endpoint);
    if(!response.ok) {
      throw Error(response.statusText);
    }
    const json = await response.json();
    console.log(json.quote);
    displayQuote(json.author, json.quote);

  } catch(err) {
    console.log(err);
    console.log('failed');
  }
}

function displayQuote(author, quote) {
  const quoteText = document.querySelector('#js-quote-text');
  const quoteAuthor = document.querySelector('#js-quote-author');
  quoteAuthor.textContent = author;
  quoteText.textContent = quote;
}

window.onload = function() {
  loadPhoto();
};

const NASA = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY';

async function loadPhoto() {
  //console.log("sup");
  const image = document.querySelector("#NASA-img");
  try {
    const response = await fetch(NASA);
    if(!response.ok) {
      throw Error(response.statusText);
    }
    const json = await response.json();
    console.log(json.hdurl);
    changePhoto(json.hdurl);

  } catch(err) {
    console.log(err);
    console.log('failed');
  }
}

function changePhoto(hdurl) {
  const image = document.querySelector("#NASA-img");
  image.src = hdurl;
}
