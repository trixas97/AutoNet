let LeaderLine = require('leader-line-new');
export default class Link {

    linkColors = {
        colorUp: 'lightgreen',
        colorDown: '#ff5252',
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
        this.linkAttrs.startLabel = LeaderLine.captionLabel(this.ifstart, this.linkFonts);
        this.linkAttrs.endLabel = LeaderLine.captionLabel(this.ifend, this.linkFonts);
        this.link = new LeaderLine(start,end,this.linkAttrs);
    }

    setDown = (node) => {
        if(node == this.start)
            this.link["startPlugColor"] = this.linkColors.colorDown;
        else
            this.link["endPlugColor"] = this.linkColors.colorDown;   
    }

    setUp = (node) => {
        if(node == this.start)
            this.link["startPlugColor"] = this.linkColors.colorUp;
        else
            this.link["endPlugColor"] = this.linkColors.colorUp;   
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