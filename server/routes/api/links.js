const router = require('express').Router();
const Link = require('../../database/models/Link');
const verify = require('../auth/verifyToken');
// const mongoose = require('mongoose');


const modifyTypeLinks = {
    get: 'get'
}

router.post('/saveLinks', verify, async (req, res) => {
    let data = {};
    Object.keys(req.query).length === 0 ? data = req.body : data = req.query;

    let links = [];
    for (let i=0; i < data.links.length; i++){
        links[i] = new Link({
            nodeStart: data.links[i].nodeStart,
            ifStart: data.links[i].ifStart,
            nodeEnd: data.links[i].nodeEnd,
            ifEnd: data.links[i].ifEnd
        });
    }

    try {
        let savedLinks = [];
        for (let i=0; i < links.length; i++) {
            savedLinks[i] = await links[i].save();
        }
        res.status(200).send({ message: 'Links Saved', data: savedLinks });

    }catch (err) {
        res.json({ message: err});
    }
});


router.post('/getLinks', verify, async (req,res) => {
    let data = {};
    Object.keys(req.query).length === 0 ? data = req.body : data = req.query;
    const params = await modifyDataLinks(data.nodes, modifyTypeLinks.get);
    console.log(params);
    const links = await Link.find({ $or: params });
    console.log(links);
    res.send(links);
})


modifyDataLinks = async (data, type) => {
    return new Promise(async resolve => {
        switch(type){
            case modifyTypeLinks.get:
                let res = [];
                for (let i=0; i < data.length; i++){
                    res.push(await new Promise(resolve => resolve({ nodeStart: data[i].id })));
                    res.push(await new Promise(resolve => resolve({ nodeEnd: data[i].id })));
                    if(i == data.length-1) resolve(res);
                }
                break;
        }

    })
}

module.exports = router;