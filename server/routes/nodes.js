const router = require('express').Router();
const Node = require('../models/Node');
const mongoose = require('mongoose');
const Interface = require('../models/Objects/Interface.js');

router.post('/newNode', async (req,res) => {
// console.log(Object.keys(req.query).length + " " + req.query[0]);
    for (const key in req.query) {
        console.log(key, req.query[key])
    }
      
    const interfaces = [];
    // for(let i=0; i < 24; i++){
    //     interfaces[i] = new Interface('F0/'+i,'FastEthernet', false);
    // }


    const node = new Node({
        user: '60aa9e031c1d653434fcf352',
        name: 'R1',
        vendor: 'Cisco',
        type: 'Router',
        model: '3070',
        interfaces: interfaces
    });
    try{
        const savedNode = await node.save();
        res.send(savedNode);
    }catch (err){
        res.json({ message: err});
    }
});

module.exports = router;