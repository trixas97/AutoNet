const Topology = require('./models/Topology');
const Node = require('./node');


const getTopologies = async (ip) => {
    
    let node = await Node.getNodeInfoByIP(ip);
    let topologies = await Topology.find({ 'nodes.id': node._id });
    return topologies
}


module.exports.getTopologies = getTopologies;