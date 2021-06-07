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
        let hosts = [];
        for(const key in req.query){
            if(ipValid.isV4Format(req.query[key]))
                hosts.push({ip: req.query[key], username: req.query[key+'userpass'].split(' ')[0], password: req.query[key+'userpass'].split(' ')[1]});                        
        }

        hostLength = hosts.length;
        for(let i=0; i < hosts.length; i++){
            console.log(hosts[i]);
            saveNodes(hosts[i], res, nodes);
        }     
    });

    saveNodes = async (host, res, nodes) => {
        let node = {};
        node = await getNodeInfo(host);
        const nodeDb = new Node({
            user: '60aa9e031c1d653434fcf352',
            username: host.username,
            password: host.password,
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
            }
        }catch (err){
            res.json({ message: err});
        }
    }

    getNodeInfo = (host) => {
        console.log("Go Python: " + host.ip);
        return new Promise(resolve => {
            let shell = new PythonShell('server/python/node_save.py', {mode: 'json', args: [host.ip, host.username, host.password]});
            shell.on('message', function (message) {
                resolve(message);
            });
        })
    }   
});

return router;
}

// module.exports = router;