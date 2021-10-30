<template>
    <div class="container">
        <q-toolbar class="text-white bar">
            <q-toolbar-title>
                Device Info
            </q-toolbar-title>
        </q-toolbar>
        <div class="img">
            <q-img
                src="@/assets/vendors/cisco.svg"
            />
        </div>
        <div class="info">
            <div class="name">
                <span>Name: </span><span class="value">{{name}}</span>
                <q-popup-edit v-model="name" class="bg-accent text-white" auto-save v-slot="scope">
                    <q-input dark color="white" :input-style="{ 'font-weight': 'bold', 'font-family': 'arial', color: 'white' }" class="text-white" v-model="scope.value" dense autofocus counter @keyup.enter="scope.set">
                        <template v-slot:append color="accent" >
                        <q-icon name="edit" color="white" />
                        </template>
                    </q-input>
                </q-popup-edit>
            </div>
            <div class="username">
                <span>Username: </span><span class="value">{{username}}</span>
                <q-popup-edit v-model="username" class="bg-accent text-white" auto-save v-slot="scope">
                    <q-input dark color="white" :input-style="{ 'font-weight': 'bold', 'font-family': 'arial', color: 'white' }" class="text-white" v-model="scope.value" dense autofocus counter @keyup.enter="scope.set">
                        <template v-slot:append color="accent" >
                        <q-icon name="edit" color="white" />
                        </template>
                    </q-input>
                </q-popup-edit>
                <!-- <q-input outlined v-model="username" label="Username" /> -->
            </div>
            <div class="vendor">
                <span>Vendor: </span><span class="value value-stable">{{vendor}}</span>
                <!-- <q-input outlined v-model="vendor" label="Vendor" /> -->
            </div>
            <div class="password">
                <span>Password: </span><span class="value">{{password}}</span>
                <q-popup-edit v-model="password" class="bg-accent text-white" auto-save v-slot="scope">
                    <q-input dark color="white" :input-style="{ 'font-weight': 'bold', 'font-family': 'arial', color: 'white' }" class="text-white" v-model="scope.value" dense autofocus counter @keyup.enter="scope.set">
                        <template v-slot:append color="accent" >
                        <q-icon name="edit" color="white" />
                        </template>
                    </q-input>
                </q-popup-edit>
                <!-- <q-input outlined v-model="password" label="Password" /> -->
            </div>
            <div class="type">
                <span>Type: </span><span class="value value-stable">{{type}}</span>
                <!-- <q-input outlined v-model="type" label="Type" /> -->
            </div>
            <div class="status">
                <span>Status: </span><span class="value value-stable" style="color: #00b336">{{status}} <q-icon name="circle"/></span><!-- stop -->
                
                <!-- <q-input outlined v-model="status" label="Status" /> -->
            </div>
            <div class="btns">
            <div class="informations"><q-btn push color="warning" icon="content_paste" round size="lg" @click="openInfo">
                <q-tooltip class="bg-warning text-body1" :offset="[10, 10]">
                    Informations
                </q-tooltip>
            </q-btn></div>
            <div class="console"><q-btn push color="dark" round size="lg" @click="openConsole">
                <img src="@/assets/console.svg" class="filter-green">
                <q-tooltip class="bg-dark text-body1" :offset="[10, 10]">
                    Console
                </q-tooltip>
            </q-btn></div>
            <div class="config"><q-btn push color="secondary" icon="description" round size="lg" @click="openConfig">
                <q-tooltip class="bg-secondary text-body1" :offset="[10, 10]">
                    Configurations
                </q-tooltip>
            </q-btn></div>
            </div>
            <!-- <div class="addresses">
                <q-btn
                    size="1em"
                    class="q-px-xl q-py-xs q-mt-xs"
                    color="positive"
                    label="Addresses"
                    :ripple="{ color: 'black' }"
                    push
                    unelevated 
                    no-caps
                />
            </div> -->
        </div>
        <!-- <DialogConsole v-model="console"/> -->
    </div>
</template>

<script>

export default {
// conponents:{
//     DialogConsole
// },
data(){
    let name = 'R2'
    let username = 'trixas'
    let password = 'trixas'
    let vendor = 'Cisco'
    let type = 'Router'
    let status = 'Active'
    return {
        name,
        username,
        password,
        vendor,
        type,
        status,
        // console: ref(true)
    }
},
methods:{
    openConsole(){
        this.$emit('console', true);
    },
    openConfig(){
        this.$emit('config', true);
    },
    openInfo(){
        this.$emit('info', true);
    }
}
}
</script>

<style lang="scss" scoped>
    @import "@/style/variables";
    .container {
        margin-top: 1em;
        display: grid;
        grid-template-columns: 0.2fr 1fr 0.2fr 4fr 0.2fr;
        grid-template-rows: 0.3fr 1fr;
        grid-template-areas: 
        "bar bar bar bar bar"
        ". img . info .";

        .bar {
            grid-area: bar;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
            background-color: #023047;
            .q-toolbar__title{
                font: {
                    weight: bold;
                    size: 2em;
                    family: 'Roboto';
                }
                
            }
        }
        .img {
            grid-area: img;
            display: grid;
            justify-items: center;
            .q-img{
                margin: auto
            }
        }

        .info {
            // background: green;
            grid-area: info;
            display: grid;
            grid-template-columns: 0.1fr 1fr 0.1fr 1fr;
            grid-template-areas: 
            ". . . ."
            ". vendor . name"
            ". type . username"
            ". status . password"
            ". . . ."
            ". btns btns btns"
            ". . . .";

            .q-input {
                font: {
                    size:1em;
                    weight: bold;
                } 
            }

            font: {
                size:1.5em;
                family: "arial"
            } 
            .value {
                font-weight: bold;
                color: $accent;
            }

            .value-stable {
                color: $primary;
            }

            .name {
                grid-area: name;
                display: block;
                padding: 0px;
                margin: auto;
                // background: aqua;

                
            }
            
            .username {
                grid-area: username;
                // background: red;
                margin: auto;
            }
            .vendor {
                grid-area: vendor;
                margin: auto;
                // background: greenyellow;
            }
            
            .password {
                grid-area: password;
                margin: auto;
                // background: orange;
            }

            .type {
                grid-area: type;
                margin: auto;
                // background: purple;
            }
            
            .status {
                grid-area: status;
                margin: auto;
                // background: teal;
            }

            .btns {

                grid-area: btns;
                display: grid;
                // background-color: aqua;
                grid-template-columns: 1fr 1fr 0.2fr 1fr 0.2fr 1fr 0.5fr;
                grid-template-areas: ". addresses . console . config .";

                .informations {
                    grid-area: addresses;
                //     margin: auto;

                //     .q-btn {
                //   margin: auto;
                //   width: 10em;
                //   height: 2.8em;
                //   border-radius: 4px;
                //   border: none;
                //   color: #FFFFFF;
                //   box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);  
                //   font: {
                //     size: 10px;
                //     family: "arial";
                //     weight: bold;
                //   }  
                // }

                }

                .console {
                    grid-area: console;

                    .filter-green{
                        width: 1.8em;
                        filter: invert(100%) sepia(8%) saturate(0%) hue-rotate(134deg) brightness(107%) contrast(109%);
                    }

                }

                .config {
                    grid-area: config;
                }

            }
        }
    }
</style>