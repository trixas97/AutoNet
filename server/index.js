const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const socket = require('socket.io');
const mongoose = require('mongoose');
const defaultGateway = require('default-gateway');
const { networkInterfaces } = require('os');
require('dotenv/config');

const app = express();

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

let io = socket(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
});

const snmp = require('./snmp')(io);
const syslog = require('./syslog')(io);
const { socketsListeners } = require('./sockets');
socketsListeners(io)
const authRoute = require("./routes/auth.js");
const nodesFinder = require('./routes/api/nodes_find.js')(io);
const {nodesSave} = require('./routes/api/nodes_save.js');
const saveTopology = require('./routes/api/topology');
const links = require('./routes/api/links');
const { getServerInfo, updateServerInfo, addServerInfo } = require('./database/server');
const consoleDevice = require('./routes/api/console')(io);

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/user', authRoute);
app.use('/api/devices', nodesFinder);
app.use('/api/nodesSave', nodesSave(io));
app.use('/api/topology', saveTopology);
app.use('/api/links', links);
app.use('/api/console', consoleDevice);


mongoose.connect(
  process.env.DB_CONNECTION, { useUnifiedTopology: true, useNewUrlParser: true }, async (err) => {
    
    if(err){
      throw err;
    }
    
    console.log("connected to DB!");

    let server = await getServerInfo()
    if(!server){
      const nets = networkInterfaces();
      const results = Object.create(null); // Or just '{}', an empty object

      for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
          if (net.family === 'IPv4' && !net.internal) {
            if (!results[name]) {
              results[name] = [];
            }
              await results[name].push(net.address);
          }
        }
      }
      const {interface} = defaultGateway.v4.sync();
      addServerInfo(results[interface][0], process.env.PORT || 5000 , process.env.PORT || 8080)
    }else{
      const {interface} = defaultGateway.v4.sync();
      updateServerInfo(server)
    }


  }
);

const {updateNodesData} = require('./dataNodesReceiver') 
updateNodesData()
setInterval(updateNodesData, 60000);