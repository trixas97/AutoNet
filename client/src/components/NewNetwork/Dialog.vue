<template>
    <q-dialog persistent transition-show="scale" transition-hide="scale">
      <q-layout view="hhh lpR fff"  class="bg-white" style="min-height: 25em; height: 25em">

        <q-header class="bg-primary" style="width: 100%">
          <q-toolbar>
            <label class="info">{{node.ip}}</label>            
          </q-toolbar>
        </q-header>

        <q-page-container class="form">
            <span class="username"><label for="username">Username: </label><input v-model="node.username" class="input-text" type="text"></span>
            <span class="password"><label for="password">Password: </label><input v-model="node.password" class="input-text" type="text"></span>
            <span class="submit">
                <q-btn
                    size="1.2em"
                    class="q-px-xl q-py-xs q-mt-xs"
                    label="Save"
                    v-close-popup
                    :ripple="{ color: 'black' }"
                    push
                    unelevated 
                    no-caps
                />
            </span>
        </q-page-container>

      </q-layout>
    </q-dialog>
</template>

<script>
export default {
  props: {
    node: { }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/quasar.variables.scss";
    .q-toolbar {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

        .info {
            display: block;
            margin: auto;
            font: {
                family: 'arial';
                size: 3em;
                weight: bold;
            }
        }
    }

    .form {
        display: grid;
        grid-template-rows: 1fr 1fr 0.4fr 1fr 0.4fr 1fr;
        grid-template-areas: 
        "."
        "username"
        "."
        "password"
        "."
        "submit";

        label {
            color: $primary;
            font: {
                size: 2em;
                family: "arial";
                weight: bold;
            }
        }

        .username {
            grid-area: username;
            margin: auto;
        }

        .password {
            grid-area: password;
            margin: auto;
        }

        .submit {
            grid-area: submit;
            margin: auto;

            .q-btn {
                width: 11em;
                height: 2.8em;
                border-radius: 4px;
                background-color: $accent;
                border: none;
                color: #FFFFFF;
                transition: all 0.5s;
                padding: 5px;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
                // width: 27%;    
                font: {
                size: 10px;
                family: "arial";
                weight: bold;
                }  
            }
        }

        .input-text {
            height: 1fr;
            width: 9.2em;
            margin: 0px;
            font: {
                family: 'arial';
                size: 2em;
                weight: bold;
            }      
            padding: 5px; 
            border: 1px solid #ccc;
            border-radius: 4px;
            // font-weight: bold;
            color: $accent;
            box-sizing: border-box;
        }
    }


</style>