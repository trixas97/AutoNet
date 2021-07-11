const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const linkSchema = new mongoose.Schema({
    nodeStart: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'nodes'
    },
    ifStart:{
        type: String,
        required: true
    },
    nodeEnd: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'nodes'
    },
    ifEnd:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model("links", linkSchema);