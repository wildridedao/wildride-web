<template>
  <div class="index">
       <!-- <img class="topBg" src="image/lbg.jpeg" alt=""> -->

       <div class="topBg" style="background-image:url(image/lbg.jpeg);">
            <center>
                <img class="tImg" src="image/timg2.png" alt="">
                <p class="title1"></p>
            </center>
       </div>
       
       <div class="buttons">
         <div class="butItem">
           登 录
         </div>
          <font @click="goSign" style="margin-left:30px;color:rgb(60,60,60)">注 册</font>
       </div>

       <van-form @submit="onSubmit" class="logForm">
        <van-field
          v-model="username"
          name="username"
          placeholder="请输入手机号"
          left-icon="phone-o"
          :rules="[{ required: true, message: '请填写手机号' }]"
          class="inputs"
        />
        <br>
        <van-field
          v-model="password"
          type="password"
          name="password"
          left-icon="award-o"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
           class="inputs"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit" class="subBtn">
            登 录
          </van-button>
        </div>
      </van-form>
 <!-- <center>
      <br>
      <van-button type="info">新闻1</van-button>
      <br>
      <van-button type="info">新闻2</van-button>
      <br>
      <van-button type="info">新闻3</van-button>
 </center> -->
     
  </div>
</template>
<script>
import _URL from "../lib/url";
import areas from "../lib/aera";
import { Toast,Dialog } from 'vant';
import { getAction, postAction } from "@/api/manage";
export default {
  name: "index",
  data:function() {
    return {
           username: '',
           password: '',
    };
  },
  mounted:function() {

    let that = this;
    let u = localStorage.getItem('u');
    let p = localStorage.getItem('p');
    if(u){
      that.username=u;
    }
    // if(p){
    //   that.password=p;
    //   that.onSubmit();
    // }
  },
  methods: {
    
    onSubmit(values) {
      var that = this;
      that.$store.commit("setLoadings", true);
      let obj = {
        'username':that.username,
        'password':that.password,
      };
      console.log(JSON.stringify(obj));
      getAction(`${_URL.user_login}`, obj).then(res => {
        //加延迟，给予一定时间过渡，用户体验较好
        setTimeout(function(){
            console.log(JSON.stringify(res));
            that.$store.commit("setLoadings", false);
            if(res.code==1){
              Toast.success('登录成功');
              //up
              localStorage.setItem('u',that.username);
              localStorage.setItem('p',that.password);
              //token
              localStorage.setItem('t',res.result.token);
              //用户类型
            }else{
              Toast.fail(res.msg);
            }
        },1000)
      });
    },
    goSign(){
      this.$router.push({path:'sign'});
    }
  }
};
</script>
<style lang="less">
.index{
   .topBg{
     background-size:cover;
      height: calc(100vw * 0.8);
    }
     .title1{
        color:white;
        font-size:3.5vh;
        margin-top:5%;
        letter-spacing:2px;
        font-weight:blod;
    }
   .tImg{
        width:35vw;
        margin-top:13%;
        border:solid 3px rgba(255,255,255,0.5);
        border-radius:50%;
    }
  .buttons{
    width:260px;
    font-size:16px;
    line-height: 43px;
    margin:0 auto;
    height:44px;
    border-radius:50px;
    margin-top: -23px;
    position: relative;
    z-index:1000;
    box-shadow: 0px 0px 30px rgba(0,0,0,0.2);
    background: white;
    .butItem{
      border-radius:50px; 
      height: 100%;
      width: 55%;
      background: linear-gradient(to right,#72e6e7,#49a3e2);
      color: white;
      text-align: center;
      float: left;
    }
  }
  .logForm{
    width:300px;
    margin:0 auto;
    margin-top: 50px;
  }
  .subBtn{
     margin-top: 70px;
      background: linear-gradient(to right,#72e6e7,#49a3e2);
      border:none;
       font-size:16px;
  }
  .inputs{
    font-size:16px;
    .van-icon{
      font-size:25px !important;
      color: rgb(120,120,120);
      position: relative;
      top:1px;
    }
    input{
      text-indent: 20px;
    }
    .van-field__error-message{
      text-indent: 20px;
    }
  }
}
  
</style>

