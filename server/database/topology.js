const Topology = require('./models/Topology');
const Node = require('./node');
const mongoose = require('mongoose');
const { getUser } = require('./userData');

const modifyTypeTopo = {
    save: 'save',
    get: 'get',
    getAll: 'getAll',
    moreInfo: 'moreInfo',
    getLinks: 'getLinks'
}


const getTopologies = async (ip) => {
    
    let node = await Node.getNodeInfoByIP(ip);
    let topologies = await Topology.find({ 'nodes.id': node._id });
    return topologies
}

const newTopology = async (user, name, nodes) => {

    nodes = await modifyDataTopos(nodes, modifyTypeTopo.save);
    user = await getUser(user)
    const topology = new Topology({
        user: mongoose.Types.ObjectId(user._id),
        name: name,
        nodes: nodes
    })
    
    try {
        const savedTopology = await topology.save();
        return { message: 'Topology Saved', data: savedTopology };

    }catch (err){
        return { message: err};
    }
}

const setNodesTopology = async (topology) => {
    try{
        const savedTopology = await Topology.updateOne({ _id: topology._id }, { nodes: topology.nodes });
    }catch (err){
        console.log(err);
    }
}


modifyDataTopos = async (data, type) => {
    return new Promise(async resolve => { 
        let res = [];
        switch(type){
            
            case modifyTypeTopo.save:
                let position = 0;
                if (data.length ==0)
                    resolve([])
                for (let i=0; i < data.length; i++){
                    data[i] = await new Promise(resolve => resolve({ id: mongoose.Types.ObjectId(data[i]), x: position, y: 0, label: { x: position+20, y: position+40 } }));
                    position += 60
                    if(i == data.length-1) resolve(data);
                }
                break;
        }
    })
}



module.exports.getTopologies = getTopologies;
module.exports.setNodesTopology = setNodesTopology;
module.exports.newTopology = newTopology;