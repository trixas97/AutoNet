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
    privPass: {
        type: String,
        required: false,
    },
    confPass: {
        type: String,
        required: false,
    },
    name: {
        type: Object,
        required: true,
    },
    vendor: {
        type: Object,
        required: true,
    },
    type: {
        type: Object,
        required: true,
    },
    model: {
        type: Object,
        required: true,
    },
    upTime: {
        type: Object,
        required: true,
    },
    runConf: {
        type: Object,
        required: true,
    },
    startConf: {
        type: Object,
        required: true,
    },
    route_table: {
        type: Object,
        required: true,
    },
    arp_table: {
        type: Object,
        required: true,
    },
    acl: {
        type: Object,
        required: true,
    },
    cdp: {
        type: Object,
        required: true,
    },
    serial: {
        type: Object,
        required: true,
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