const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const topologySchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    name: {
        type: String
    },
    nodes: {
        type: Array,
        required: false
    },
    links: {
        type: Array,
        required: false
    }
});

module.exports = mongoose.model('topologies',topologySchema);