module.exports = function(io) {
const express = require('express');
const router = express.Router();
const ipValid = require('ip');
const {spawn} = require('child_process');
const {PythonShell} = require('python-shell');
const Node = require('../../models/Node');
let hostLength = 0;


io.on('connection', (socket) => {

    router.post('/', (req,res) => {
        console.log(req.query.id);
        let nodes = [];
        let ips = [];
        for(const key in req.query){
            if(ipValid.isV4Format(req.query[key]))
                ips.push(req.query[key]);                
        }
        hostLength = ips.length;
        for(let i=0; i < ips.length; i++){
                console.log(ips[i]);
                saveNodes(ips[i], res, nodes);
        }     
    });

    saveNodes = async (ip, res, nodes) => {
        console.log(ip);
        let node = {};
        node = await getNodeInfo(ip);
        console.log("node " + node);
        const nodeDb = new Node({
            user: '60aa9e031c1d653434fcf352',
            name: node.name,
            vendor: 'Cisco',
            type: 'Router',
            model: node.model,
            interfaces: node.interfaces
        });

        try{
            const savedNode = await nodeDb.save();
            nodes.push(savedNode);
            hostLength--
            console.log("hostLength " + hostLength);
            if(hostLength == 0){
                res.send(nodes);
                console.log("TELOS");
            }
        }catch (err){
            res.json({ message: err});
        }

    }

    getNodeInfo = (ip) => {
        console.log("Go Python: " + ip);
        return new Promise(resolve => {
            let shell = new PythonShell('server/python/node_save.py', {mode: 'json', args: ip});
            shell.on('message', function (message) {
                resolve(message);
            });
        })
    }   
});

return router;
}

// module.exports = router;