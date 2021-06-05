module.exports = function(io) {
const express = require('express');
const router = express.Router();


io.on('connection', (socket) => {

    router.post('/', async (req,res) => {

        console.log(req.query);

        const interfaces = [];
        for(let i=0; i < 24; i++){
            interfaces[i] = new Interface('F0/'+i,'FastEthernet', false);
        }
    
    
        const node = new Node({
            user: '60aa9e031c1d653434fcf352',
            name: 'R1',
            vendor: 'Cisco',
            type: 'Router',
            model: '3070',
            interfaces: interfaces
        });
        try{
            const savedNode = await node.save();
            res.send(savedNode);
        }catch (err){
            res.json({ message: err});
        }
    });

});

return router;
}