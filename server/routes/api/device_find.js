const express = require('express');
const router = express.Router();
const ipFinder = require('ip');
const {spawn} = require('child_process');


// Get Posts
router.get('/', (req,res) => {
    let ipnet = (ipFinder.cidrSubnet(req.query.ip).networkAddress + '/' + ipFinder.cidrSubnet(req.query.ip).subnetMaskLength);
    let ips = findIps(ipnet);
    console.log(ips);
    res.send(ips + "");
});

findIps = async (test) =>{  
    let python = spawn('python', ['server/python/network_ips.py', test]);
    // collect data from script
    await python.stdout.on('data', function(data, callback) {
        // console.log('Pipe data from python script ...');
            console.log(`Type is : ${ typeof data }`);

            let ipsstr = data.toString();
            // console.log(`Data To String : ${mystr}   Type of ${ typeof mystr }`);
    
            let ipsjson = JSON.parse(ipsstr);
            console.log("tes");
            devices = ipsjson;
            console.log(devices[0].ip);
    
            return new Promise(resolve => {
                resolve(devices[0].ip).then();
            });
    }); 
  }


module.exports = router;