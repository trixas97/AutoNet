// const { emit } = require('./database/models/Topology');

const userData = require('./database/userData');
let mainIo;
const listeners = (io) => {
    const { updateTopology, newTopology, deleteTopology } = require('./database/topology');
    const { saveNetworks, deleteNetwork } = require('./database/network')
    const {getNodeInfoByID, setNodeStatus, deleteNode} = require('./database/node');
    const {setUserCredentials, setUserDetails, getUserNodes} = require('./database/userData');
    const {sendCommandsNode, saveNodesAction} = require('./routes/api/nodes_save')
    const {getHashPassword} = require('./routes/auth')
    io.on('connection', (socket) => {
        socket.on('initUser', async (data) => {
          console.log(`User ${data} connected with socket ${socket.id}`);
          let msg = {}
          msg.data = await userData.getUserData(data);
          msg.type = 'userData'
          io.to(socket.id).emit(data, msg)
        })

        socket.on('nodes', async (data) => {
            console.log(`Changes NODES from ${data.user}` );
            let msg = {
                nodes: {
                    changedFromUser: false
                },
                type: 'nodes'
            }
            switch(data.method){
                case 'delete':
                    msg.res = await deleteNode(data.id)
            }
            if(data.nodes !== undefined){
                msg.data = data.nodes
            }else{
                msg.data = await getUserNodes(data.user)
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

        socket.on('save-new-nodes', async (data) => {
            let msg = {
                data: data.nodes,
                savedNodes: true,
                type: 'saveNewNodes'
            }
            let result = await saveNodesAction(data)
            io.emit(data.user, msg)
        })

        socket.on('save-config', async (data) => {
            console.log(`Save config for node ${data.node} from ${data.user}` );
            const node = await getNodeInfoByID(data.node)
            const ip = node.interfaces.find(inter => inter.mainIf.value === true).ip_address.value
            const runCommands = await sendCommandsNode({
                ip: ip.includes('/') ? ip.slice(0, -(ip.length - ip.indexOf('/'))) : ip,
                username: node.username.value,
                password: node.password.value
            }, {type: ''})
            if(runCommands.error){
                setNodeStatus(node, false)
            }
        })

        socket.on('save-user_credentials', async (data) => {
            console.log(`Save user credentials from ${data.username}` );
            let userCredentials = {username: data.username}
            if(data.password){
                if(data.password.length > 0){
                    userCredentials.password = await getHashPassword(data.password)
                }
            }
            setUserCredentials(data.user, userCredentials)
        })

        socket.on('save-user_details', async (data) => {
            console.log(`Save user details from ${data.firstname}` );
            setUserDetails(data.user, {email: data.email, firstname: data.firstname, surname: data.surname})
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

const emitSavedNode = (socketId, users,savedNodeResult) => {
    let msg = {
        data: savedNodeResult,
        type: 'saveNewNode'
    }
    users.forEach(element => {
        mainIo.to(socketId).emit(element.username, msg)
    })
}


module.exports.emitTraffic = emitTraffic;
module.exports.emitNode = emitNode;
module.exports.emitNodeInterfaceStatus = emitNodeInterfaceStatus;
module.exports.emitSavedNode = emitSavedNode
module.exports.socketsListeners = listeners
