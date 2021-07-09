const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nodeSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        min: 3
    },
    vendor: {
        type: String,
        required: true,
        min: 3
    },
    type: {
        type: String,
        required: true,
        min:3
    },
    model: {
        type: String,
        required: true,
        min:3
    },
    interfaces:{
        type: Array,
        required: true
    },
    topologyInfo:{
        type: Object,
        required: false
    }
});

module.exports = mongoose.model("nodes", nodeSchema);