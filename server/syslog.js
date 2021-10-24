const SyslogServer = require("syslog-server");

const typeMessage = {
    traffic: 'traffic'
}

 
module.exports = function(io) {
    const serverSys = new SyslogServer();
    serverSys.on("message", async (value) => {
        
        if(value.message.includes("AutonetTraffic")){
            value = await modifyMessage(value, typeMessage.traffic)
            console.log(value);
            io.emit("trixas97", value);
        }
    });
    
    serverSys.start();
    return serverSys
}

modifyMessage = async (value, type) => {

    return new Promise(async resolve => {
        switch(type){
            case typeMessage.traffic:
                let msg = value.message.replace(/\s\s+/g, ' ').split("AutonetTraffic: ")[1].split(" ");
                let int = msg[0];
                let bytes = msg[4];
                let packets = msg[1];
                let type = (msg[3].includes('out')) ? 'out' : 'in';
                value.interface = int;
                value.bytes = bytes;
                value.packets = packets;
                value.type = type;
                resolve(value);
                break;
        }


    })

}