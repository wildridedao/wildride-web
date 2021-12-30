<template>
  <div id="app">
    <!-- <router-view v-transition/> -->
  
    <router-view />
    <div class="pageCovers" v-if="loadings">
        <van-loading size="50" style="margin-top:40vh" color="white" vertical/> 
    </div>
  </div>
</template>
<script>
export default {
  name: "app",
  data:function() {
    return {
          username: '',
          password: '',
          passwordAg: '',
          phone:'',
          vcode:'',
          topath:'',
    };
  },
  watch:{
	  $route(to,from){
      console.log(to.path);//到哪去
      this.topath=to.path
    }
  },
  mounted:function() {
    var that = this;
    //关闭loading
    //  setTimeout(function(){
    //       that.$store.commit("setLoadings", false);
    //  },3000)
  },
  computed: {
      loadings(){
          return this.$store.getters.loadings;
      }
  },
  methods: {
    getSta(val){
      let that = this
      let list = that.pages
      if(list.indexOf(val)==-1){
        return true;
      }else{
        return false;
      }
    },
    onSubmit(values) {
      console.log('submit', values);
    },
     goLogin(){
      this.$router.push({path:'login'});
    },
    goBack(){
      this.$router.push({path:'home'});
    },
  }
};
</script>
<style lang="less">
.getBuildS{
   height: 45px;
}
.headers{
   position: fixed !important;
    width:100%;
    z-index: 9999 !important;
    box-shadow: 0px -3px 10px #b1b1b1;
}
.headers::after{
      border-bottom-width: 0 !important;
    }
.getBuild{
    height: 110px;
  }
  @import './assets/styles/reset.less';
  @import './assets/styles/common.less';
</style>
