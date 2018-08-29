var fs = require('fs');
const path = require('path');
const generaterojects = require('../data/projects.js');

module.exports = (app, io) => {
   let socketConnection;
   let i = 0;
   let projects = [];

   //console.log(movies);
   //Establishes socket connection.
   io.on("connection", socket => {
       console.log('Connected IO');
       socket.on('projects', function(temp){
            setInterval(()=>{
              i++;
              projects = generaterojects(1).concat(projects);
              io.emit('projects', projects);
            }, 2000)
       });
   });
};
