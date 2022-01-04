const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serverSchema = new mongoose.Schema({
    address: {
        type: Object,
        required: true,
        ref: 'ip'
    },
    timestamp: {
        type: Schema.Types.Number,
        required: true,
        ref: 'timestamp'
    }
});

module.exports = mongoose.model("servers", serverSchema);