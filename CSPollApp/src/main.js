// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import router from './routes'
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/less/font-awesome.less';
// import 'jquery/dist/jquery.js';
import VueCookie from 'vue-cookie';

import 'bootstrap/dist/js/bootstrap.js';
import VueHighlightJS from 'vue-highlightjs';

Vue.use(Router);
Vue.use(VueHighlightJS);
Vue.use(VueResource);
Vue.use(VueCookie);
// Vue.http.options.root = 'http://cspoll4.azurewebsites.net/api';
// Vue.http.headers.common['Content-Type'] = 'javascript/json';


// global event handler(I could not make event passing work)
const EventBus = new Vue()

Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function () {
      return EventBus
    }
  }
})

/* eslint-disable no-new */
const app = new Vue({ 
  router,
  el: '#app',
  data:{    
    voterId: '0',
    storedVotes: [] 
  },
  methods:{    
    getNewVoteId(){
      this.voterId = this.guid();
      return this.voterId;
    },
    guid(){
      const s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
      }

      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
    }
  },

  created() {
    this.$bus.$on('votesSubmitted', (voterId) => {
      this.$cookie.set('voterId', voterId);     
      this.storedVotes = []; 
      this.$router.push("ThanksForVoting");      
    })

    this.$bus.$on('newVoteGranted', () => {      
      this.$cookie.delete('voterId');      
      this.$router.push('/');      
      this.voterId = '';
    });

    this.$bus.$on('leaveToFeaturesInfo', (votes) => {
      this.storedVotes = votes;
    });
    
    const voterId = this.$cookie.get('voterId');
    if(voterId !== null){      
      this.$router.push("ThanksForVoting");  
      this.voterId = voterId;
    }
  },
})
