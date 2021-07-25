const { getTopologies } = require('./database/topology');


const oids = {
    ifs: '1.3.6.1.2.1.2.2.1'
}

const varbinds = {
    name: `${oids.ifs}.2`,
    adminStatus: `${oids.ifs}.7`,
    operStatus: `${oids.ifs}.8`
}

const modifyTypeSNMP = {
    emit: 'emit',
    receive: 'receive',
    sockets: 'sockets'
}



module.exports = function(io) {
    const snmp = require ("net-snmp");


    let callback = async function (error, notification) {
        if ( error ) {
            console.error (error);
        } else {
            let pdu = notification.pdu;
            let info = notification.rinfo;
            let data = await modifyDataSNMP(pdu.varbinds, modifyTypeSNMP.receive, info.address);
            if(Object.keys(data).length > 1){
                console.log(data);
                let topologies = await getTopologies(data.ip);
                let notify = {data: data, topologies: topologies, io: io}
                await  modifyDataSNMP(notify, modifyTypeSNMP.emit, null);             
                
            }
        }

    }

    let options = {
        port: 162,
        disableAuthorization: true,
        accessControlModelType: snmp.AccessControlModelType.None,
        address: null,
        transport: "udp4"
    }

   let receiver = snmp.createReceiver(options,callback);

   return receiver;

}

modifyDataSNMP = async (data, type, ip) => {
    return new Promise(async resolve => { 
        let res = {};
        switch(type){

            case modifyTypeSNMP.receive:
                res.ip = ip;
                for (let i=0; i < data.length; i++){
                    if(data[i].oid.includes(varbinds.adminStatus)) res.adminStatus = await new Promise(resolve => resolve(data[i].value == 1 ? true : false));
                    if(data[i].oid.includes(varbinds.operStatus)) res.operStatus = await new Promise(resolve => resolve(data[i].value == 1 ? true : false));
                    if(data[i].oid.includes(varbinds.name)) res.if = await new Promise(resolve => resolve(Buffer.from(data[i].value, 'hex').toString()));
                    if(i == data.length-1) resolve(res);
                }
                break;

            case modifyTypeSNMP.emit:
                for (let i=0; i < data.topologies.length; i++){
                    console.log(data.topologies[i]._id);
                    await data.io.emit(data.topologies[i]._id, data.data);
                    if(i == data.length-1) resolve();
                }
                break;
        }
    })
}
