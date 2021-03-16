const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const socket = require('socket.io');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

const deviceFinder = require('./routes/api/device_find.js');
app.use('/api/devices', deviceFinder);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
