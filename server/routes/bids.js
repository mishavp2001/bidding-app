var fs = require('fs');
const path = require('path');
const bids = require('../data/bids.js');

module.exports = (app, io) => {
   let socketConnection;
   let projects = [];
   let t = [];  // I usually don't like using global variables but hope it's ok for DEMO's purpose

   //console.log(movies);
   //Establishes socket connection.

   io.on('connection', socket => {
       console.log("New bidid client connected");

       socket.on('bids', function(bidid){
          socket.join(bidid);
          t[bidid] = setInterval(() => {
              console.log("Emit bid for " + bidid);
              io.sockets.in(bidid).emit('bids', bids(1));
            }, 10000);
       });
       socket.on('stop', function (bidid) {
            console.log('stopping timer now.');
            clearInterval(t[bidid]);
       });
   });
};
