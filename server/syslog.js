const SyslogServer = require("syslog-server");

 
module.exports = function(io) {
    const serverSys = new SyslogServer();
    serverSys.on("message", (value) => {
        console.log(value);
        // console.log(value.date);     // the date/time the message was received
        // console.log(value.host);     // the IP address of the host that sent the message
        // console.log(value.protocol); // the version of the IP protocol ("IPv4" or "IPv6")
        // console.log(value.message);  // the syslog message
        // console.log("  ");
    });
    
    serverSys.start();
    return serverSys
}