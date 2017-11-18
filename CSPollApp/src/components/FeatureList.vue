<template>
  <div class="panel panel-default features">
    <div class="panel-heading" data-toggle="collapse" :data-target="'#collapse' + index">
      <h4 class="panel-title">
        <a data-toggle="collapse" data-parent="#accordion" 
        v-bind:href="'#collapse' + index">
          <span class="glyphicon glyphicon-folder-close">
          </span>C# {{index + 2}}</a>
      </h4>
    </div>
    <div v-bind:id="'collapse' + index" class="panel-collapse collapse">
      <draggable class="list-group" 
      element="ul"         
      v-model="version.features" 
      :options="options"
      > 
        <transition-group type="transition" :name="featureIsAdded? 'flip-list': ''">
          <li class="list-group-item" v-for="element in version.features" 
          :key="element.order">                   
            {{element.name}}                  
            <span 
              class="pull-right glyphicon glyphicon-info-sign" 
              v-on:click="onShowFeatureInfo(element.name)"
              aria-hidden="true">
            </span>
          </li> 
        </transition-group>
      </draggable>
    </div>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import featuresInfo from '../data/featuresInfo'

  export default {
    name: 'featureList',
    components: {
      draggable,
    },
    props: ['version', 'index', 'options'],
    data: function(){
        return {
            featuresInfo,
            showModal: false,
            featureIsAdded: false
            
        }
    },
    methods: {
      onShowFeatureInfo(featureName){        
        this.$emit('showFeatureListInfo', featureName)
      }
    }    
  }
</script>

<style>

.ghost {
  opacity: .5;
  background: #1FA1CA;
}

.panel-title .glyphicon { margin-right:10px; }
.panel-collapse>.list-group .list-group-item:first-child {border-top-right-radius: 0;border-top-left-radius: 0;}
.panel-collapse>.list-group .list-group-item {border-width: 1px 0;}
.panel-collapse>.list-group {margin-bottom: 0;}
.panel-collapse .list-group-item {border-radius:0;}

.panel-collapse .list-group .list-group {margin: 0;margin-top: 10px;}
.panel-collapse .list-group-item li.list-group-item {margin: 0 -15px;border-top: 1px solid #ddd !important;border-bottom: 0;padding-left: 30px;}
.panel-collapse .list-group-item li.list-group-item:last-child {padding-bottom: 0;}

.panel-collapse div.list-group div.list-group{margin: 0;}
.panel-collapse div.list-group .list-group a.list-group-item {border-top: 1px solid #ddd !important;border-bottom: 0;padding-left: 30px;}
.panel-collapse .list-group-item li.list-group-item {border-top: 1px solid #DDD !important;
}

</style>
