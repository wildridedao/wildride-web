<template>
  <div class="sign">
       <img class="topBg" src="image/top.png" alt="">
       
       <div class="buttons">
          <font @click="goLogin" style="margin-left:55px;color:rgb(60,60,60)">登 录</font>
          <div class="butItem" >
            注 册
          </div>
       </div>
       <van-form @submit="onSubmit" class="logForm" ref="froms">
        <van-field
          v-model="phone"
          name="phone"
          placeholder="请输入手机号"
          left-icon="phone-o"
          :rules="[{ pattern, message: '请输入正确的手机号' }]"
          class="inputs"
        />
        <br>
        <van-field
          v-model="password"
          type="password"
          name="password"
          left-icon="award-o"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请输入密码' }]"
           class="inputs"
        />
        <br>
         <van-field
          v-model="passwordAg"
          type="password"
          name="passwordAg"
          left-icon="award-o"
          placeholder="请再次输入密码"
          :rules="[{ validator:passwordAgCk, message: '两次密码输入不一致' }]"
           class="inputs"
        />
        <br>
         <van-field
           readonly
            clickable
          :value="type"
          name="type"
          left-icon="flag-o"
          placeholder="请选择用户类型"
          :rules="[{ required: true, message: '请选择用户类型' }]"
           class="inputs"
            @click="showPicker = true"
        />
        <van-popup v-model="showPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="columns"
            @confirm="onConfirm"
            @cancel="showPicker = false"
          />
        </van-popup>
        <br>
        <div class="vcodeBox setBox">
            <van-field
              v-model="vcode" 
              name="vcode"
              left-icon="certificate"
              placeholder="请输入验证码"
              :rules="[{ required: true, message: '请输入验证码' }]"
              class="inputs vcode flex1"
            />
            <van-button @click="sendCode" type="primary" size="small" native-type="button" class="subBtn2">{{vcodeText}}</van-button>
        </div>
        <div style="margin: 16px;margin-top:-36px !important;margin-bottom:80px !important">
          <van-button round block type="info" native-type="submit" class="subBtn">
            提 交
          </van-button>
        </div>
      </van-form>
       
  </div>
</template>
<script>
import _URL from "../lib/url";
import areas from "../lib/aera";
import { Toast,Dialog } from 'vant';
import { getAction, postAction } from "@/api/manage";
export default {
  name: "sign",
  data:function() {
    return {
          phone: '',
          password: '',
          passwordAg: '',
          //正则验证手机号
          pattern:/^1[3456789]\d{9}$/,
          vcode:'',
          loading:true ,
          vcodeText:'获取验证码',
          phoneErrMsg:'请输入正确的手机号',
          type:'',
          //用户类型选择器
          showPicker:false,
          columns: ['企业', '银行','其他金融企业', '应急转贷机构'],
    };
  },
  mounted:function() {
     
  },
  methods: {
    //注册
    onSubmit(values) {
      var that = this;
      console.log('submit', values);
      that.$store.commit("setLoadings", true);
      let ttext = that.type;
      // let type = that.columns.indexOf(ttext);
      let type = '';
      let jglx = '-1';
      if(ttext=='企业'){
        type = 0;
      }
      if(ttext=='银行'){
        type = 1;
        jglx = 0;
      }
      if(ttext=='其他金融企业'){
        type = 1;
        jglx = 1;
      }
      if(ttext=='应急转贷机构'){
        type = 2;
      }
      let obj = {
        'entity.username':that.phone,
        'entity.password':that.password,
        'entity.type':type,
        'entity.jglx':jglx,
        'yzm':that.vcode
      };
      console.log(JSON.stringify(obj));
    //  return false;
      getAction(`${_URL.user_save}`, obj).then(res => {
        //加延迟，给予一定时间过渡，用户体验较好
        setTimeout(function(){
            that.$store.commit("setLoadings", false);
            if(res.code==1){
              Dialog.confirm({
                title: '注册成功',
                message: '是否立即登录',
              }).then(() => {
                  that.$router.push({path:'login'});
              }).catch(() => {
                  // on cancel
              });
            }else{
              Toast.fail(res.msg);
            }
        },1000)
      });
    },
    //跳转到登录界面
    goLogin(){
      this.$router.push({path:'login'});
    },
    //函数验证两次密码是否一致
    passwordAgCk(val){
        var that = this;
        if (val == that.password){
          return true;
        }else{
          return false;
        }
        
    },
    //获取短信验证码
    sendCode(){
          let that = this;
          //判断当前按钮状态
          if(that.vcodeText != '获取验证码'){
            return false;
          }
          //校验手机号是否正确
          that.$refs.froms.validate('phone').then((res) => {
              //手机号正确，开始回去验证码
              let obj = {
                'entity.username':that.phone,
              };
              console.log(JSON.stringify(obj));
              //打开loading
              that.$store.commit("setLoadings", true);
              getAction(`${_URL.user_sendCode}`, obj).then(res => {
                //加延迟，loading显示一秒钟后关闭，交互较好
                setTimeout(function(){
                    that.$store.commit("setLoadings", false);
                    console.log(JSON.stringify(res));
                    if(res.status=='success'){
                      Toast.success('验证码发送成功');
                      //显示倒计时，并不可点击
                      let s = 60;
                      that.vcodeText = s+'s';
                      let tims = setInterval(() => {
                        s--;
                        if(s!=0){
                           that.vcodeText = s+'s';
                        }else{
                           clearInterval(tims);  
                           that.vcodeText ='获取验证码';
                        }
                      }, 1000);
                    }else{
                      Toast.fail('获取失败，请重试');
                    }
                },1000)
              });
          })
    },
    //用户类型确定
    onConfirm(value) {
      this.type = value;
      this.showPicker = false;
    },
  }
};
</script>
<style lang="less">
.sign{
.topBg{
    width:100%;
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
      float: right;
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
  .subBtn2{
    background: white;
    border:none;
    border-radius:50px;
    float: right;
    top:10px;
    border:solid 1px #49a3e2;
    color:#49a3e2;
    width:90px;
  //  left:-15px;
  }
  .vcode{
    position: relative;
  }
  .vcodeBox{
    overflow: hidden;
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

