const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const socket = require('socket.io');

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

const deviceFinder = require('./routes/api/device_find.js')(io);

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.set('socketio', io);
app.use('/api/devices', deviceFinder);