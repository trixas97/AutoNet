const router = require('express').Router();
const Topology = require('../../models/Topology');
const Node = require('../../models/Node');
const Link = require('../../models/Link');
const verify = require('../auth/verifyToken');
const mongoose = require('mongoose');

const modifyTypeTopo = {
    save: 'save',
    get: 'get',
    getAll: 'getAll',
    moreInfo: 'moreInfo',
    getLinks: 'getLinks'
}


router.post('/saveTopology', verify, async (req, res) => {

    let data = {};
    Object.keys(req.query).length === 0 ? data = req.body : data = req.query;

    data.nodes = await modifyDataTopo(data.nodes, modifyTypeTopo.save);

    const topology = new Topology({
        user: req.user._id,
        nodes: data.nodes
    })
    

    try {
        const savedTopology = await topology.save();
        res.status(200).send({ message: 'Topoly Saved', data: savedTopology });

    }catch (err){
        res.json({ message: err});
    }
})

router.get('/getTopology', verify, async (req,res) => {
    let data = {};
    Object.keys(req.query).length === 0 ? data = req.body : data = req.query;

    let topology = await Topology.findOne({ _id: data.id });
    const paramsNodes = await modifyDataTopo(topology.nodes, modifyTypeTopo.get);
    const paramsLinks = await modifyDataTopo(topology.nodes, modifyTypeTopo.getLinks);
    const nodes = await Node.find({ $or: paramsNodes });
    const links = await Link.find({ $or: paramsLinks });
    topology.nodes = await modifyDataTopo({ nodes: nodes, nodesTopology: topology.nodes}, modifyTypeTopo.moreInfo);
    topology.links = links
    res.status(200).send(topology);
})

modifyDataTopo = async (data, type) => {
    return new Promise(async resolve => { 
        let res = [];
        switch(type){
            
            case modifyTypeTopo.save:
                for (let i=0; i < data.length; i++){
                    data[i] = await new Promise(resolve => resolve({ id: mongoose.Types.ObjectId(data[i].node), x: data[i].x, y: data[i].y, label: { x: data[i].labelx, y: data[i].labely } }));
                    if(i == data.length-1) resolve(data);
                }
                break;
            case modifyTypeTopo.get:
                for (let i=0; i < data.length; i++){
                    res[i] = await new Promise(resolve => resolve({ _id: data[i].id }));
                    if(i == data.length-1) resolve(res);
                }
                break;
            case modifyTypeTopo.moreInfo:
                for (let i=0; i < data.nodes.length; i++){
                    data.nodes[i].topologyInfo = await new Promise(resolve => resolve( data.nodesTopology[i] ));
                    if(i == data.nodes.length-1) resolve(data.nodes);
                }
                break;
            case modifyTypeTopo.getLinks:
                for (let i=0; i < data.length; i++){
                    res.push(await new Promise(resolve => resolve({ nodeStart: data[i].id })));
                    res.push(await new Promise(resolve => resolve({ nodeEnd: data[i].id })));
                    if(i == data.length-1) resolve(res);
                }
                break;
            case modifyTypeTopo.getAll:

                break;
        }

    })
}

module.exports = router;