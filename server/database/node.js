const Node = require('./models/Node');
const { getUsersNode, modifyNodesData } = require('./userData');
const { emitTraffic, emitNode, emitNodeInterfaceStatus } = require('../sockets');
const {initTraffic, setInterfacesNetworks} = require('../routes/api/nodes_save')


const getNodeInfoByIP = async (ip) => {
    let node = await Node.findOne({ 'interfaces.ip_address.value': { $regex: ip+'/'} });
    return node
}

const getNodeInfoByID = async (id) => {
    let node = await Node.findOne({ _id: id});
    return node
}

const getAllNodes = async () => {
    let nodes = await Node.find({"interfaces.mainIf.value": true}, {"interfaces.ip_address.value": 1, "interfaces.mainIf.value": 1, "username.value": 1, "password.value": 1})
    const modifiedNodes = nodes.map(node  => {
        return {
            _id: node._id,
            ip: node.interfaces.find(inter => inter.mainIf.value === true).ip_address.value, 
            username: node.username.value,
            password: node.password.value
        }
    })
    return modifiedNodes
}

const setTraffic = async (ip, traffic, io) => {
    let node = await getNodeInfoByIP(ip);
    if(node !== null)
        node = await modifyNodeData('traffic', node, traffic);

    try{
        const savedNode = await Node.updateOne({ _id: node._id }, { interfaces: node.interfaces });
        const users = await getUsersNode(node)
        emitTraffic(users,traffic)
    }catch (err){
        console.log(err);
    }
}

const setNodeStatus = async (node, status) => {
    try{
        node = await getNodeInfoByID(node._id)
        const users = await getUsersNode(node)
        node.status.value = status
        const updateResult = await Node.updateOne({_id: node._id}, {"status.value": node.status.value})
        node = await modifyNodesData([node])
        node = node[0]
        if(updateResult.nModified === 1){
            emitNode(users,node)
        }
    }catch(err){
        console.log(err)
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

const updateNodeData = async (newNode) => {
    let node = await getNodeInfoByID(newNode._id)
    const users = await getUsersNode(node)
    let updatedNode = {...node, ...newNode}
    if(updatedNode.interfaces.length > node.interfaces.length){
        let newInterfaces = updatedNode.interfaces.reduce((interfaces, inter) => {
            if(!node.interfaces.find(interNode => interNode.interface.value === inter.interface.value)){
                interfaces.push(inter)
            }
            return interfaces
        },[])
        newInterfaces = await initTraffic(newInterfaces)
        newInterfaces = await setInterfacesNetworks(newInterfaces)
        newInterfaces.map(newInter => node.interfaces.push(newInter))
    }

    updatedNode.interfaces = node.interfaces.map(oldInter => {
        return {...oldInter, ...updatedNode.interfaces.find(inter => oldInter.interface.value === inter.interface.value)}
    })
    updatedNode.status.value = true

    try{
        const updateResult = await Node.updateOne({ _id: updatedNode._id},{$set: {
            username: updatedNode.username,
            password: updatedNode.password,
            name: updatedNode.name,
            vendor: updatedNode.vendor,
            type: updatedNode.type,
            status: updatedNode.status,
            model: updatedNode.model,
            upTime: updatedNode.upTime,
            runConf: updatedNode.runConf,
            startConf: updatedNode.startConf,
            route_table: updatedNode.route_table,
            arp_table: updatedNode.arp_table,
            acl: updatedNode.acl,
            cdp: updatedNode.cdp,
            stp: updatedNode.stp,
            mac: updatedNode.mac,
            serial: updatedNode.serial,
            os: updatedNode.os,
            interfaces: updatedNode.interfaces,
            eigrp: updatedNode.eigrp,
            ospf: updatedNode.ospf
        }})
        updatedNode = await modifyNodesData([updatedNode])
        updatedNode = updatedNode[0]
        emitNode(users, updatedNode)
    }catch (err){
        console.log(err)
    }
}

const deleteNode = async (id) => {
    try{
        const deletedNode = await Node.deleteOne({_id: id})
        return { message: 'Node Deleted', data: id };
    }catch(err){
        return { message: err};
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
module.exports.getNodeInfoByID =getNodeInfoByID
module.exports.setTraffic = setTraffic;
module.exports.setNodeStatus = setNodeStatus;
module.exports.updateInterfaceStatus = updateInterfaceStatus;
module.exports.getAllNodes = getAllNodes
module.exports.updateNodeData =updateNodeData
module.exports.deleteNode = deleteNode
