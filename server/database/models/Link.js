const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const linkSchema = new mongoose.Schema({
    nodeStart: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'nodes'
    },
    nodeEnd: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'nodes'
    },
    ifStart:{
        type: Object,
        required: true
    },
    ifEnd:{
        type: Object,
        required: true
    }
});

module.exports = mongoose.model("links", linkSchema);