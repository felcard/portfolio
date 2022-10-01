//could have included below code in the html doc inside <script> tags
//and import quotes from 'https://dolcemaria.co.uk/portf/quotes.js';
//the above import script did not work due to  Access-Control-Allow-Origin issues with the js file hosted on one.com. I had to create other pen with the array and include it as a resource here adding .js to the end of the pen.
let fonty = [
"Bad Script",
"Courgette",
"Neucha",
"Kaushan Script",
"Merienda",
"Rock Salt"];

$(document).ready(function () {
  rand(quotes);
  randFon(fonty);
  $("#new-quote").click(function () {
    rand(quotes);
    randFon(fonty);
  });
});

const rand = q => {
  let ranInd = Math.floor(Math.random() * q.length);
  $("#text").text(q[ranInd].quote);
  $("#author").text(q[ranInd].author);
  //the jQuery attr method gives the "a" anchor element an "href" property with the url address to twitter specifying a hashtag "quotes" and referencing the quote to freecodecamp account by means of "related" and finally using "text=" to add the actual quote and author and using encodeURIComponent function so the text can be properly encoded for twitter to interpret it.
  $("#tweet-quote").attr(
  "href",
  "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
  //below we include double quotes within single quotes '"'
  encodeURIComponent(q[ranInd].quote + '" ' + q[ranInd].author));

};
const randFon = f => {
  let ranf = Math.floor(Math.random() * f.length);
  $("#text").css("font-family", f[ranf]);
};