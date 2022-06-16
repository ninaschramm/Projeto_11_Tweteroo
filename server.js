import express from "express";
import cors from 'cors';

const server = express();

server.use(
    express.urlencoded({
        extended: true,
    })
);

server.use(express.json())
server.use(cors())

server.use(function (request, response, next) {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', '*');
    response.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

const users = [];
const tweets = [];

server.post('/sign-up', (request, response) => {
  users.push(request.body);
  response.send("OK")
});

server.post('/tweets', (request, response) => {
    let body = request.body;
    for (let i=0; i<users.length; i++){
        if (users[i].username === body.username) 
        {body.avatar = users[i].avatar}
    }
    
    if (tweets.length < 10) {
       tweets.push(body); 
    }
    else {
        tweets.shift;
        tweets.push(body); 
    }
    
    response.send("OK")
  })

server.get('/tweets', (request, response) => {
    response.send(tweets)
  })



server.listen(5000)