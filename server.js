// Require Express.js
const express = require('express')
const app = express()

const args = require('minimist')(process.argv.slice(2));
args['port']
const HTTP_PORT = args.port || 5000  || process.env.PORT

// Start an app server
const server = app.listen(HTTP_PORT, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',HTTP_PORT))
});

// Default response for any other request
/*
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
}); */

/*app.get('/app/', (req, res) => {
    // Respond with status 200
        res.statusCode = 200;
    // Respond with status message "OK"
        res.statusMessage = 'OK';
        res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
        res.end(res.statusCode+ ' ' +res.statusMessage)
    });*/

// Simplified of the given one
app.get('/app/', (req, res) => {
    res.status(200).end('OK')
    res.type('text/plain')
});

app.use(function (req, res) {
    res.status(404).end('404 NOT FOUND')
    res.type('text/plain')
})

// TODO: Endpoints

app.get('/app/flip/', (req, res) => {
    const flip = coinFlip();
    res.status(200).json({'flip' : coinFlip()})
});

app.get('/app/flip/:number', (req, res) => {
    const flips = coinFlips(req.params.number);
    const count = countFlips(flips);
    res.status(200).json({'raw': flips, 'summary': count})
});

app.get('/app/flip/call/heads', (req, res) => {
    res.status(200).json(flipACoin("heads"))
});

app.get('/app/flip/call/tails', (req, res) => {
    res.status(200).json(flipACoin("tails"))
});


// Coin functions from a02

// coinFlip()

function coinFlip() {
    return Math.random() > 0.5 ? "heads" : "tails"
  }
  
 // coinFlips(flips)
  
  function coinFlips(flips) {
    const result = [];
    for (var i=0; i<flips; i++) {
      result[i] = coinFlip();
    }
    return result;
  }
  
  // countFlips(array)
  
  function countFlips(array) {
    var headCount = 0;
    var tailCount = 0;
  
    for(var i=0;i<array.length; i++) {
      if (array[i] === 'heads'){
        headCount++;
      } else {
        tailCount++;
      }
    }
    return {heads: headCount, tails: tailCount};
  }
  
  // flipACoin(call)
  
  function flipACoin(call) {
    var flip = coinFlip();
  
    if (call == flip) {
      return {call: call, flip: flip, result: 'win'}
    } else {
      return {call: call, flip: flip, result: 'lose'}
    }
  }