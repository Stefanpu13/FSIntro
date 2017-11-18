<template id="modal-template">
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              <div class="col-xs-12"><h4 class="text-center">{{feature}}</h4></div>
             <div class="col-xs-12">
                <button class="btn btn-default pull-left" @click="closeFeatureInfo()">
                  Got it
                </button>
                <button class="btn btn-default pull-right">
                  <a
                  target="_blank"
                  :href="moreInfo">
                    More Info
                  </a>
                </button>
              </div>
            </slot>
          </div>
          <div class="modal-body">            
            <pre v-highlightjs>
              <code class="csharp">{{featuresInfo[feature].info}}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import featuresInfo from '../data/featuresInfo'

  export default {
    name: 'featureInfo',
    data() {
      return {
        featuresInfo
      }      
    },
    props: ['feature', 'moreInfo'],
    methods:{
      closeFeatureInfo(){
        this.$router.go(-1);
      }
    }
  }
</script>

<style>
  .modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  transition: opacity .3s ease;
}

.modal-wrapper {
  height: 100%;
  vertical-align: middle;
}

.modal-container {
  height: 100%;
  background-color: #fff;
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  height: 80%;
}

.modal-body pre {
  height: 100%;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
