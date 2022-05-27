const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nodeSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    username: {
        type: Object,
        required: true,
    },
    password: {
        type: Object,
        required: true,
    },
    privPass: {
        type: Object,
        required: false,
    },
    confPass: {
        type: Object,
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
    stp: {
        type: Object,
        required: true
    },
    mac: {
        type: Object,
        required: true
    },
    serial: {
        type: Object,
        required: true,
    },
    interfaces:{
        type: Array,
        required: true
    },
    ospf:{
        type: Array,
        required: true
    },
    eigrp:{
        type: Array,
        required: true
    },
    topologyInfo:{
        type: Object,
        required: false
    },
    status: {
        type: Object,
        required: true
    },
    os: {
        type: Object,
        required: true
    }
});

module.exports = mongoose.model("nodes", nodeSchema);