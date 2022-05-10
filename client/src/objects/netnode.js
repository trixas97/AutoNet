let plainDraggable = require('plain-draggable').default;
let store = require('@/store')
export default class NetNode {
    
    // img = "file:///C:/Program%20Files/GNS3/symbols/classic/router.svg";

    constructor(id,topoId,node,label,links,ifs){
        this.id = id;
        this.topoId = topoId
        this.ifs = ifs;
        this.node = node;
        this.links = links;
        this.label = {element: label.name, x: label.x, y: label.y};
        this.draglabel = new plainDraggable(this.label.element);
        this.dragnode = new plainDraggable(node);
        this.draglabel.onDragEnd = () =>{    
            this.label.y = this.draglabel.top - this.dragnode.top;
            this.label.x = this.draglabel.left - this.dragnode.left
        }

        this.dragnode.onDrag = () => {
            this.labelPosition();
        }
        this.dragnode.onDragEnd = () => {
            this.labelPosition();
            store.default.dispatch('UserData/updateTopology', {id: this.topoId, node: {id: this.id, x: this.dragnode.left, y: this.dragnode.top}, changedFromUser: true});
        }

    }
    
    //Calculate Label position
    labelPosition = () => {
        this.draglabel.left = this.dragnode.left + this.label.x;
        this.draglabel.top = this.dragnode.top + this.label.y;
        this.draglabel.position(); 
        this.dragnode.position();
    }


    updateAllPositions = (x,y) => {
        this.dragnode.left = x
        this.dragnode.top = y
        this.dragnode.position();
        this.labelPosition()
        this.links.forEach(element => {
            element.link.position();
        });
    }



    //Recalculate Links positions and Label position when drag the node
    dragLink(){
        this.dragnode.onDrag = () => {
            this.labelPosition();
            this.links.forEach(element => {
                element.link.position();
            });
        }
        this.dragnode.onDragEnd = () => {
            this.labelPosition();
            store.default.dispatch('UserData/updateTopology', {id: this.topoId, node: {id: this.id, x: this.dragnode.left, y: this.dragnode.top}, changedFromUser: true});
            this.links.forEach(element => {
                element.link.position();
            });
        }
    }

    async setLinkState(data){
        let ifVar = await this.findInterface(data.if);
        this.links.forEach(element =>{
            if((element.ifstart.id == this.id && element.ifstart.name == ifVar.interface_short.value) || (element.ifend.id == this.id && element.ifend.name == ifVar.interface_short.value))
                element.setState({link_status: data.link_status, protocol_status: data.protocol_status, node:this.node})
        });
    }

    findInterface(name){
        return new Promise(resolve => { 
            this.ifs.forEach(element => {
                if (element.interface.value === name)
                    resolve(element);
            });
        })
    }



    // get getnode(){
    //     this.node;
    // }


}
    