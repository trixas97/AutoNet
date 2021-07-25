module.exports = function(io) {
const express = require('express');
const router = express.Router();
const ipValid = require('ip');
const {spawn} = require('child_process');
const {PythonShell} = require('python-shell');
const Node = require('../../database/models/Node');
let hostLength = 0;


io.on('connection', (socket) => {

    router.post('/', (req,res) => {
        console.log(req.body);
        console.log(req.body.id);
        let nodes = [];
        let hosts = [];
        let socket = '';
        for(const key in req.body){
            try{
                socket = req.body.id;
                console.log(key + ": " + req.body[key]);
                if(ipValid.isV4Format(req.body[key].split(' ')[0]))
                    hosts.push({ip: req.body[key].split(' ')[0], username: req.body[key].split(' ')[1], password: req.body[key].split(' ')[2]});
            }catch(err) {
                res.json({ message: err});
            }                     
        }
        

        hostLength = hosts.length;

        hostLength == 0 ? res.json({ message: 'Bad request'}) : console.log('');
        for(let i=0; i < hosts.length; i++){
            console.log(hosts[i]);
            saveNodes(hosts[i], res, nodes, socket);
        }     
    });

    saveNodes = async (host, res, nodes, socket) => {
        let node = {};
        node = await getNodeInfo(host);
        if(node != null){
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
                hostLength--;
                let sendNode = {ip: host.ip, messageState: 1}
                io.to(socket).emit('save-nodes', sendNode);
                console.log("hostLength " + hostLength);

            }catch (err){
                let sendNode = {ip: host.ip, messageState: 2}
                io.to(socket).emit('save-nodes', sendNode);
                res.json({ message: err});
            }
        }else{
            let sendNode = {ip: host.ip, messageState: 2}
            io.to(socket).emit('save-nodes', sendNode);
            hostLength--
        }

        if(hostLength == 0){
            nodes.length != 0 ? res.send(nodes) : res.json({ message: "No found devices"});
        }
    }

    getNodeInfo = (host) => {
        console.log("Go Python: " + host.ip);
        return new Promise(resolve => {
            let shell = new PythonShell('server/python/node_save.py', {mode: 'json', args: [host.ip, host.username, host.password]});
            shell.on('message', function (message) {
                console.log(message);
                resolve(message);
            });
        })
    }   
});

return router;
}

// module.exports = router;