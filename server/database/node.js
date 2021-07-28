const Node = require('./models/Node');

const getNodeInfoByIP = async (ip) => {
    let node = await Node.findOne({ 'interfaces.ip_address': { $regex: ip} });
    return node
}


module.exports.getNodeInfoByIP = getNodeInfoByIP;
