const SyslogServer = require("syslog-server");
const { setTraffic } = require('./database/node');

const typeMessage = {
    traffic: 'traffic'
}

let traffic = []

 
module.exports = function(io) {
    const serverSys = new SyslogServer();
    serverSys.on("message", async (value) => {
        
        if(value.message.includes("AutonetTraffic")){
            if(value.message.includes("Finish")){
                console.log('oeeeeeeeoeoeafajoenoa');
                // console.log(value);
                saveTraffic(value.host)
            }else{
                value = await modifyMessage(value, typeMessage.traffic)
                // console.log(value);
                if(traffic[value.host]){
                    pushTraffic(value)
                }else{
                    traffic[value.host] = []
                    pushTraffic(value)
                    // traffic[value.host].push(value)
                }

                // io.emit("trixas97", value);
            }
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
                // if(type.includes('in')){
                //     value.bytes.in = bytes;
                //     value.packets.in = packets;
                // }else{
                //     value.bytes.out = bytes;
                //     value.packets.out = packets;
                // }
                // if(msg[3].includes('in')){
                //     value.message = {in: value.message}
                //     value.bytes = {in: bytes};
                //     value.packets = {in: packets};
                // }else{
                //     value.message.out = value.message
                //     value.bytes.out = bytes;
                //     value.packets.out = packets;
                // }

                value.bytes = bytes;
                value.packets = packets;
                value.type = type;
                resolve(value);
                break;
        }
    })
}

pushTraffic = async (value) => {
    if(value.type.includes('out')){
        // console.log('TESSTTTTTTTTTTTTTTTTTTTTTTTTTT');
        // console.log(traffic[value.host][traffic[value.host].length-1]);
        traffic[value.host][traffic[value.host].length-1].message.out = value.message
        traffic[value.host][traffic[value.host].length-1].bytes.out = value.bytes
        traffic[value.host][traffic[value.host].length-1].packets.out =value.packets
    }
    else{
        value.message = {in: value.message}
        value.bytes = {in: value.bytes};
        value.packets = {in: value.packets};
        traffic[value.host].push(value)
    }
}

saveTraffic = async (host) => {
   await setTraffic(host, traffic[host])
   delete traffic[host]
}