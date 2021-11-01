const Node = require('./models/Node');

const getNodeInfoByIP = async (ip) => {
    let node = await Node.findOne({ 'interfaces.ip_address.value': { $regex: ip} });
    return node
}

const setTraffic = async (ip, traffic) => {
    let node = await getNodeInfoByIP(ip);
    node = await modifyNodeData('traffic', node, traffic);

    try{
        const savedNode = await Node.updateOne({ _id: node._id }, {
            interfaces: node.interfaces
        });
    }catch (err){
        console.log(err);
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
