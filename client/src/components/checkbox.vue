<template>
<div v-on:click="check" class="checkbox-container">
  <input  type="checkbox" v-bind:checked="checked">
  <span class="checkmark"></span>
</div>
</template>

<script>
export default {
  props:{
    checkall: {}
  },
  data(){
    const checked = true;

    return {
      checked
    }
  },
  methods:{
    check(){
      this.checked == true ? this.checked=false : this.checked=true
      // this.$emit('add-node', `${this.network}/${this.mask}`);
    }
  }
}
</script>
<style>
.checkbox-container {
  display: block;
  position: relative;
  /* padding-left: 35px; */
  /* background-color: teal; */
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;

}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  border: 2px solid teal;
  border-radius: 5px;
  /* border-color: teal; */
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
}

/* On mouse-over, add a grey background color */
.checkbox-container:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.checkbox-container input:checked ~ .checkmark {
  background-color: teal;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.checkbox-container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.checkbox-container .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}


</style>