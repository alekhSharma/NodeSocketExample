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
  			//authorize a dev hub
			sfdx.org.list({
			    
			})
			.then(function(){
			  //push source
			  return sfdx.org.list();  
			})
			.then(function(){
			  console.log('Source pushed to scratch org');  
		});
  })
});

