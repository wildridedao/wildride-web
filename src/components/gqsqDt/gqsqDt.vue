<template>
  <div class="dt" v-if="items.dked">
    <van-steps :active="getZt(items.zt,items.clzt)" active-color="#38f" class="bgz">
      <van-step>
        已提交
        <br />
        <font v-if="items.zt=='待审核'">正在审核</font>
        <font v-if="items.zt=='未通过审核'">审核未通过</font>
      </van-step>
      
      <van-step>
        审核通过
        <br />
        <font v-if="items.zt=='审核通过'">机构办理中</font>
      </van-step>
      <van-step>
        已放款
        <br />
        <font v-if="items.clzt=='已放款'"></font>
      </van-step>
    </van-steps>
    <!-- 表单区域 -->
    <van-form>
      <van-field v-model="items.dked+'万元'" name="dked" readonly label="贷款额度" />

      <van-field v-model="items.dkjg" name="dkjg" readonly label="贷款机构" />

      <van-field v-model="items.dkdqr" name="dkdqr" readonly label="贷款到期日" />

      <van-field v-model="items.lxr" name="lxr" readonly label="联系人" />

      <van-field v-model="items.lxfs" name="lxfs" readonly label="联系方式" />
      <p class="qyjj">企业信息</p>
      <div class="qymsg">
        <van-field v-model="qydt.frdb"  readonly label="企业法人:" />
        <van-field v-model="qydt.clrq"  readonly label="成立日期:" />
        <van-field v-model="qydt.zczb+'万元'"  readonly label="注册资本:" />
        <van-field v-model="qydt.lsqy"  readonly label="隶属区域:" />
        <van-field v-model="qydt.lxr"  readonly label="企业联系人:" />
        <van-field v-model="qydt.lxfs"  readonly label="手机号:" />
        <van-field v-model="qydt.zyyw"  readonly label="主要业务:" />
      </div>
      <h2 class="van-doc-demo-block__title setPosition" v-if="items.shwtgyy!=''&&items.shwtgyy!=null">审核未通过原因:</h2>
      <span class="dwItem"  v-if="items.shwtgyy!=''&&items.shwtgyy!=null">
         {{items.shwtgyy}}
      </span>
      <!-- <van-divider /> -->
     
      <h2 class="van-doc-demo-block__title setPosition"  v-if="items.wfblyy!=''&&items.wfblyy!=null">拒绝受理原因:</h2>
     
      <span class="dwItem"  v-if="items.wfblyy!=''&&items.wfblyy!=null">
       
        <font>{{items.wfblyy}}</font>
      </span>
      <van-field v-model="items.fkje" name="fkje" readonly label="转贷金额" v-if="items.fkje!=''&&items.fkje!=null"/>

      <van-field v-model="items.cldate" name="cldate" readonly label="资金发放日期" v-if="items.cldate!=''&&items.cldate!=null"/>

      <van-field v-model="items.nll" name="nll" readonly label="日利率（%）" v-if="items.nll!=''&&items.nll!=null" />

      <van-field v-model="items.dbfs" name="dbfs" readonly label="担保方式" v-if="items.dbfs!=''&&items.dbfs!=null"/>

      <!-- <van-field v-model="items.cldate" name="dkqx" readonly label="放款日期" v-if="items.dkqx!=''&&items.dkqx!=null" /> -->
      <van-field v-model="items.dkqx" name="dkqx" readonly label="转贷时间（天）" v-if="items.dkqx!=''&&items.dkqx!=null" />
     
     <div  class="pjItem" v-if="items.sxjb!=''&items.sxjb!=null&&showStar">
       <font class="pjTitles">手续简便：</font><van-rate color="#ffd21e" :size="25"  v-model="items.sxjb" readonly  v-if="items.sxjb!=''&items.sxjb!=null" />
      </div>
      <div class="pjItem"  v-if="items.fwsd!=''&items.fwsd!=null&&showStar">
       <font class="pjTitles">放款速度：</font><van-rate color="#ffd21e" :size="25"  v-model="items.fwsd" readonly v-if="items.fwsd!=''&items.fwsd!=null" />
      </div>
      <div class="pjItem"  v-if="items.fwtd!=''&items.fwtd!=null&&showStar">
       <font class="pjTitles">服务态度：</font><van-rate color="#ffd21e" :size="25"  v-model="items.fwtd" readonly v-if="items.fwtd!=''&items.fwtd!=null" />
      </div>
      <van-field
        v-model="items.pjnr"
        rows="2"
        autosize
        type="textarea"
        maxlength="100"
        show-word-limit
        class="lyMsg" v-if="items.pjnr!=''&items.pjnr!=null&&showStar" 
      /> 

    </van-form>
    
    
  </div>
