const Server = require('./models/Server')

const getServerInfo = async () => {
    let server = await Server.findOne()
    return server
}

const addServerInfo = async (ip, port) => {

    const server = new Server({
        address: {
            ip: ip,
            port: port
        },
        timestamp: Date.now()
    });

    try{
        const savedServer = await server.save();
        return savedServer
    }catch (err){
        return {error: err}
    }
}

const updateServerInfo = async (server) => {
    try{
        const savedServer = await Server.updateOne({},{ timestamp: Date.now() });
    }catch (err){
        console.log(err);
    }
}

module.exports.getServerInfo = getServerInfo;
module.exports.addServerInfo = addServerInfo;
module.exports.updateServerInfo = updateServerInfo;