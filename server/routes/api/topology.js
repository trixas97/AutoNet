const router = require('express').Router();
const Topology = require('../../models/Topology');
const Node = require('../../models/Node');
const verify = require('../auth/verifyToken');
const mongoose = require('mongoose');

const modifyType = {
    save: 'save',
    get: 'get',
    getAll: 'getAll'
}


router.post('/saveTopology', verify, async (req, res) => {

    let data = {};
    Object.keys(req.query).length === 0 ? data = req.body : data = req.query;
      
    data.nodes = await modifyData(data.nodes, modifyType.save);

    const topology = new Topology({
        user: req.user._id,
        nodes: data.nodes
    })
    

    try{
        const savedTopology = await topology.save();
        res.status(200).send({ message: 'Topoly Saved', data: savedTopology });

    }catch (err){
        res.json({ message: err});
    }
})

router.get('/getTopology', verify, async (req,res) => {

    let data = {};
    Object.keys(req.query).length === 0 ? data = req.body : data = req.query;

    const topology = await Topology.findOne({ _id: data.id });
    const params = await modifyData(topology.nodes, modifyType.get);
    const nodes = await Node.find({ $or: params });
    topology.nodes = nodes;
    res.status(200).send(topology);
})

modifyData = async (data, type) => {
    return new Promise(async resolve => {
        switch(type){
            case modifyType.save:
                for (let i=0; i < data.length; i++){
                    data[i] = await new Promise(resolve => resolve(mongoose.Types.ObjectId(data[i])));
                    if(i == data.length-1) resolve(data);
                }
                break;
            case modifyType.get:
                for (let i=0; i < data.length; i++){
                    data[i] = await new Promise(resolve => resolve({ _id: data[i]}));
                    if(i == data.length-1) resolve(data);
                }
                break;
            case modifyType.getAll:

                break;
        }

    })
}

module.exports = router;