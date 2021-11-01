const Node = require('./models/Node');

const getNodeInfoByIP = async (ip) => {
    let node = await Node.findOne({ 'interfaces.ip_address.value': { $regex: ip} });
    return node
}

const setTraffic = async (ip, traffic) => {
    let node = await getNodeInfoByIP(ip);
    console.log(node._id);
    console.log('startTRAFFICCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC');
    node = await modifyNodeData('traffic', node, traffic);
    console.log('eNDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD');
    console.log(node.interfaces[16].traffic);
    console.log(node._id);
   
    try{
        const savedNode = await Node.updateOne({ _id: node._id }, {
            interfaces: node.interfaces
        });
          
        console.log(savedNode);
        
        // res.send(savedUser);
    }catch (err){
        // res.json({ message: err});
        console.log(err);
    }
    
    // console.log(node);
}

const modifyNodeData = async (type, node, data) => {
    return new Promise(async resolve => {
        switch(type){
            case 'traffic':
                for(let i=0; i < node.interfaces.length; i++){
                    console.log('interface ' + i);
                    for(let j=0; j < data.length; j++){
                        console.log('data ' + j + ' -> ' + data[j].interface + ' ' + node.interfaces[i].interface.value);
                        if(data[j].interface == node.interfaces[i].interface.value){
                            console.log('if ' + j);
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
