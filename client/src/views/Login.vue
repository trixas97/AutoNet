<template>
  <div class="login">
        <div class="login-img">
            <img class="background" src="@/assets/login-background.svg" alt="">
            <img class="img-front" src="@/assets/login-logo.svg" alt="">
        </div>
        <div class="login-form">
            <input type="text">
            <input type="text">
            <input type="button">
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
        }

    }

</style>

