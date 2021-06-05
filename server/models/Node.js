const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nodeSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users'
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
    }
});

module.exports = mongoose.model("nodes", nodeSchema);