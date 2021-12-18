const Network = require('./models/Network');
const { getUser } = require('./userData')

const saveNetworks = (username, networks) => {
    return new Promise(async resolve => {
        let res = 0
        let user = await getUser(username)
        networks.map(async network => {
            let net = new Network({
                user: user._id,
                ipNetwork: {
                    name: 'IP Network',
                    value: `${network.networkAddress}/${network.subnetMaskLength}`
                },
                ipAddress: {
                    name: 'IP Address',
                    value: network.networkAddress
                },
                firstAddress:{
                    name: 'First Address',
                    value: network.firstAddress
                },
                lastAddress:{
                    name: 'Last Address',
                    value: network.lastAddress
                },
                broadcastAddress:{
                    name: 'Broadcast Address',
                    value: network.broadcastAddress
                },
                subnetMask: {
                    name: 'Mask',
                    value: network.subnetMask
                },
                subnetMaskLength:{
                    name: 'Mask Length',
                    value: network.subnetMaskLength
                },
                numHosts: {
                    name: 'Number of Hosts',
                    value: network.numHosts
                }
            });
            res = await addNetworkToDB(net)
            if(res.code != 200)
                resolve(res)
        })
        resolve(res)
    })
}

const addNetworkToDB = async (network) =>{
    try {
        let savedNet = await network.save();
        return { code: 200, message: 'Network Saved', data: savedNet };

    }catch (err) {
        return { code: 400, message: err };
    }
}

module.exports.saveNetworks = saveNetworks;
