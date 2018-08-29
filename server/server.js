'use strict';

const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');

var http = require('http').createServer(app);
var io = require('socket.io')(http);

const path = require('path');
const bodyParser = require('body-parser');

app.use(express.static('dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const authCheck = jwt({
  secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        // YOUR-AUTH0-DOMAIN name e.g https://prosper.auth0.com
        jwksUri: "mishavp2001.auth0.com/.well-known/jwks.json"
    }),
    // This is the identifier we set when we created the API
    audience: 'https://mishavp2001.auth0.com/api/v2/',
    issuer: 'mishavp2001.auth0.com',
    algorithms: ['RS256']
});

require('./routes/projects.js')(app, io);
require('./routes/bids.js')(app, io);

//Static JSON response
const projects = require('./data/projects.js');
const bids = require('./data/bids.js');
let projectsRes = projects(100);
let bidsResp = bids(10);
app.get('/api/projects', (req, res) => {
  res.json(projectsRes);
})
app.get('/api/bids', (req, res) => {
  res.json(bidsResp);
})


http.listen(8080, () => console.log('Listening on port 8080!'));
