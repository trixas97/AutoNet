const { hostname } = require('os');
const {PythonShell} = require('python-shell');
const {spawn} = require('child_process');
const ipValid = require('ip');
const Node = require('../../database/models/Node');
const express = require('express');
const router = express.Router();
const {emitSavedNode} = require('../../sockets')
const {getUser} = require('../../database/userData')

function nodesSave(io) {

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
        shell.on('error', function (message) {
            resolve({error: true})
        })
    })
}

const initNode = (host) => {
    return new Promise(resolve => {
        let shell = new PythonShell('server/python/node_init.py', {mode: 'json', args: [host.ip, host.username, host.password, '192.168.78.1']});
        shell.on('message', function (message) {
            resolve(host)
        })
    })
}

const sendCommandsNode= (node, actions) => {
    return new Promise(resolve => {
        let shell = new PythonShell('server/python/node_update.py', {mode: 'json', args: [node.ip, node.username, node.password, actions.type]});
        shell.on('message', function (message) {
            resolve(message)
        })
        shell.on('error', function (message) {
            resolve({error: true})
        })
    })
}

const initTraffic = async (interfaces) => {
    return new Promise(async resolve => { 
        for (let i=0; i < interfaces.length; i++){
            interfaces[i].traffic = await { name: 'Traffic', value: [], editable: false, visible: false };
            if(i == interfaces.length-1) resolve(interfaces)
        }
    })
}

const setInterfacesNetworks = async (interfaces) => {
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

const saveNodesAction = (data) => {
    let hosts = data.nodes;

    for(let i=0; i < hosts.length; i++){
        saveNodes(hosts[i], data.user, data.socketId);
    }
}

const saveNodes = async (host, user, socket) => {
    let node = {};
    node = await initNode(host)
    node = await getNodeInfo(host);
    node.interfaces = await initTraffic(node.interfaces)
    node.interfaces = await setInterfacesNetworks(node.interfaces)
    user = await getUser(user)
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
            let sendNode = {ip: host.ip, messageState: 1}
            emitSavedNode(socket, [user], sendNode)

        }catch (err){
            let sendNode = {ip: host.ip, messageState: 2}
            emitSavedNode(socket, [user], sendNode)
            // res.json({ message: err});
        }
    }else{
        let sendNode = {ip: host.ip, messageState: 2}
        emitSavedNode(socket, [user], sendNode)
    }

    // if(hostLength == 0){
    //     nodes.length != 0 ? res.send(nodes) : res.json({ message: "No found devices"});
    // }
}

module.exports.nodesSave = nodesSave
module.exports.initNode = initNode
module.exports.getNodeInfo = getNodeInfo
module.exports.initTraffic = initTraffic
module.exports.setInterfacesNetworks = setInterfacesNetworks
module.exports.sendCommandsNode = sendCommandsNode
module.exports.saveNodesAction = saveNodesAction
// module.exports = router;