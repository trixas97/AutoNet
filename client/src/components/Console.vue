<template>
      <div id="terminal-container" ref="term"></div>
</template>

<script>
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { ref, onMounted, watch } from 'vue'
import store from '../store';
import { useRoute } from 'vue-router';
const { initConsoleSSHRequest } = require('@/services/api');


export default {
props:{
    node: {type: Object, required: true},
},
setup(props) {
    const term = ref(null);
    let initConFlag = true;
    const route = useRoute();

    var theme = {
        foreground: '#eff0eb',
        background: '#282a36',
        selection: '#97979b33',
        black: '#282a36',
        brightBlack: '#686868',
        red: '#ff5c57',
        brightRed: '#ff5c57',
        green: '#5af78e',
        brightGreen: '#5af78e',
        yellow: '#f3f99d',
        brightYellow: '#f3f99d',
        blue: '#57c7ff',
        brightBlue: '#57c7ff',
        magenta: '#ff6ac1',
        brightMagenta: '#ff6ac1',
        cyan: '#9aedfe',
        brightCyan: '#9aedfe',
        white: '#f1f1f0',
        brightWhite: '#eff0eb'
    };

   async function consoleInit() {
       console.log(props.mainIp);
        const data = {
            socket: store.state.User.socket,
            ip: route.query.ip,
            username: props.node.username.value,
            password: props.node.password.value,
            port: 22
        }
            
        const res = await initConsoleSSHRequest(data);
        return res;
    }
    onMounted(() => {
        const terminal = new Terminal({ fontFamily: '"Fira Code"',
            fontWeight: 'bold',
            theme: theme,
            cursorBlink: true });        
        const fitAddon = new FitAddon();
        terminal.loadAddon(fitAddon);
        terminal.open(term.value);
        fitAddon.fit();

        watch(() => store.getters['Socket/getSocketReady'], (data) => {
            if(data && initConFlag){
                console.log(consoleInit());
            }
        })

        watch(() => store.getters['Socket/getConsoleDataListen'], (data) => {
            if(data != null){
                terminal.write(data);
                store.dispatch('Socket/setConsoleDataListen', null);
            }
            
        })
        consoleInit()
        terminal.onKey(function (ev) {
            store.dispatch('Socket/setConsoleDataEmit', ev);            
        });
        
    });
    
    return {
        term
    }
},
methods:{
 
}

}
</script>

<style lang="scss" scoped>

    #terminal-container {
        width: 100%;
        height: 100%;
        margin: 0px;
        padding-top: 2%;
        padding-left: 3.6%;
        
        
      }
      #terminal-container .terminal {
        background-color: #111;
        color: #fafafa;
        padding: 2px;
        margin: 0px;    
        
      }
      #terminal-container .terminal:focus .terminal-cursor {
        background-color: #fafafa;
        
      }
</style>

<style>

    /* XTERM CSS style  */

    .xterm {
        position: relative;
        user-select: none;
        -ms-user-select: none;
        -webkit-user-select: none;
    }

    .xterm.focus,
    .xterm:focus {
        outline: none;
    }

    .xterm .xterm-helpers {
        position: absolute;
        top: 0;
        z-index: 5;
    }

    .xterm .xterm-helper-textarea {
        padding: 0;
        border: 0;
        margin: 0;
        /* Move textarea out of the screen to the far left, so that the cursor is not visible */
        position: absolute;
        opacity: 0;
        left: -9999em;
        top: 0;
        width: 0;
        height: 0;
        z-index: -5;
        /** Prevent wrapping so the IME appears against the textarea at the correct position */
        white-space: nowrap;
        overflow: hidden;
        resize: none;
    }

    .xterm .composition-view {
        /* TODO: Composition position got messed up somewhere */
        background: #000;
        color: #FFF;
        display: none;
        position: absolute;
        white-space: nowrap;
        z-index: 1;
    }

    .xterm .composition-view.active {
        display: block;
    }

    .xterm .xterm-viewport {
        /* On OS X this is required in order for the scroll bar to appear fully opaque */
        background-color: #000;
        overflow-y: scroll;
        cursor: default;
        position: absolute;
        right: 0;
        left: 0;
        top: 0;
        bottom: 0;
    }

    .xterm .xterm-screen {
        position: relative;
    }

    .xterm .xterm-screen canvas {
        position: absolute;
        left: 0;
        top: 0;
        
    }

    .xterm .xterm-scroll-area {
        visibility: hidden;
    }

    .xterm-char-measure-element {
        display: inline-block;
        visibility: hidden;
        position: absolute;
        top: 0;
        left: -9999em;
        line-height: normal;
    }

    .xterm {
        cursor: text;
    }

    .xterm.enable-mouse-events {
        /* When mouse events are enabled (eg. tmux), revert to the standard pointer cursor */
        cursor: default;
    }

    .xterm.xterm-cursor-pointer {
        cursor: pointer;
    }

    .xterm.column-select.focus {
        /* Column selection mode */
        cursor: crosshair;
    }

    .xterm .xterm-accessibility,
    .xterm .xterm-message {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        z-index: 10;
        color: transparent;
    }

    .xterm .live-region {
        position: absolute;
        left: -9999px;
        width: 1px;
        height: 1px;
        overflow: hidden;
    }

    .xterm-dim {
        opacity: 0.5;
    }

    .xterm-underline {
        text-decoration: underline;
    }

    .xterm-strikethrough {
        text-decoration: line-through;
    }

</style>