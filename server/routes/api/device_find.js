module.exports = function(io) {
const express = require('express');
const router = express.Router();
const ipFinder = require('ip');
const {spawn} = require('child_process');
const {PythonShell} = require('python-shell');
const ping = require('ping');


io.on('connection', (socket) => {
    console.log("Made socket connection", socket.id);

    // Find devices
    router.get('/', async (req,res) => {
        let ipnet = (ipFinder.cidrSubnet(req.query.ip).networkAddress + '/' + ipFinder.cidrSubnet(req.query.ip).subnetMaskLength);
        let ips = await ipsFinder(ipnet);
        for(let i=0; i < 2; i++){
            ips = await hostsFinder(ips,req.query.id);
        }
        res.send("ok");
    });



    function ipsFinder(ipnet) {
        return new Promise(resolve => {
            let shell = new PythonShell('server/python/network_ips.py', {mode: 'json', args: [ipnet]});
            shell.on('message', function (message) {
                console.log(message[0].ip);
                resolve(message);
            });
        });
    }

    function deviceFinderFast(host) {
        return new Promise(resolve => {
            let shell = new PythonShell('server/python/network_devices_fast.py', {mode: 'json', args: [host]});
            shell.on('message', function (message) {
                resolve(message);
            });
        });
    }

    function deviceFinderSlow(host, socketid) {
        let python = spawn('python', ['server/python/network_devices.py', host.ip]);
        python.stdout.on('data', function(data) {
            let datastr = data.toString();
            let datajson = JSON.parse(datastr);
            host.vendor = datajson.vendor;

            if(host.vendor == "Cisco"){                                                   // Check vendor for Cisco devices
                console.log(host);                                                        // Return Device from Slow script
                io.to(socketid).emit('net-scan', host);
            }
        });
    }


    function hostsFinder(ips, socketid)  {
        return new Promise(resolve => {
            let count = 0;
            let hosts = [];
            let deadHosts = [];
            ips.forEach(function(host){
                ping.sys.probe(host.ip, async function(isAlive){
                    count++;
                    if(isAlive){
                        let aliveHost = await deviceFinderFast(host.ip);
                        if(aliveHost.vendor == null){
                        deviceFinderSlow(aliveHost, socketid);                          // Call Function => Return Device from Slow script
                        }else{
                            if(aliveHost.vendor == "Cisco Systems"){                       // Check vendor for Cisco devices
                                console.log(aliveHost);                                    // Return Device from Fast script
                                io.to(socketid).emit('net-scan', aliveHost);
                            }
                        }
                        hosts.push(aliveHost);  
                    } else {
                        deadHosts.push(host);
                    }
                    if(count == ips.length){
                        console.log("size " + count);
                        resolve(deadHosts);
                    }
                });
            });
        });
    }

});

return router;
}