<template>
  <div class="ffjb">
    <van-nav-bar title="举报须知" left-text  class="toBar" />
    <div style="height:40px;"></div>
    <img class="topImg" src="image/jb.png" alt="">
    <center>
        <p style="font-size:25px;position:relative;top:15px">非法集资举报须知</p>
    </center>
    <p class="mainText">
      （一）举报人应当遵守法律、法规，不得损害国家、社会、集体的利益和其他公民的合法权利。
      <br> 
      （二）举报的内容应当客观真实，不得捏造、歪曲事实，不得诬告、陷害他人。对借检举、举报诬告陷害他人的，依照有关规定严肃处理；涉嫌犯罪的，移送司法机关依法处理。 
      <br>
      （三）提倡署实名举报，署实名举报的，请详细填写有关信息（可以选填），举报人的个人隐私将受到保护。 
      <br>
      （四）请如实填写举报内容，力求详尽，应详细反映问题事实及线索，以便于受理核查。对受理核查后，符合举报奖励条件的，将依据<u><font style="color:blue" @click="goHref('jlbf',1)">《泰安市岱岳区非法集资案件举报奖励办法》</font></u>给予相应奖励。
    </p>
    <div class="buttons" v-if="times!=0">
      <center>
      <van-button round block type="info" disabled class="wcls" >
        匿名举报
        {{times}}
      </van-button>
      <van-button round block type="info" disabled class="wcls1" >
        实名举报
         {{times}}
      </van-button>
      </center>
    </div>
    <div class="buttons" v-if="times==0">
      <center>
      <van-button @click="goHref('plform',0)" round block type="info" class="wcls" >
        匿名举报
      </van-button>
      <van-button @click="goHref('plform',1)" round block type="info" class="wcls1" >
        实名举报
      </van-button>
      </center>
    </div>
  </div>
</template>
<script>
import _URL from "../../lib/url";
import areas from "../../lib/aera";
import { Toast,Dialog } from 'vant';
import { getAction, postAction } from "@/api/manage";

export default {
  name: "index",
  data: function() {
    return {
      columns: ['抵押', '质押', '保证', '信用', '其他'],
      showPicker: false,
      //申请事由选择器结束
      sqed: "",
      sqsy: "",
      zjyt: "",
      //银行选择框
      yhjg:[],
      tzjg:[],
      yhjgs:[],
      tzjgs:[],
      //是否已经全选
      isAll1:false,
      isAll2:false,
      nowFs:'',
      nowFsSr:'',
      //遗留字段结束
      times:10
    };
  },
  mounted: function() {
        let that = this;
        //  this.getListYhjg();
        //  this.getListTzjg();
        let s = setInterval(function(){
          that.times--;
          if(that.times==0){
            clearInterval(s);
          }
        },1000)
  },
  methods: {
     goHref:function(val,type){
        this.$router.push({
          path:val,
           query: {
              type:type
           }
        });
     },
     getListYhjg:function () {
        var that = this;
        that.$store.commit("setLoadings", true);
        let obj = {
            'pageNumber': 1,
            'pageSize': 1000,
            'type': 1,
            'jglx': 0
        };
        getAction(`${_URL.finance_lstByType}`, obj).then(res => {
        //加延迟，给予一定时间过渡，用户体验较好
        setTimeout(function(){
            console.log(JSON.stringify(res));
            that.$store.commit("setLoadings", false);
            console.log(JSON.stringify(res.list));
            that.yhjgs=res.list;
        },1000)
      });
    },
     getListTzjg:function () {
        var that = this;
        that.$store.commit("setLoadings", true);
        let obj = {
            'pageNumber': 1,
            'pageSize': 1000,
            'type': 1,
            'jglx': 1
        };
        getAction(`${_URL.finance_lstByType}`, obj).then(res => {
        //加延迟，给予一定时间过渡，用户体验较好
        setTimeout(function(){
            console.log(JSON.stringify(res));
            that.$store.commit("setLoadings", false);
            console.log(JSON.stringify(res.list));
            that.tzjgs=res.list;
        },1000)
      });
    },
    onClickLeft: function() {
      this.$router.go(-1);
    },
    //提交表单
    onSubmit(values) {
      console.log("submit", values);
      var that = this;
      console.log("yhjg", this.yhjg.join(","));
      that.$store.commit("setLoadings", true);
      let sy = '';
      if(that.sqsy=='其他'){
        sy = that.nowFsSr
      }else{
        sy = that.sqsy
      }
      // alert(sy);
      
      let obj = {
        'entity.sqsy':sy,
        'entity.zjyt':that.zjyt,
        'entity.yxyhjg':this.yhjg.join(","),
        'entity.sqed':that.sqed,
        'entity.zt':'待审核',
        'entity.yxtzjg':that.tzjg.join(","),
        'entity.wqrjg':that.tzjg.join(",")+','+this.yhjg.join(","),
        'entity.ywlx':'新增融资',
      };
      console.log(JSON.stringify(obj));
        console.log(that.tzjg.join(",")+','+this.yhjg.join(","));
      getAction(`${_URL.finance_applyAdd}`, obj).then(res => {
        //加延迟，给予一定时间过渡，用户体验较好
        setTimeout(function(){
            console.log(JSON.stringify(res));
            that.$store.commit("setLoadings", false);
            if(res.code==1){
              Toast.success('保存成功');

              that.$router.push({path:'rzsq'});
            }else{
              Toast.fail(res.msg);
            }
        },1000)
      });

    },
    //选择企业类型
    onConfirm(value) {
      this.sqsy = String(value);
      // alert(String(value));
      this.nowFs = String(value);
      this.showPicker = false;
    },
    //全选，取消全选
    checkAll() {
      this.isAll1 = true;
      this.$refs.checkboxGroup1.toggleAll(true);
    },
    toggleAll() {
      this.isAll1 = false;
      this.$refs.checkboxGroup1.toggleAll();
    },
    checkAll2() {
      this.isAll2 = true;
      this.$refs.checkboxGroup2.toggleAll(true);
    },
    toggleAll2() {
      this.isAll2 = false;
      this.$refs.checkboxGroup2.toggleAll();
    },
  }
};
</script>
<style lang="less">
.ffjb{
   .wcls{
      width:40%;
      display: inline-block;
  }
  .wcls1{
      margin-left:20px;
      width:40%;
      display: inline-block;
  }
  .buttons{
    margin-top:1px;
    margin-bottom: 40px;
  }
  .mainText{
    font-size:16px;
    color:rgba(51,51,51,1);
    line-height:35px;
    padding:30px;
  }
  .topImg{
    width: 100%;
  }
    .van-doc-demo-block__title {
        margin: 0;
        padding: 8px 16px 8px;
        font-weight: normal;
        font-size: 15px;
        line-height: 16px;
        margin-top: 7px;
        
    }
    .dwBox{
        overflow: hidden;
        .dwItems{
            border:solid 1px blue;
            width:33.3%;
            float:left;
            height:40px;
        }
    }
    .citems{
        font-size: 13px;
        color:rgba(102,102,102,1);
        text-indent: 18px;
        position: relative;
        top:6px;
        line-height: 30px;
    }
    .dwItem{
        margin-top: 20px;
        margin-left: 30px;
    }
    .sall{
        color: blue;
        float: right;
        margin-right:16px;
    }
    .van-cell{
        font-size:15px
    }
}

</style>