</template>
<script>
import _URL from "../../lib/url";
import areas from "../../lib/aera";
import { Toast,Dialog } from 'vant';
import { getAction, postAction } from "@/api/manage";
export default {
  name: "index",
  props:['items','showStar'],
  data: function() {
    return {
      active: 0,
      //申请事由选择器
      columns: [
        {
          text: "新增类",
          children: [
            { text: "抵押" },
            { text: "担保" },
            { text: "信用" },
            { text: "股权投资" },
            { text: "其他" }
          ]
        },
        {
          text: "存量类",
          children: [
            { text: "延期还款" },
            { text: "展期" },
            { text: "续贷" },
            { text: "其他" }
          ]
        }
      ],
      showPicker: false,
      //申请事由选择器结束
      //银行选择框
      //是否已经全选
      isAll1: false,
      isAll2: false,
      qydt:[]
    };
  },
  watch: {
      items (items) {
        if((items.tbrid).length>20){
          var that = this;
          that.$store.commit("setLoadings", true);
          let obj = {
            'entity.id':items.tbrid
          };
          // console.log(JSON.stringify(obj));
          getAction(`${_URL.user_Detail}`, obj).then(res => {
            //加延迟，给予一定时间过渡，用户体验较好
                console.log(JSON.stringify(res));
                that.$store.commit("setLoadings", false);
                that.qydt=res.result[0];
                // if(res.code==1){
                //   that.item=res.result;
                //   that.clztflag1 = res.result.clzt;
                //   console.log('啊啊啊啊啊'+that.item);
                // }else{
                //   Toast.fail(res.msg);
                // }
          });
        }
      }
  },
  mounted: function() {},
  methods: {
    onClickLeft: function() {
      this.$router.go(-1);
    },
    goPj:function(){
            alert('去评价')
    },
    getZt(zt,clzt){
        if(zt =='待审核' ){
            return 0;
        }else if(zt=='未通过审核'){
            return 0;
        }else if(zt=='审核通过'&&clzt!='已放款'){
            return 1;
        }else if(clzt=='已放款'){
            return 2;
        }else{
            return 0;
        }
    }
  }
};
</script>
<style lang="less">
.dt {
  .qyjj{
      font-size:15px;
      color:#616263;
      text-indent:16px;
      margin-top:10px;
    }
  .qymsg{
   
    margin:10px 20px 10px 20px;
   
  }
  .bgz {
    width: 90%;
    margin-left: 5%;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .van-step__circle {
    font-size: 30px !important;
  }
  .marks {
    position: relative;
    top: -1px;
    left: 5px;
  }
  .van-doc-demo-block__title {
    margin: 0;
    padding: 8px 16px 8px;
    font-weight: normal;
    font-size: 15px;
    line-height: 16px;
    margin-top: 7px;
  }
  .dwBox {
    overflow: hidden;
    .dwItems {
      border: solid 1px blue;
      width: 33.3%;
      float: left;
      height: 40px;
    }
  }
  .citems {
    font-size: 13px;
    color: rgba(102, 102, 102, 1);
    text-indent: 18px;
    position: relative;
    top: 6px;
    line-height: 30px;
  }
  .dwItem {
    margin-top: 20px;
    margin-left: 30px;
    margin-right: 30px;
    display: block;
  }
  .sall {
    color: blue;
    float: right;
    margin-right: 16px;
  }
  .van-cell {
    font-size: 15px;
  }
  .van-step__title {
    font-size: 15px !important;
    position: relative;
    top: -30px;
    z-index: 1000;
  }
  .van-step__icon {
    font-size: 17px !important;
  }
  .van-steps__items {
    height: 100px;
  }
  .van-step {
    top: 50px;
  }
  .dwItem {
    color:rgb(120,120,120) !important;
  }
  .setPosition {
    position: relative;
    top: 10px;
  }
}
</style>

