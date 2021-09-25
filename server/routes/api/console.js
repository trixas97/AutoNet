module.exports = function (io){
    const express = require('express');
    const router = express.Router();
    let streams = [];
    const SSHClient = require('ssh2').Client;
    io.on('connection', (socket) => {
        router.get('/', async (req,res) => {
            let data = {};
            Object.keys(req.query).length === 0 ? data = req.body : data = req.query;
            let sshCon = new SSHClient();
            console.log('TRIXAKIS test');
            sshConnection(sshCon, data, res);
        });

        socket.on('consoleData', (data) => {
            streams[data.socket].write(data.key);
        })

        function sshConnection(sshCon, req, res){

            sshCon.on('ready', function(){
                io.to(req.socket).emit('consoleData', '\r\n*** SSH CONNECTION ESTABLISHED ***\r\n');
                sshCon.shell(function(err, stream){
                    if (err){
                        res.status(400).send(err.message);
                        return io.to(req.socket).emit('consoleData', '\r\n SHH SHELL ERROR: ' + err.message + '***\r\n');
                    }else{
                        res.status(200).send('SSH CONNECTION ESTABLISHED');
                    }
                    streams[req.socket] = stream;
                    stream.on('data', function(d){
                        io.to(req.socket).emit('consoleData', d.toString('binary'))
                    }).on('close', function(){
                        sshCon.end();
                    });
                });
            }).on('close', function(){
                io.to(req.socket).emit('consoleData', '\r\n*** SSH CONNECTION CLOSED *** \r\n');
            }).on('error', function(err){
                io.to(req.socket).emit('consoleData', '\r\n*** SSH CONNECTION ERROR: ' + err.message + ' *** \r\n');
            }).connect({
                type: 'password',
                host: req.ip,
                port: req.port,
                username: req.username,
                password: req.password,
                algorithms: {
                    kex: [
                        "diffie-hellman-group1-sha1",
                        "ecdh-sha2-nistp256",
                        "ecdh-sha2-nistp384",
                        "ecdh-sha2-nistp521",
                        // "diffie-hellman-group-exchange-sha256",
                        // "diffie-hellman-group14-sha1"
                    ],
                    cipher: [
                        "3des-cbc",
                        "aes128-ctr",
                        "aes192-ctr",
                        "aes256-ctr",
                        "aes128-gcm",
                        "aes128-gcm@openssh.com",
                        "aes256-gcm",
                        "aes256-gcm@openssh.com"
                    ],
                    serverHostKey: [
                        "ssh-rsa",
                        "ecdsa-sha2-nistp256",
                        "ecdsa-sha2-nistp384",
                        "ecdsa-sha2-nistp521"
                    ],
                    hmac: [
                        "hmac-sha2-256",
                        "hmac-sha2-512",
                        "hmac-sha1"
                    ]
                }
            })
        }
    });
    return router;
}