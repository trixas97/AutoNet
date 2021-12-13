const Network = require('./models/Network');
const { getUser } = require('./userData')

const saveNetworks = (username, networks) => {
    return new Promise(async resolve => {
        let res = 0
        let user = await getUser(username)
        networks.map(async network => {
            let net = new Network({
                user: user._id,
                ip: {
                    name: 'IP Network',
                    value: network.ip
                },
                mask: {
                    name: 'Mask',
                    value: network.mask
                },
                gateway: {
                    name: 'Default Gateway',
                    value: network.gateway
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
