<template>
  <div class="login">
        <div class="login-img">
            <img class="background" src="@/assets/login-background.svg" alt="">
            <img class="img-front" src="@/assets/server.svg" alt="">
        </div>
        <div class="login-form">
            <img class="logo-autonet" src="@/assets/logo.svg" alt="">

            <span class="username">
                <span class="icon"><i class="fa fa-user fa-2x"></i></span><input class="username-txt" id="age" type="text" placeholder="Username">
            </span>

            <!-- <input class="username" type="text"> -->
            <span class="password">
               <span class="icon"><i class="fa fa-lock fa-2x"></i></span><input class="password-txt" id="age" type="text" placeholder="Password">
            </span>
            <div class="btn-div">
                <button class="btn" style="vertical-align:middle" ><span>Login</span></button>  
            </div> 
            <!-- <input class="btn" type="button" value="Login"> -->
        </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Login',
  components: {
  }
}
</script>

<style lang="scss" scoped>
   
    .login{
        height: 100%;
        width: 100%;
        display: grid;

        grid-template-columns: 1fr 1fr;
        grid-template-areas: 
        "img form";

        .login-img{
            grid-area: img;
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
                left: 10vw;
                top: 35vh;
                height: 30%;
                width: 30%;
            }  
        }

        .login-form {
            grid-area: form;
            display: grid;
            grid-gap: 2em;
            grid-template-rows: 1.6fr 0.2fr 0.4fr 0.2fr 0.2fr 0.2fr 1.6fr;
            grid-template-columns: 1fr 2fr 1fr;
            grid-template-areas: 
            ". . ."
            ". title ."
            ". . ."
            ". username ."
            ". password ."
            ". btn ."
            ". . .";

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
                    font-size: 1.5em;       
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
                    font-size: 1.5em;       
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
                    min-width: 3em;
                    background: #43c3a1;
                    color: white;
                    
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2), 0px 6px 20px 0 rgba(0, 0, 0, 0.19);
                    border-radius: 4px 0px 0px 4px;

                }

            // .btn {
            //     grid-area: btn;
            //     min-height: 5em;
            // }
            .btn-div {
                grid-area: btn;
                
                flex-grow: 1;
                align-self: center;
                grid-area: btn;
                min-height: 5em;
                // background-color: green;

                .btn {
                width: 100%;
                height: 100%;
                margin-top: 1.3em;
                border-radius: 4px;
                background-color: #e56353;
                border: none;
                color: #FFFFFF;
                transition: all 0.5s;
                cursor: pointer;
                padding: 0.8em;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
                text: {
                    align: center;
                }
                font: {
                    size: 1.5em;
                    weight: bold;
                    // family: Roboto;
                }
                span {
                    // cursor: pointer;
                    display: inline-block;
                    position: relative;
                    transition: 0.5s;

                    &:after {
                    content: '\f0a9';
                    font-family: FontAwesome;
                    // font-weight:900;
                    position: absolute;
                    opacity: 0;
                    top: 0;
                    right: -10em;
                    left: 5em;
                    transition: 0.7s;
                    }
                }

                i {
                    padding-right: 0px;
                }

                &:disabled {
                    background-color: gray;
                    cursor: not-allowed;
                    transition: all 0s;

                    &:hover {
                    padding: 0px;
                    }
                }

                &:hover {
                    padding-right: 1.5em;
                    span {
                        &:after {
                            opacity: 1;
                            right: -1.5em;
                        }
                    }
                }
                }
            }
        }

    }

</style>

