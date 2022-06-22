module.exports = function(io) {
const express = require('express');
const router = express.Router();
const ipFinder = require('ip');
const {spawn} = require('child_process');
const {PythonShell} = require('python-shell');
const ping = require('ping');
let completeScan = []
const { saveNetworks } = require('../../database/network')


io.on('connection', (socket) => {
    console.log("Made socket connection", socket.id);
    socket.on("disconnect", (reason) => {
        const disSocket = {
            socket: socket.id,
            event: 'Disconnect',
            reason: reason
        }
        console.log(disSocket)
    });
    // Find devices
    router.get('/', async (req,res) => {

        let ipnet = (ipFinder.cidrSubnet(req.query.ip).networkAddress + '/' + ipFinder.cidrSubnet(req.query.ip).subnetMaskLength);
        io.to(req.query.id).emit('net-length', ipFinder.cidrSubnet(ipnet).numHosts);
        saveNetworks(req.query.user, [ipFinder.cidrSubnet(req.query.ip)])
        let ips = await ipsFinder(ipnet);
        let finishedLoop = false;
        completeScan[req.query.id] = {
            valued: 0,
            valueListener: function(val) {},
            set value(val) {
              this.valued = val;
              this.valueListener(val);
            },
            get value() {
              return this.valued;
            },
            registerListener: function(listener) {
              this.valueListener = listener;
            }
        }

        completeScan[req.query.id].value = 0;
        completeScan[req.query.id].registerListener(function(val) {
            if((finishedLoop == true) && (val == 0)){
                res.send("ok");
                delete completeScan[req.query.id];
            }
        });

        for(let i=0; i < 2; i++){
            ips = await hostsFinder(ips,req.query.id,completeScan[req.query.id]);
        }
        finishedLoop = true;

        if(completeScan[req.query.id].value == 0){
            res.send("ok");
            delete completeScan[req.query.id];
        }
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

    function deviceFinderSlow(host, socketid, completeScan) {
        let python = spawn('python', ['server/python/network_devices.py', host.ip]);
        python.stdout.on('data', function(data) {
            completeScan.value--;
            let datastr = data.toString();
            let datajson = JSON.parse(datastr);
            host.vendor = datajson.vendor;
            host.mac = undefined

            if(host.vendor == "Cisco"){                                                   // Check vendor for Cisco devices
                console.log(host);                                                        // Return Device from Slow script
                io.to(socketid).emit('net-scan', host);
            }
        });
    }


    function hostsFinder(ips, socketid, completeScan)  {
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
                            completeScan.value++;
                            deviceFinderSlow(aliveHost, socketid, completeScan);           // Call Function => Return Device from Slow script
                        }else{
                            if(aliveHost.vendor == "Cisco Systems"){                       // Check vendor for Cisco devices
                                aliveHost.vendor = "Cisco"                                
                            }
                        }
                        io.to(socketid).emit('net-scan', aliveHost);
                        hosts.push(aliveHost);  
                    } else {
                        deadHosts.push(host);
                    }
                    if(count == ips.length){
                        resolve(deadHosts);
                    }
                });
            });
        });
    }

});

return router;
}