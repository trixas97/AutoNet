const express = require('express');
const router = express.Router();

// Get Posts
router.get('/', (req,res) => {
    res.send('Hello');
});

// Add Posts

// Delete Posts


module.exports = router;