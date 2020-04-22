var url = 'http://newsapi.org/v2/top-headlines?' +
          'sources=bbc-news&' +
          'apiKey=c53d6160b14b48d68a124fce366c9f02';
var req = new Request(url);
fetch(req)
    .then(function(response) {
        console.log(response.json());
    })