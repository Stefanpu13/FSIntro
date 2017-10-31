<template>
  <div id="app">
    <div class="page-header logo">       
      <h2>
        Which 
        <img width="70em" src="../assets/c-sharp-icon.png"> 
        features are most important? 
      </h2>
    </div>  
    <hello></hello>
  </div>
</template>

<script>
import Hello from './Hello'

export default {
  name: 'app',
  components: {
    Hello
  },
  methods:{
    onVotesSubmitted(msg){
      this.$emit(msg);
    }
  },
  created() {
    this.$bus.$on('increment', (text) => {
    	this.text = text;
    })
  },
  // events:{
  //   'vot': function(msg){
  //     this.$emit('vot')
  //   }
  // }

}
</script>

<style>

#app .logo{
  text-align: center;
}
</style>
