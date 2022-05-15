// const { emit } = require('./database/models/Topology');

const userData = require('./database/userData');
let mainIo;
const listeners = (io) => {
    const { updateTopology, newTopology, deleteTopology } = require('./database/topology');
    const { saveNetworks, deleteNetwork } = require('./database/network')
    io.on('connection', (socket) => {
        socket.on('initUser', async (data) => {
          console.log(`User ${data} connected with socket ${socket.id}`);
          let msg = {}
          msg.data = await userData.getUserData(data);
          msg.type = 'userData'
          io.to(socket.id).emit(data, msg)
        })

        socket.on('nodes', (data) => {
            console.log(`Changes NODES from ${data.user}` );
            let msg = {
                nodes: {
                    data: data.nodes,
                    changedFromUser: false
                },
                type: 'nodes'
            }
            io.emit(data.user, msg)
        })

        socket.on('topology', async (data) => {
            console.log(`Changes TOPOLOGY from ${data.user}` );
            let msg = {
                topology: data.topology,
                type: 'topology',
                method: data.method
            }

            switch(data.method){
                case 'new': 
                    msg.res = await newTopology(data.user, data.name, data.nodes)
                    break
                case 'delete':
                    msg.res = await deleteTopology(data.id)
                    break
                case 'update':
                    msg.res = await updateTopology(data.topology)
                    break
            }
            io.emit(data.user, msg)
        })

        socket.on('networks', (data) => {
            console.log(data);
            let msg = data
            switch(data.method){
                case 'new': 
                    // newTopology(data.user, data.name, data.nodes)
                    break
                case 'delete':
                    msg.type = 'network'
                    deleteNetwork(data.network)
                    break
                case 'update':
                    // setNodesTopology(data.topology)
                    break
            }
            io.emit(data.user, msg)
            // saveNetworks(data.user, data.networks)
        })



    })
    mainIo = io;
    return mainIo
}

const emitTraffic = (users, data) => {
    let msg = {
        data: data,
        type: 'traffic'
    }
    users.forEach(element => {
        mainIo.emit(element.username, msg)
    });
}

const emitNodeInterfaceStatus = (users, data) => {
    let msg = {
        data: data,
        type: 'node-interface-status',
    }

    users.forEach(element => {
        mainIo.emit(element.username, msg)
    });
}

const emitNode = (users, node) => {
    let msg = {
        data: node,
        type: 'node'
    }
    users.forEach(element => {
        mainIo.emit(element.username, msg)
    })
}


module.exports.emitTraffic = emitTraffic;
module.exports.emitNode = emitNode;
module.exports.emitNodeInterfaceStatus = emitNodeInterfaceStatus;
module.exports.socketsListeners = listeners
