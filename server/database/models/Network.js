const mongoose = require('mongoose')
const Schema = mongoose.Schema

const networkSchema = new mongoose.Schema({
    user:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    ip:{
        type: Object,
        required: true
    },
    mask:{
        type: Object,
        required: true
    },
    gateway:{
        type: Object,
        required: true
    }
})

module.exports = mongoose.model('networks',networkSchema);