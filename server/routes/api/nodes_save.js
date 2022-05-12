const { hostname } = require('os');
const {PythonShell} = require('python-shell');
const {spawn} = require('child_process');

module.exports = function(io) {
const express = require('express');
const router = express.Router();
const ipValid = require('ip');
const Node = require('../../database/models/Node');
let hostLength = 0;


io.on('connection', (socket) => {

    router.post('/', (req,res) => {
        let data = {};
        Object.keys(req.query).length === 0 ? data = req.body : data = req.query;
        let nodes = [];
        let hosts = [];
        let socket = '';
        for(const key in data){
            try{
                socket = data.id;
                if(ipValid.isV4Format(data[key].split(' ')[0]))
                    hosts.push({ip: data[key].split(' ')[0], username: data[key].split(' ')[1], password: data[key].split(' ')[2]});
            }catch(err) {
                res.json({ message: err});
            }                     
        }
        

        hostLength = hosts.length;

        hostLength == 0 ? res.json({ message: 'Bad request'}) : console.log('');
        for(let i=0; i < hosts.length; i++){
            saveNodes(hosts[i], res, nodes, socket);
        }     
    });

    saveNodes = async (host, res, nodes, socket) => {
        let node = {};
        node = await initNode(host)
        node = await getNodeInfo(host);
        node.interfaces = await initTraffic(node.interfaces)
        node.interfaces = await setInterfacesNetworks(node.interfaces)
        if(node != null){
            const nodeDb = new Node({
                user: '60aa9e031c1d653434fcf352',
                username: node.username,
                password: node.password,
                name: node.name,
                vendor: node.vendor,
                type: node.type,
                status: node.status,
                model: node.model,
                upTime: node.upTime,
                runConf: node.runConf,
                startConf: node.startConf,
                route_table: node.route_table,
                arp_table: node.arp_table,
                acl: node.acl,
                cdp: node.cdp,
                stp: node.stp,
                mac: node.mac,
                serial: node.serial,
                interfaces: node.interfaces,
                os: { name: node.os.name, version: node.os.version}
            });

            try{
                const savedNode = await nodeDb.save();
                nodes.push(savedNode);
                hostLength--;
                let sendNode = {ip: host.ip, messageState: 1}
                io.to(socket).emit('save-nodes', sendNode);

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

    initNode = (host) => {
        return new Promise(resolve => {
            let shell = new PythonShell('server/python/node_init.py', {mode: 'json', args: [host.ip, host.username, host.password, '192.168.78.1']});
            shell.on('message', function (message) {
                resolve(host)
            })
        })
    }

    initTraffic = async (interfaces) => {
        return new Promise(async resolve => { 
            for (let i=0; i < interfaces.length; i++){
                interfaces[i].traffic = await { name: 'Traffic', value: [], editable: false, visible: false };
                if(i == interfaces.length-1) resolve(interfaces)
            }
        })
    }

    setInterfacesNetworks = async (interfaces) => {
        return new Promise(async resolve => {
            for(let i=0; i < interfaces.length; i++){
                
                interfaces[i].network = await { 
                    name: 'Network',
                    value: `${interfaces[i].ip_address.value.length>0 ? ipValid.cidr(interfaces[i].ip_address.value) : ""}/${interfaces[i].ip_address.value.split('/')[1]}`,
                    editable: false,
                    visible: true
                }
                if(interfaces[i].ip_address.value.length==0)
                    interfaces[i].network.value = ""
                if(i == interfaces.length-1)
                    resolve(interfaces)
            }
        })
    }
});

return router;
}


const getNodeInfo = (host) => {
    console.log("Go Python: " + host.ip);
    return new Promise(resolve => {
        let shell = new PythonShell('server/python/node_info.py', {mode: 'json', args: [host.ip, host.username, host.password]});
        shell.on('message', function (message) {
            resolve(message);
        });
    })
}
module.exports.getNodeInfo = getNodeInfo
// module.exports = router;