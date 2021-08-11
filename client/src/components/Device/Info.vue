<template>
    <div class="container">
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
                <span>Status: </span><span class="value value-stable">{{status}}</span>
                <!-- <q-input outlined v-model="status" label="Status" /> -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
data(){
    let name = 'R1'
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
        status
    }
}
}
</script>

<style lang="scss" scoped>
    @import "@/style/variables";
    .container {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        border-radius: 5px;
        background-color: white;
        height: 90%;
        margin-top: 1em;
        display: grid;
        grid-template-columns: 0.2fr 1fr 0.2fr 4fr 0.2fr;
        grid-template-areas: 
        ". img . info .";

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
            ". vendor . name"
            ". type . username"
            ". status . password";

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
        }
    }
</style>