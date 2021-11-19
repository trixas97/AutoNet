// const { emit } = require('./database/models/Topology');
const userData = require('./database/userData');
let mainIo;
const listeners = (io) => {

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

    })
    mainIo = io;
    return mainIo
}

const emitTraffic = (users, data) => {
    console.log(data);
    let msg = {
        data: data,
        type: 'traffic'
    }
    users.forEach(element => {
        // console.log('emit ' + element.username);
        // console.log(msg);
        mainIo.emit(element.username, msg)
    });
}


module.exports.emitTraffic = emitTraffic;
module.exports.socketsListeners = listeners
