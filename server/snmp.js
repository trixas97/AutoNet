module.exports = function(io) {
    const snmp = require ("net-snmp");

    const oids = {
        ifs: '1.3.6.1.2.1.2.2.1'
    }

    const varbinds = {
        name: `${oids.ifs}.2`,
        adminStatus: `${oids.ifs}.7`,
        operStatus: `${oids.ifs}.8`
    }


    let callback = function (error, notification) {
        
        if ( error ) {
            console.error (error);
        } else {
            let pdu = notification.pdu;
            let info = notification.rinfo;

            console.log(info);
            pdu.varbinds.forEach(element => {
                
                if(element.oid.includes(varbinds.adminStatus))
                    console.log(`${element.oid}: ${element.value}`);

                if(element.oid.includes(varbinds.operStatus))
                    console.log(`${element.oid}: ${element.value}`);

                if(element.oid.includes(varbinds.name))
                    console.log(Buffer.from(element.value, 'hex').toString());

            });
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