let LeaderLine = require('leader-line-new');
export default class Link {

    linkColors = {
        colorUp: 'lightgreen',
        colorDown: '#ff5252',
        colorInter: '#ffa500',
        colorBorder: 'black'
    }

    linkFonts = {
        color: 'black', 
        fontFamily: 'Trebuchet MS', 
        fontSize: '13px'
    }


    linkAttrs = {
        dash: {animation: true},
        // color: this.linkColors.colorDown,
        startPlug: 'square',
        endPlug: 'square',
        startPlugColor: this.linkColors.colorUp,
        endPlugColor: this.linkColors.colorUp,
        path: 'straight',
        outline: true,
        outlineColor: this.linkColors.colorBorder,
        outlineSize: 0.08,
        gradient : {}
    }

    constructor(start,end,ifstart,ifend){
        this.start = start;
        this.end = end;
        this.ifstart = ifstart;
        this.ifend = ifend;
        this.linkAttrs.startLabel = LeaderLine.captionLabel(this.ifstart.name, this.linkFonts);
        this.linkAttrs.endLabel = LeaderLine.captionLabel(this.ifend.name, this.linkFonts);
        this.link = new LeaderLine(start,end,this.linkAttrs);
        ifstart.state ? this.link["startPlugColor"] = this.linkColors.colorUp : this.link["startPlugColor"] = this.linkColors.colorDown;
        ifend.state ? this.link["endPlugColor"] = this.linkColors.colorUp : this.link["endPlugColor"] = this.linkColors.colorDown;
    }

    setDown = (node) => {
        if(node == this.start){
            this.link["startPlugColor"] = this.linkColors.colorDown;
            this.ifstart.state = false
        }else if(node == this.end){
            this.link["endPlugColor"] = this.linkColors.colorDown;  
            this.ifend.state = false 
        }
    }

    setUp = (node) => {
        if(node == this.start){
            this.link["startPlugColor"] = this.linkColors.colorUp;
            this.ifstart.state = true
        }else if(node == this.end){
            this.link["endPlugColor"] = this.linkColors.colorUp;
            this.ifend.state = true
        }
    }

    setInter = (node) => {
        if(node == this.start)
            this.link["startPlugColor"] = this.linkColors.colorInter;
        else if(node == this.end)
            this.link["endPlugColor"] = this.linkColors.colorInter;   
    }

    setState= (data) => {
        if(data.protocol_status && data.link_status)
            this.setUp(data.node);
        else 
            if(!data.link_status)
                this.setDown(data.node);
            else
                this.setInter(data.node);
    }

    set ifStart(ifstart){
        this.ifstart = ifstart;
        this.link.startLabel = LeaderLine.captionLabel(ifstart+"", {color: 'black', fontFamily: 'Trebuchet MS', fontSize: '13px'});
    }

    set ifEnd(ifend){
        this.ifend = ifend;
        this.link.endLabel = LeaderLine.captionLabel(ifend+"", {color: 'black', fontFamily: 'Trebuchet MS', fontSize: '13px'});
    }
    
}