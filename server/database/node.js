const Node = require('./models/Node');
const { getUsersNode } = require('./userData');
const { emitTraffic, emitNodeInterfaceStatus } = require('../sockets');

const getNodeInfoByIP = async (ip) => {
    let node = await Node.findOne({ 'interfaces.ip_address.value': { $regex: ip} });
    return node
}

const setTraffic = async (ip, traffic, io) => {
    let node = await getNodeInfoByIP(ip);
    node = await modifyNodeData('traffic', node, traffic);

    try{
        const savedNode = await Node.updateOne({ _id: node._id }, { interfaces: node.interfaces });
        const users = await getUsersNode(node)
        emitTraffic(users,traffic)
    }catch (err){
        console.log(err);
    }
}

const updateInterfaceStatus = async (nodeInterfaceEvent) => {
    const node= await getNodeInfoByIP(nodeInterfaceEvent.ip)
    const users = await getUsersNode(node)
    try{
        const updatedNode = await Node.updateOne(
            { _id: node._id},
            { $set: {
                "interfaces.$[interface].link_status.value": nodeInterfaceEvent.adminStatus,
                "interfaces.$[interface].protocol_status.value": nodeInterfaceEvent.operStatus 
            } },
            { arrayFilters: [ {"interface.interface.value": nodeInterfaceEvent.if }] }
        )
        nodeInterfaceEvent.id = node._id
        emitNodeInterfaceStatus(users, nodeInterfaceEvent)
    }catch (err){
        console.log(err)
    }
}

const modifyNodeData = async (type, node, data) => {
    return new Promise(async resolve => {
        switch(type){
            case 'traffic':
                for(let i=0; i < node.interfaces.length; i++){
                    for(let j=0; j < data.length; j++){
                        if(data[j].interface == node.interfaces[i].interface.value){
                            node.interfaces[i].traffic.value[node.interfaces[i].traffic.value.length] = await new Promise(resolve => resolve({
                                date: data[j].date,
                                message: data[j].message,
                                protocol: data[j].protocol,
                                bytes: data[j].bytes,
                                packets: data[j].packets
                            }));
                        }
                    }
                }
                resolve(node);
                break;
        }
    })
}




module.exports.getNodeInfoByIP = getNodeInfoByIP;
module.exports.setTraffic = setTraffic;
module.exports.updateInterfaceStatus = updateInterfaceStatus;
