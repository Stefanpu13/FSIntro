<template>
  <!-- <div class="fluid container"> -->
  <div class="app-container">
          
    <modal 
    v-if="showModal" 
    @close="showModal = false"
    :feature="inspectedFeature"
    :moreInfo="featuresInfo[inspectedFeature].moreInfo">
      <!--
        you can use custom content here to overwrite
        default content
      -->
      
      <pre v-highlightjs slot="body">
        <code class="csharp">{{featuresInfo[inspectedFeature].info}}
        </code>
      </pre>
      <!-- <h3 slot="header">custom header</h3> -->
    </modal>

    <div>
      <div class="col-xs-12 col-md-6">
        <div class="panel-group" id="accordion">    
          <div v-for="(version, index) in csharpVersions" :key="version.version" 
          class="col-xs-12">
            <feature-list 
            :version="version" 
            :index="index"
            :options="featuresDragOptions"
            v-on:showFeatureListInfo="onShowFeatureInfo"></feature-list>
          </div>
        </div>
      </div>
      
      <div class="col-xs-12 col-md-6" style="margin-top: 20px">
        <div class="col-xs-12" >
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title votes-placeholder text-center">
                Drag and reorder 3 to 5 votes here.
              </h3>
            </div>
            <div class="panel-body votes">
              <draggable    
              style="padding: 0px" 
              element="ul" 
              v-model="votes"       
              :options="votingDragOptions"
              > 
                <transition-group 
                type="transition" 
                name="flip-list" 
                class="list-group"
                style="display:block; min-height:20px;">
                  <li class="list-group-item" v-for="element in votes" :key="element.order"> 
                    {{element.name}}
                    <!-- <slot name="body">
                      
                    </slot> -->
                    <span 
                      class="pull-right glyphicon glyphicon-remove-circle" 
                      aria-hidden="true" 
                      style="padding-left: 0.5em"
                      v-on:click="onRemoveFeatureFromVote(element)">
                    </span>
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
        </div>    
        <div class="col-xs-12">
          <button 
          id="submit-btn" 
          class="btn btn-info btn-lg col-xs-12"
          :disabled="votes.length < 3"
          v-on:click="submitVote">
            Submit vote
          </button>
        </div>

      </div>
    </div>  
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import featureList from './FeatureList'
import modal from './Modal'
import csharpVersions from '../data/features'
import featuresInfo from '../data/featuresInfo'

export default {
  name: 'hello',
  components: {
    draggable,
    featureList,
    modal
  },
  data () {
    return {
      csharpVersions,      
      featuresInfo,
      votes: [],
      editable:true,
      delayedDragging:false,
      showModal: false,
      inspectedFeature:''
    }
  },
  methods:{    
    onRemoveFeatureFromVote (feature) {
      const restoreFeatureInPosition = (feature) => {
        const featureVersion = 
          this.csharpVersions.find((v) => v.version === feature.version);
        featureVersion.features.splice(feature.order, 0, feature);      
      }
      
      const removeFeatureFromVote = (feature) => {        
        const featurePositionInVote = 
          this.votes.findIndex((feat) => feat.name === feature.name);
        this.votes.splice(featurePositionInVote, 1);
      }

      restoreFeatureInPosition(feature);
      removeFeatureFromVote(feature);      
    },
    onShowFeatureInfo(featureName){
      this.showModal = true;
      this.inspectedFeature = featureName
    },
    submitVote() {      
      const successCallback = (voterId) => {
        this.$bus.$emit('votesSubmitted',voterId);        
      } 
      const errorCallback = (data) => {
        debugger;
      } 
      
      const votesWithPosition = 
        this.votes.map((v, i) => {
            v.positionInVote = i + 1;
            return v;
        });

      const voterId = this.$root.getNewVoteId();
      const urlBase = 'http://cspoll4.azurewebsites.net/api'; 
      // const urlBase = 'http://localhost:50253/api'; 
      this.$http
        .post(urlBase + '/votes/add?voterId=' + voterId,votesWithPosition)
        .then(() => successCallback(voterId), errorCallback);
    }
  },
  computed: {
    votingDragOptions () {
      return  {
        animation: 0,
        group: {name: 'vote', put: () => this.votes.length < 5, pull: false},
        disabled: !this.editable,
        ghostClass: 'ghost'        
      };
    },
    featuresDragOptions () {
      return  {
        animation: 0,
        group: {name: 'vote', put: false, pull: true},                  
        ghostClass: 'ghost',    
        sort: false            
      };
    },
  }
}
</script>

<style>
.flip-list-move {
  transition: transform 0.5s;
}

.ghost {
  opacity: .5;
  background: #1FA1CA;
}

.list-group-item {
  cursor: pointer;
}

.list-group-item.empty-vote{
  color: #ccc;
}

.panel-title.votes-placeholder{
  color: #aaa;
}

.list-group-item.hide-empty-vote{
  display: none;
}

.col-xs-12 {
  padding: 0;
}

.list-group-item i{
  cursor: pointer;
}
.votes.panel-body {
  padding-left: 0;
  padding-right: 0;
}

.panel.features .panel-heading{
    background: #5c2e91;
    color: #fff;
}

#submit-btn{
  background-color: #007bb8;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
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
