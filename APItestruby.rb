require 'open-uri'
url = 'http://newsapi.org/v2/top-headlines?'\
      'country=us&'\
      'apiKey=c53d6160b14b48d68a124fce366c9f02';
req = open(url)
response_body = req.read
puts response_body