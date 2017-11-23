<template>
  <div id="app">
    <div class="page-header logo">       
      <h2>
        Which 
        <img width="70em" src="../assets/c-sharp-icon.png"> 
        features are most important? 
      </h2>
    </div>  
    <votes 
      :storedVotes="storedVotes"
      v-on:votesChanged="onVotesChanged">
    </votes>
  </div>
</template>

<script>
import Vue from 'vue'
import Votes from './Votes'

export default {
  name: 'app',
  data(){
    return {      
      storedVotes: Vue.util.extend([], this.$root.storedVotes)
    }
  },
  components: {
    Votes
  },
  methods:{
    onVotesSubmitted(msg){
      this.$emit(msg);
    },
    onVotesChanged(newVotes) {      
      this.storedVotes = newVotes;
    }
  },
  beforeRouteLeave (to, from , next) {    
    if(to.name === 'FeatureInfo'){
      this.$bus.$emit('leaveToFeaturesInfo',this.storedVotes); 
    } 

    next();    
  },
  created() {
    this.$bus.$on('increment', (text) => {
    	this.text = text;
    })
  },
}
</script>

<style>

#app .logo{
  text-align: center;
}
</style>
