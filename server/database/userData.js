const Topology = require('./models/Topology');
const Node = require('./models/Node');
const Link = require('./models/Link');
const User = require('./models/User');
const Networks = require('./models/Network');
const Server = require('./models/Server');

const getUserData = async (username) => {
    let user = await User.findOne({username: username})
    let nodes = await Node.find({user: user._id})
    nodes = await modifyNodesData(nodes)
    let topologies = await Topology.find({user: user._id})
    let linksParameters = await linksParams(nodes)
    let links = await Link.find({ $or: linksParameters });
    let networks = await Networks.find({user: user._id})
    let server = await Server.findOne()
    let users = await User.count()
    let completeData = {server: server, nodes: nodes, topologies: topologies, links: links, networks: networks, users: users, userInfo: user}
    return completeData
}

const getUser = async (username) => {
    let user = await User.findOne({username: username})
    return user
}

const getUsersNode = async (node) => {
    let users = await User.find({_id: node.user})
    return users;
}

const getUserNodes = async (username) => {
    let user = await User.findOne({username: username})
    let nodes = await Node.find({user: user._id})
    return nodes;
}

const setUserCredentials = async (user, credentials) => {
    try{
        let userCredentials = { username: credentials.username}
        if(credentials.password !== undefined){
            userCredentials.password = credentials.password
        }
        const savedData = await User.updateOne({username: user}, userCredentials)
        return { message: 'User Credentials Saved', data: credentials };
    }catch (err){
        return { message: err};
    }
}

const setUserDetails = async (user, details) => {
    try{
        const savedData = await User.updateOne({username: user}, {name: details.firstname, surname: details.surname, email: details.email})
        return { message: 'User Details Saved', data: details };
    }catch (err){
        return { message: err};
    }
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

modifyNodesData = (nodes) => {
    return new Promise(async resolve => {
        for(let i=0; i < nodes.length; i++){
            for(let j=0; j < nodes[i].interfaces.length; j++){
                let res = [];
                let trafficLength = nodes[i].interfaces[j].traffic.value.length;
                for(let k=trafficLength >= 6 ? trafficLength-6 : 0; k < trafficLength; k++){
                    res.push(await new Promise(resolve => resolve(nodes[i].interfaces[j].traffic.value[k])))
                }
                nodes[i].interfaces[j].traffic.value = res;
            }
            if(i == nodes.length-1)
                resolve(nodes)
        }
    })
}

module.exports.getUserData = getUserData;
module.exports.getUser = getUser;
module.exports.getUsersNode = getUsersNode;
module.exports.setUserCredentials = setUserCredentials;
module.exports.setUserDetails = setUserDetails;
module.exports.modifyNodesData = modifyNodesData;
module.exports.getUserNodes = getUserNodes