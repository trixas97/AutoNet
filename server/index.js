const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const socket = require('socket.io');
const mongoose = require('mongoose');
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

const authRoute = require("./routes/auth.js");
const nodesFinder = require('./routes/api/nodes_find.js')(io);
const nodesSave = require('./routes/api/nodes_save.js');

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/user', authRoute);
app.use('/api/devices', nodesFinder);
app.use('/api/nodesSave', nodesSave);

mongoose.connect(
  process.env.DB_CONNECTION, { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
    
    if(err){
      throw err;
    }
    
    console.log("connected to DB!");

  }
);