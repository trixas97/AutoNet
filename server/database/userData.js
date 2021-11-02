const Topology = require('./models/Topology');
const Node = require('./models/Node');
const Link = require('./models/Link');
const User = require('./models/User');

const getUserData = async (username) => {
    let user = await User.findOne({username: username})
    let nodes = await Node.find({user: user._id})
    let topologies = await Topology.find({user: user._id})
    let linksParameters = await linksParams(nodes)
    let links = await Link.find({ $or: linksParameters });
    let completeData = {nodes: nodes, topologies: topologies, links: links}
    return completeData
}

const getUsersNode = async (node) => {
    let users = await User.find({_id: node.user})
    return users;
}

linksParams = async (nodes) => {
    return new Promise(async resolve => { 
        let res = [];
        for (let i=0; i < nodes.length; i++){
            res.push(await new Promise(resolve => resolve({ nodeStart: nodes[i]._id })));
            res.push(await new Promise(resolve => resolve({ nodeEnd: nodes[i]._id })));
            if(i == nodes.length-1) resolve(res);
        }
    });
}

module.exports.getUserData = getUserData;
module.exports.getUsersNode = getUsersNode;