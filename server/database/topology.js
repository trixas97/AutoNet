const Topology = require('./models/Topology');
const Node = require('./node');

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

const newTopology = async (name, nodes) => {

    nodes = await modifyDataTopo(nodes, modifyTypeTopo.save);

    const topology = new Topology({
        user: req.user._id,
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


modifyDataTopo = async (data, type) => {
    return new Promise(async resolve => { 
        let res = [];
        switch(type){
            
            case modifyTypeTopo.save:
                let position = 0;
                for (let i=0; i < data.length; i++){
                    data[i] = await new Promise(resolve => resolve({ id: mongoose.Types.ObjectId(data[i]), x: position, y: 0, label: { x: 0, y: 0 } }));
                    position += 50
                    if(i == data.length-1) resolve(data);
                }
                break;
        }
    })
}



module.exports.getTopologies = getTopologies;
module.exports.setNodesTopology = setNodesTopology;
module.exports.newTopology = newTopology;