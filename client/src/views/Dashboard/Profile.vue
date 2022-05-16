<template>
  <div class="profile-container">
    <div class="profile-box">
      <div class="head">
        <div class="title"><q-icon name="account_circle" />Profile</div>
      </div>
      <div class="body">
          <div class="profileForm">
            <div class="text-h4">User Credentials</div>
            <q-input class="profileTextField profileUsernameTextfield" standout="bg-teal text-white" v-model="username" label="Username" :rules="[ val => checkUsernameValidation(val) || 'Username can not be empty']">
              <template v-slot:prepend>
              <i class="fa fa-user fa-1x"></i>
              </template>
            </q-input>
            <q-input class="profileTextField profilePasswordTextfield" :disable="!isEnabledChangePassword" standout="bg-accent text-white" v-model="password" label="Password" :rules="[ val => checkPasswordValidation(val) || 'Password must be minimum 3 characters']" :type="isPwd ? 'password' : 'text'">
              <template v-slot:prepend>
              <i class="fa fa-lock fa-1x"></i>
              </template>
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <q-checkbox v-model="isEnabledChangePassword" label="Change your password?" color="teal" />
            <div class="saveButtonConatiner">
              <q-btn color="positive" push  @click="showNotif('User Credentials', 'credentials')">
                <div class="row items-center no-wrap">
                  <q-icon left name="save" />
                  <div class="text-center">
                    Save
                  </div>
                </div>
              </q-btn>
            </div>
          </div>

          <div class="profileForm">
            <div class="text-h4">User Details</div>
            <q-input class="profileTextField profileDetailsTextfield" standout="bg-secondary text-white" v-model="firstname" label="Name">
            </q-input>
            <q-input class="profileTextField profileDetailsTextfield" standout="bg-secondary text-white" v-model="surname" label="Surname">
            </q-input>
            <q-input class="profileTextField profileDetailsTextfield" standout="bg-secondary text-white" v-model="email" label="Email" type="email" :rules="[ val => checkEmailValidation(val)  || 'Please input a valid email']">
            </q-input>

            <div class="saveButtonConatiner">
              <q-btn color="positive" push @click="showNotif('User Details', 'details')">
                <div class="row items-center no-wrap">
                  <q-icon left name="save" />
                  <div class="text-center">
                    Save
                  </div>
                </div>
              </q-btn>
            </div>
            
          </div>

      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
// import store from '@/store';

export default {
    name: 'Profile',
    setup(){
        const username = ref('autonet')
        const password = ref('autonet')
        const firstname = ref('mixas')
        const surname = ref('trixas')
        const email = ref('trixasmixas@gmail.com')
        const isEnabledChangePassword = ref(false)
        const isPwd =  ref(true)
        const $q = useQuasar()
        let isEmailValid = true
        let isUsernameValid = true
        let isPasswordValid = true
        const emailRegex =  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/

        const showNotif = (title, type) => {
          let message = ''
          if(type === 'credentials'){
            isUsernameValid && (!isEnabledChangePassword.value || (isEnabledChangePassword.value && isPasswordValid)) ? message = title : message = 'error'
          }else{
            isEmailValid ? message = title : message = 'error'
          }
          $q.notify({
            color: message !== 'error' ?'positive' : 'negative',
            message: message !== 'error' ? `${message} have been saved` : `The ${title} fields have errors`,
            position: 'bottom',
            timeout: Math.random() * 5000 + 3000
          })
        }

        const checkEmailValidation = (value) => {
            isEmailValid = emailRegex.test(value)
            return isEmailValid
        }

        
        const checkUsernameValidation = (value) => {
            isUsernameValid = value.length > 0
            return isUsernameValid
        }

        const checkPasswordValidation = (value) => {
            isPasswordValid = value.length >= 3 
            return isPasswordValid
        }
      return {
        username, 
        password, 
        firstname, 
        surname, 
        email, 
        showNotif, 
        isEnabledChangePassword,
        isPwd, 
        checkEmailValidation,
        checkUsernameValidation,
        checkPasswordValidation
      }
    }
}
</script>

<style lang="scss" scoped>
.profile-container{
    width: 100%;
    height: 100%;
    min-width: 100%;
    max-width: 100%;
    display: block;
    padding-top: 2em;

    .profile-box {
      box-shadow: 0 1px 15px 1px rgba(39, 39, 39, 0.1);
      border-radius: 5px;
      background-color: white;
      width: 92%;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 5%;
      display: block;


        .head {
          display: flex;
          align-items: center;
          padding-left: 1%;
          padding-top: 1%;
          justify-content: space-between;
          .title{
            display: flex;
            align-items: center;
              font: {
                size: 2.8em;
                family: Roboto;
                weight: bold;
            }
            .q-icon {
              padding-right: 5%;
            }
          }
        }

        .body {
            height: 70vh;
            display: flex;
            // align-items: center;
            justify-content: space-evenly;

            .profileForm {
              margin-top: 5rem;
            }

            .profileTextField {
                width: 20rem;
            }
            .profileUsernameTextfield {
                margin-top: 1rem;
            }
            .profilePasswordTextfield {
                margin-top: 2rem;
            }

            .profileDetailsTextfield {
                margin-top: 1rem;
            }

            .saveButtonConatiner {
              display: flex;
              justify-content: space-around;
              margin-top: 1rem;
            }
        }
    }
}

</style>