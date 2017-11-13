<template>
  

  <div>
    <div class="panel">
    <h1>Thanks for voting!</h1>
    </div>

    <div>
      <h3>Voted too early? You were playing with the app?</h3> 
    </div>

    <button 
    id="submit-btn" 
    class="btn btn-info btn-lg col-xs-12"
    
    v-on:click="requestAnotherVote">
      Request another vote
    </button>
  </div>
</template>

<script>


  export default {
    name:"ThanksForVoting",
    methods:{
      requestAnotherVote(){
        const successCallback = (data) => {
          this.$bus.$emit('newVoteGranted');        
        } 
        // make request with the voteId 
        // the votes with given voteId will be deleted
        const urlBase = 'http://cspoll4.azurewebsites.net/api'; 
        // const urlBase = 'http://localhost:50253/api'; 
        this.$http
          .post(urlBase + '/votes/requestNew?voterId=' + this.$root.voterId)
          .then(successCallback);
        
      }
    },
    beforeRouteLeave (to, from , next) {
      const voterId = this.$cookie.get('voterId');
      if (voterId !== null)  {
        next(false);
      } else {
        next();
      }
    }
  }
</script>