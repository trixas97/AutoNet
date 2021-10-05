<template>
    <div class="configComp">
        <div class="head">
            <div class="save"><q-btn push color="green" round size="lg" @click="openConsole" icon="save">
                <q-tooltip class="bg-green text-body1" :offset="[10, 10]">
                    Save
                </q-tooltip>
            </q-btn></div>
            <span class="title">{{title}} Configuration</span>
            <div class="close"><q-btn push color="secondary" icon="save_alt" round size="lg" @click="openConfig">
                <q-tooltip class="bg-secondary text-body1" :offset="[10, 10]">
                    Download
                </q-tooltip>
            </q-btn></div>
        </div>
        <q-scroll-area
            :thumb-style="thumbStyle"
            :bar-style="barStyle"
            class="scrollArea"
           
        >
            <prism language="editorconfig">{{ opa }}</prism>
        </q-scroll-area>
    </div>
</template>

<script>
import"prismjs/prism";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-editorconfig"
import Prism from "vue-prism-component";

export default {
    props:{
        title: String
    },
    components:{
        Prism
    },
    setup(){
        let test = "no ip domain lookup\nip domain name trixas\nip cef\nno ipv6 cef\n!\nmultilink bundle-name authenticated\n!\n!\n!\n!\nusername trixas privilege 15 password 7 1311051B130D17\nno ip domain lookup\nip domain name trixas\nip cef\nno ipv6 cef\n!\nmultilink bundle-name authenticated\n!\n!\n!\n!\nusername trixas privilege 15 password 7 1311051B130D17\n no ip domain lookup\nip domain name trixas\nip cef\nno ipv6 cef\n!\nmultilink bundle-name authenticated\n!\n!\n!\n!\nusername trixas privilege 15 password 7 1311051B130D17\nno ip domain lookup\nip domain name trixas\nip cef\nno ipv6 cef\n!\nmultilink bundle-name authenticated\n!\n!\n!\n!\nusername trixas privilege 15 password 7 1311051B130D17\nno ip domain lookup\nip domain name trixas\nip cef\nno ipv6 cef\n!\nmultilink bundle-name authenticated\n!\n!\n!\n!\nusername trixas privilege 15 password 7 1311051B130D17"
        let opa = "Current configuration : 3895 bytes\n!\n! Last configuration change at 19:14:24 UTC Tue Oct 5 2021\n!\nversion 15.2\nservice timestamps debug datetime msec\nservice timestamps log datetime msec\nservice password-encryption\nservice compress-config\n!\nhostname Switch\n!\nboot-start-marker\nboot-end-marker\n!\n!\n!\nusername autonet privilege 15 password 7 11080C11181C0E18\nno aaa new-model\n!\n!\n!\n!\n!\n!\n!\n!\nip domain-name autonet\nip cef\nno ipv6 cef\n!\n!\n!\nspanning-tree mode rapid-pvst\nspanning-tree extend system-id\n!\nvlan internal allocation policy ascending\n!\n! \n!\n!\n!\n!\n!\n!\n!\n!\n!\n!\n!\n!\ninterface GigabitEthernet0/0\n media-type rj45\n negotiation auto\n!\ninterface GigabitEthernet0/1\n switchport access vlan 13\n media-type rj45\n negotiation auto\n!\ninterface GigabitEthernet0/2\n switchport access vlan 13\n media-type rj45\n negotiation auto\n!\ninterface GigabitEthernet0/3\n media-type rj45\n negotiation auto\n!\ninterface GigabitEthernet1/0\n media-type rj45\n negotiation auto\n!\ninterface GigabitEthernet1/1\n media-type rj45\n negotiation auto\n!\ninterface GigabitEthernet1/2\n media-type rj45\n negotiation auto\n!\ninterface GigabitEthernet1/3\n media-type rj45\n negotiation auto\n!\ninterface GigabitEthernet2/0\n media-type rj45\n negotiationauto\n!\ninterface GigabitEthernet2/1\n media-type rj45\n negotiation auto\n!\ninterface GigabitEthernet2/2\n media-type rj45\n negotiation auto\n!\ninterface GigabitEthernet2/3\n media-type rj45\n negotiation auto\n!\ninterface GigabitEthernet3/0\n media-type rj45\n negotiation auto\n!\ninterface GigabitEthernet3/1\n media-type rj45\n negotiation auto\n!\ninterface GigabitEthernet3/2\n media-type rj45\n negotiation auto\n!\ninterface GigabitEthernet3/3\n media-type rj45\n negotiation auto\n!\ninterface Vlan1\n ip address 192.168.78.150 255.255.255.0\n!\ninterface Vlan13\n ip address 13.13.13.254 255.255.255.0\n!\nip forward-protocol nd\n!\nno ip http server\nno ip http secure-server\n!\nip route 0.0.0.0 0.0.0.0 192.168.78.1\nip ssh version 2\n!\n!\n!\n!\n!\ncontrol-plane\n!\nbanner exec ^C\n**************************************************************************\n* IOSv is strictly limited to use for evaluation, demonstration and IOS  *\n* education. IOSv is provided as-is and is not supported by Cisco's      *\n* Technical Advisory Center. Any use or disclosure, in whole or in part, *\n* of the IOSv Software or Documentation to any third party for any       *\n* purposes is expressly prohibited except as otherwise authorized by     *\n* Cisco in writing.                                                      *\n**************************************************************************^C\nbanner incoming ^C\n**************************************************************************\n* IOSv is strictly limited to use for evaluation, demonstration and IOS  *\n* education. IOSv is provided as-is and is not supported by Cisco's      *\n* Technical Advisory Center. Any use or disclosure, in whole or in part, *\n* of the IOSv Software or Documentation to any third party for any       *\n* purposes is expressly prohibited except as otherwise authorized by     *\n* Cisco in writing.                                                      *\n**************************************************************************^C\nbanner login ^C\n**************************************************************************\n* IOSv is strictly limited to use for evaluation, demonstration and IOS  *\n* education. IOSv is provided as-is and is not supported by Cisco's      *\n* Technical Advisory Center. Any use or disclosure, in whole or in part, *\n* of the IOSv Software or Documentation to any third party for any       *\n* purposes is expressly prohibited except as otherwise authorized by     *\n* Cisco in writing.                                                      *\n**************************************************************************^C\n!\nline con 0\nline aux 0\nline vty 0 4\n login local\n transport input ssh\nline vty 5 1500\n login local\n transport input ssh\n!\n!\nend\n"
        return {opa, test};
    }
}
</script>

<style lang="scss" scoped>
@import "@/styles/quasar.variables.scss";
    .configComp{
        display: grid;
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;
        grid-template-areas: 
        "head"
        "."
        "scrollArea";

        .head {
            grid-area: head;
            display: grid;
            grid-auto-columns: 1fr 1fr 3fr 1fr 1fr;
            margin-bottom: 1em;
            grid-template-areas: "save . title . close";
            align-items: center;
            .save{
                grid-area: save;
                justify-self: left;
            }

            .title {
                grid-area: title;
                text-align: center;
                justify-self: center;
                color: $indigo-9;
                font: {
                size: 2em;
                family: Roboto;
                weight: bold
                }
                
            }

            .close {
                grid-area: close;
                justify-self: right;
            }
        }
        .scrollArea{
            grid-area: scrollArea;
            min-height: 65vh; 
            max-width: 100%;
        }
        
    }
</style>