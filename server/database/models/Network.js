const mongoose = require('mongoose')
const Schema = mongoose.Schema

const networkSchema = new mongoose.Schema({
    user:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    ipNetwork:{
        type: Object,
        required: true
    },
    ipAddress:{
        type: Object,
        required: true
    },
    firstAddress:{
        type: Object,
        required: true
    },
    lastAddress:{
        type: Object,
        required: true
    },
    broadcastAddress:{
        type: Object,
        required: true
    },
    subnetMask:{
        type: Object,
        required: true
    },
    subnetMaskLength:{
        type: Object,
        required: true
    },
    numHosts:{
        type: Object,
        required: true
    },
})

module.exports = mongoose.model('networks',networkSchema);