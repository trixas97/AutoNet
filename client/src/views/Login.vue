<template>
 
 <q-page>
    <div class="row" style="height: 100vh">
        <div class="col login-img">
        <q-img
            class="fit background"
            src="@/assets/login/login-background.svg"
        />
        <q-img
            class="img-front"
            src="@/assets/login/server.svg"
        />         
    </div>
    <div class="col login-form">
        <img class="logo-autonet" src="@/assets/logo.svg" alt="">

        <span class="username">
            <span class="icon bg-primary"><i class="fa fa-user fa-2x"></i></span><input v-model="username" class="username-txt" id="age" type="text" placeholder="Username">
        </span>
        <span class="password">
            <span class="icon bg-primary"><i class="fa fa-lock fa-2x"></i></span><input v-model="password" class="password-txt" id="age" type="password" placeholder="Password">
        </span>

        <q-btn
            size="22px"
            class="q-px-xl q-py-xs btn"
            color="secondary"
            label="Login"
            @click="login"
        />
    </div>

    </div> 
    </q-page>
</template>

<script>
// @ is an alias to /src
import store from '../store'
const { loginRequest } = require('../router/api');

export default {
  name: 'Login',
  components: {
  },
  data(){
      const username = '';
      const password = '';
      return{
          username,
          password,

      size: 'md'
      }
  },
  methods:{
      async login(){      
        const data = {
            username: this.username,
            password: this.password   
        }


        const res = await loginRequest(data);

        if(res.status == 200){
            store.dispatch('User/setToken', res.data);
            this.$router.push('Topology');
        }
      }
  }
}
</script>


<style lang="scss" scoped>
   
    .login-img{
            // grid-area: img;
            display: inline-flex;
            background-color: #040b25;

            .background {
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 1), 0 6px 20px 0 rgba(0, 0, 0, 1);
                height: 100%;
                width: 50vw;
                object-fit: cover;
            }  

            .img-front {
                position: absolute;
                display: flex;
                justify-self: center;
                left: 17vw;
                top: 35vh;
                width:15%;
            }
    }

    .login-form {
        grid-area: form;
        display: grid;
        grid-gap: 2em;
        grid-template-rows: 1.6fr 0.2fr 0.4fr 0.2fr 0.2fr 0.1fr 0.6fr 1.6fr;
        grid-template-columns: 1fr 2fr 1fr;
        grid-template-areas: 
        ". . ."
        ". title ."
        ". . ."
        ". username ."
        ". password ."
        ". . . "
        ". btn ."
        ". . .";

        font: {
            family: 'Arial';
            weight: bold;
        }

        img {
            grid-area: title;
            min-width: 100%;
            max-width: 100%;


        }

        .username {
            grid-area: username;     
            display: flex;
            width: 100%;
            box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2), 0px 6px 20px 0 rgba(0, 0, 0, 0.19);



            .username-txt{
                min-height: 3em;
                width: 100%;
                font-size: 1.7em;       
                padding: 5px; 
                border: 1px solid #ccc;
                border-radius: 4px;
                font-weight: bold;
                box-sizing: border-box;
                transition: all 0.25s ease;


            }
        }

        .password {
            grid-area: password;     
            display: flex;
            width: 100%;
            box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2), 0px 6px 20px 0 rgba(0, 0, 0, 0.19);

            .password-txt{
                min-height: 3em;
                width: 100%;
                font-size: 1.7em;       
                padding: 5px; 
                border: 1px solid #ccc;
                border-radius: 4px;
                font-weight: bold;
                box-sizing: border-box;
                transition: all 0.25s ease;


            }
        }
        
        .icon {
                padding: 0.5em;
                min-width: 4em;
                color: white;
                display: flex;
                justify-content: center;
                align-items: center;
                box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2), 0px 6px 20px 0 rgba(0, 0, 0, 0.19);
                border-radius: 4px 0px 0px 4px;

            }

        .btn{
            grid-area: btn;
            font: {
                size: 1.5em;
                weight: bold;
            }
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        }
      
    }

</style>

