const mongoose = require('mongoose');
class Interface {
    name ='';
    type='';
    state = '';

    constructor(name, type, state){
        this._id = new mongoose.Types.ObjectId();;
        this.name = name;
        this.type = type;
        this.state = state
    }

    getInterface(){
        return { 
            name: this.name,
            type: this.type,
            state: this.state
        }
    }

}
module.exports = Interface;
