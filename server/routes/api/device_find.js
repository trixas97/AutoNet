const express = require('express');
const router = express.Router();
const ipFinder = require('ip');
const {spawn} = require('child_process');
const request = require('request');
const {PythonShell} = require('python-shell');
const ping = require('ping');
// const { resolve } = require('path');


// Get Posts
router.get('/', async (req,res) => {
    let ipnet = (ipFinder.cidrSubnet(req.query.ip).networkAddress + '/' + ipFinder.cidrSubnet(req.query.ip).subnetMaskLength);
    console.log(ipnet);
    let url = "http://localhost:5000/api/devices/ipsfinder?ipnet="+ ipnet;
    let options = {json: true};
    let devices = [];

    request(url, options, async (error, result, body) => {
        if (error) {
            return  console.log(error)
        };

        if (!error && result.statusCode == 200) {
            // do something with JSON, using the 'body' variable
            // res.send(body);
            // console.log(body.length);

            let ips = body;
            // let opa = await test(body[0].ip);
            // console.log(opa);
            // res.send(opa);
            for(let i=0; i < 1; i++){
               ips = await ipsFinder(ips);
            }

            
            
            // let x = new deviceFinder("192.168.15.1",1);
            // let y = new deviceFinder("192.168.15.2",2);
            // deviceFinder("192.168.15.3",3);

            res.send("ok");

            // let count = 0;
            // let hosts = [];
            // let deadHosts = [];
            // ips.forEach(function(host){
            //     ping.sys.probe(host.ip, async function(isAlive){
            //         count++;
            //         if(isAlive){
            //             let aliveHost = await deviceFast(host.ip);
            //             hosts.push(aliveHost);
            //             console.log(aliveHost);
            //         } else {
            //             deadHosts.push(host);
            //         }
        
            //         if(count == ips.length){
            //             console.log("size " + count);
            //             count = 0;
            //         }
            //     });
            // });



            // ips.forEach(element => {
            //     let shell = new PythonShell('server/python/network_devices_fast.py', {mode: 'json', args: [element.ip]});

            //     shell.on('message', function (message) {
            //         k++;
            //         console.log(k + element);
            //         console.log(message);
                    
            //         // res.send(message);
            //     });
            // });
                // let python = spawn('python', ['server/python/network_devices_fast.py', element]);
                // python.stdout.on('data', function(data) {
                //     k++;
                //     let datastr = data.toString();
                //     let datajson = JSON.parse(datastr);
                //     device = datajson;
                //     console.log(device + "  " + k);
                //     // res.send(device);
                // });
                // console.log(element.ip);
            
        };
    });
});

router.get('/ipsfinder', (req,res) => {
    ipnet = req.query.ipnet;
    console.log(ipnet);
    let shell = new PythonShell('server/python/network_ips.py', {mode: 'json', args: [ipnet]});

    shell.on('message', function (message) {
        console.log(message[0].ip);
        res.send(message);
    });

    // let python = spawn('python', ['server/python/network_ips.py', ipnet]);
    // python.stdout.on('data', function(data) {
    //     let datastr = data.toString();
    //     let datajson = JSON.parse(datastr);
    //     ips = datajson;
    //     console.log("tes");
    //     res.send(ips);
    // })
});

router.get('/devicefinder', (req,res) => {
    console.log("test");
    ip = req.query.ip;
    host = req.query.ip;
    let shell = new PythonShell('server/python/network_devices.py', {mode: 'json', args: [host]});
    shell.on('message', function (message) {
        // host.mac = message.mac;
        // host.vendor = message.vendor;
        // console.log(host);
        console.log(message);
    });
    // let python = spawn('python', ['server/python/network_devices.py', ip]);
    // python.stdout.on('data', function(data) {
    //     console.log("test2");
    //     let datastr = data.toString();
    //     let datajson = JSON.parse(datastr);
    //     device = datajson;
    //     res.send(device);
    // });
});


function deviceFast(host) {
    return new Promise(resolve => {
        let shell = new PythonShell('server/python/network_devices_fast.py', {mode: 'json', args: [host]});
        shell.on('message', function (message) {
            resolve(message);
        });
    });
}

function deviceFinder(host) {
    let shell = new PythonShell('server/python/network_devices.py', {mode: 'json', args: [host.ip]});
    shell.on('message', function (message) {
        host.mac = message.mac;
        host.vendor = message.vendor;
        console.log(host);
        // console.log(message);
    });
}


function ipsFinder(ips)  {
    return new Promise(resolve => {
        let count = 0;
        let hosts = [];
        let deadHosts = [];
        ips.forEach(function(host){
            ping.sys.probe(host.ip, async function(isAlive){
                count++;
                if(isAlive){
                    let aliveHost = await deviceFast(host.ip);

                    if(aliveHost.vendor == null){
                        deviceFinder(aliveHost);
                    }else{
                        console.log(aliveHost);
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



module.exports = router;