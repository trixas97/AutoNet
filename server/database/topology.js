const Topology = require('./models/Topology');
const Node = require('./models/Node');
const Link = require('./models/Link');
const mongoose = require('mongoose');


const getTopologies = async (ip) => {
    let node = await Node.findOne({ 'interfaces.ip_address': { $regex: ip} });
    let topologies = await Topology.find({ 'nodes.id': node._id });
    return topologies
}


module.exports.getTopologies = getTopologies;