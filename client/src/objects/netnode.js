let plainDraggable = require('plain-draggable').default;
export default class NetNode {
    
    // img = "file:///C:/Program%20Files/GNS3/symbols/classic/router.svg";

    constructor(id,node,label,links,ifs){
        this.id = id;
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
        }

    }
    
    //Calculate Label position
    labelPosition = () => {
        this.draglabel.left = this.dragnode.left + this.label.x;
        this.draglabel.top = this.dragnode.top + this.label.y;
        this.draglabel.position(); 
        this.dragnode.position();
    }

    //Recalculate Links positions and Label position when drag the node
    dragLink(links){
        this.dragnode.onDrag = () => {
            this.labelPosition();
            links.forEach(element => {
                element.link.position();
            });
        }
        this.dragnode.onDragEnd = () => {
            this.labelPosition();
            links.forEach(element => {
                element.link.position();
            });
        }
    }

    async setLinkState(data){
        let ifVar = await this.findInterface(data.if);
        console.log(ifVar);
        this.links.forEach(element =>{
            if((element.ifstart.id == this.id && element.ifstart.name == ifVar.interfaceSum) || (element.ifend.id == this.id && element.ifend.name == ifVar.interfaceSum))
                element.setState({operStatus: data.operStatus, adminStatus: data.adminStatus, node:this.node})
        });
    }

    findInterface(name){
        return new Promise(resolve => { 
            this.ifs.forEach(element => {
                if (element.interface == name)
                    resolve(element);
            });
        })
    }



    // get getnode(){
    //     this.node;
    // }


}
    