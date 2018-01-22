'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

const sfdx = require('sfdx-node');

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));

  socket.on('showTime',function(){
  			 
        			var list_of_orgs = sfdx.org.list();
        			list_of_orgs
          				.then(function(data){       
                  			//send a message to ALL connected clients
                  			console.log(data);
                  			io.emit('buttonUpdate', data);
              				});
    
  })
});

