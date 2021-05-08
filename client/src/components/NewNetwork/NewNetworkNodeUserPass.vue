<template>
    <div class="new-net-node-user-pass">
        <span class="device-ip"><label class="device-ip-txt" for="device-ip"> {{node.ip}}</label></span>
        <span class="username"><label for="username">Username: </label><input v-model="node.username" class="textForm" type="text"></span>
        <span class="password"><label for="password">Password: </label><input v-model="node.password" class="textForm" type="text"></span>
        <div class="save-device">
            <input type="button" @click="saveUserDevice" value="Save">
        </div>
    </div>
</template>

<script>
// import { reactive } from 'vue';
export default {
  props: {
    node: { }
  },
  methods:{
    saveUserDevice(){
      this.$emit('finished', false);
    }
  }

}
</script>

<style lang="scss" scoped>
@import "../../style/variables";

    .new-net-node-user-pass {
      grid-area: userpass-form;
      background-color: white;
      color: teal;
      display: grid;
      height: 100%;
      border-radius: 4px;
      font-weight: bold;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      // grid-template-rows: 1fr 2fr 2fr 2fr;
      grid-template-areas: 
      "device-ip"
      "."
      "username"
      "password"
      "save-device";
      
      .device-ip {
        grid-area: device-ip;
        align-items: center;
        font-weight: bold;
        color: white;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        background-color: teal;
        display: flex;
        justify-content: center;

      }
      .username {
        grid-area: username;
      }

      .password {
        grid-area: password;
      }

      .textForm {
        height: 1fr;
        width: 9.2em;
        margin: 0px;
        font-size: 1em;       
        padding: 5px; 
        border: 1px solid #ccc;
        border-radius: 4px;
        // font-weight: bold;
        color: $accent;
        box-sizing: border-box;
      }


      .save-device {
        grid-area: save-device;
        // background-color: lightgreen;
        display: grid;
        // grid-template-columns: 1fr 1fr;
        grid-template-areas: 
        "input";
        
        input {
          // justify-self: end;
          justify-self: center;
          grid-area: input;
          width: 12em;
          height: 3em;
          // margin-top: 1.3em;
          border-radius: 4px;
          background-color: $accent;
          border: none;
          color: #FFFFFF;
          transition: all 0.5s;
          cursor: pointer;
          padding: 5px;
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
          text: {
            align: center;
          }
          font: {
            size: 0.6em;
            weight: bold;
            family: Roboto;
          }
          span {
            cursor: pointer;
            display: inline-block;
            position: relative;
            transition: 0.5s;
          }
          &:disabled {
            background-color: gray;
            cursor: not-allowed;
            &:hover {
              background-color: gray;
            }
          }
          &:hover {
            background-color: #ab154c;
          }
        }
      }

      
      

        // .device-ip-txt {

        // }
      
    }

</style>