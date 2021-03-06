import Vue from 'vue'
import VueRouter from 'vue-router'
import vueg from 'vueg'  
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'home',
    meta: {title: '主页'},
    component: resolve => {
      require(['@/views/home/index'], resolve)
    }
  },
  {
    path: '/login',
    name: 'login',
    meta: {title: '登录'},
    component: resolve => {
      require(['@/views/login'], resolve)
    }
  },
  {
      path: '/sign',
      name: 'sign',
      component: resolve => {
          require(['@/views/sign'], resolve)
      },
      meta: {title: '注册', keepAlive: false}
  },
  {
        path: '/home',
        name: 'home',
        component: resolve => {
            require(['@/views/home/index'], resolve)
        },
        meta: {title: '主页', keepAlive: false}
  },
  {
    path: '/token',
    name: 'token',
    component: resolve => {
        require(['@/views/home/tokenDt'], resolve)
    },
    meta: {title: 'token', keepAlive: false}
},
]
const router = new VueRouter({
  routes
})
const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
const options={  
  duration: '0.3',              //转场动画时长，默认为0.3，单位秒
  firstEntryDisable: true,     //值为true时禁用首次进入应用时的渐现动画，默认为false  
  firstEntryDuration: '.6',     //首次进入应用时的渐现动画时长，默认为.6  
  forwardAnim: 'fadeInRight',   //前进动画，默认为fadeInRight  
  backAnim: 'fadeInLeft',       //后退动画，默认为fedeInLeft  
  sameDepthDisable: false,      //url深度相同时禁用动画，默认为false  
  tabs: [{
          name:'home'
  },{
      name:'my'
  }],                       //默认为[]，name对应路由的name,以实现类似app中点击tab页面水平转场效果，如tab[1]到tab[0]，会使用backAnim动画，tab[1]到tab[2]，会使用forwardAnim动画  
  tabsDisable: false,           //值为true时，tabs间的转场没有动画，默认为false  
  disable: false,               //禁用转场动画，默认为false，嵌套路由默认为true   
} 
 Vue.use(vueg, router,options)

export default router
