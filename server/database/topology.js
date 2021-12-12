const Topology = require('./models/Topology');
const Node = require('./node');


const getTopologies = async (ip) => {
    
    let node = await Node.getNodeInfoByIP(ip);
    let topologies = await Topology.find({ 'nodes.id': node._id });
    return topologies
}

const setNodesTopology = async (topology) => {
    try{
        const savedTopology = await Topology.updateOne({ _id: topology._id }, { nodes: topology.nodes });
    }catch (err){
        console.log(err);
    }
}


module.exports.getTopologies = getTopologies;
module.exports.setNodesTopology = setNodesTopology;