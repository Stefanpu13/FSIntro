import Router from 'vue-router'
import App from './components/App'
import ThanksForVoting from './components/ThanksForVoting'
import FeatureInfo from './components/FeatureInfo'
import NotFound from './components/NotFound'

const router = new Router({  
  mode:'history',
  routes: [
    {
      path: '/',      
      component: App
    },
    {
      path: '/ThanksForVoting',      
      component: ThanksForVoting
    },
    {
      name:'FeatureInfo',
      path: '/FeatureInfo/:feature',      
      component: FeatureInfo,
      props: true
    },
    {
      path: '*',      
      component: NotFound
    },
  ]  
});

export default router